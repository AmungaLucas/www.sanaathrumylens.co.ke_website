import { query } from '@/lib/db';
import { generateToken, verifyToken } from '@/lib/auth';
import { NextResponse } from 'next/server';

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const code = searchParams.get('code');
    const state = searchParams.get('state');
    const error = searchParams.get('error');

    // Build base URL dynamically from the current request
    const origin = req.headers.get('x-forwarded-host')
        ? `${req.headers.get('x-forwarded-proto') || 'https'}://${req.headers.get('x-forwarded-host')}`
        : req.headers.get('host')
            ? `http://${req.headers.get('host')}`
            : 'http://localhost:3000';

    const baseUrl = origin;

    if (error) {
        return NextResponse.redirect(`${baseUrl}/login?error=google_denied`);
    }

    if (!code) {
        return NextResponse.redirect(`${baseUrl}/login?error=no_code`);
    }

    // Decode state to get redirect URL
    let redirectPath = '/';
    try {
        if (state) {
            const stateData = JSON.parse(Buffer.from(state, 'base64').toString());
            redirectPath = stateData.redirect || '/';
        }
    } catch (e) {
        // Invalid state, use default redirect
    }

    // Build redirect_uri dynamically (must match what was sent to Google)
    const redirectUri = `${origin}/api/auth/google/callback`;

    try {
        // 1. Exchange code for access token
        const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                code,
                client_id: process.env.GOOGLE_CLIENT_ID,
                client_secret: process.env.GOOGLE_CLIENT_SECRET,
                redirect_uri: redirectUri,
                grant_type: 'authorization_code',
            }),
        });

        const tokens = await tokenResponse.json();

        if (!tokens.access_token) {
            console.error('Google token exchange failed:', tokens);
            return NextResponse.redirect(`${baseUrl}/login?error=token_exchange_failed`);
        }

        // 2. Fetch user info from Google
        const userResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
            headers: { Authorization: `Bearer ${tokens.access_token}` },
        });

        const googleUser = await userResponse.json();

        if (!googleUser.email) {
            return NextResponse.redirect(`${baseUrl}/login?error=no_email`);
        }

        const googleId = googleUser.sub;
        const email = googleUser.email;
        const name = googleUser.name || email.split('@')[0];
        const avatar = googleUser.picture || null;

        // 3. Check if user exists by Google ID
        let existingByGoogle = await query(
            'SELECT id, email, name, avatar_url, auth_provider FROM public_users WHERE google_id = ?',
            [googleId]
        );

        // SCENARIO A: Google ID already linked — log them in directly
        if (existingByGoogle.length > 0) {
            const user = existingByGoogle[0];

            await query('UPDATE public_users SET avatar_url = ?, last_login_at = NOW() WHERE id = ?', [avatar, user.id]);

            const token = generateToken(user.id, 'public');
            const response = NextResponse.redirect(`${baseUrl}${redirectPath}`);
            response.cookies.set('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: 7 * 24 * 60 * 60,
                path: '/',
            });
            return response;
        }

        // 4. Check if user exists by email (credential account)
        let existingByEmail = await query(
            'SELECT id, email, name, auth_provider, password_hash FROM public_users WHERE email = ?',
            [email]
        );

        // SCENARIO B: Email exists but NO Google linked → account linking needed
        if (existingByEmail.length > 0) {
            const user = existingByEmail[0];

            const linkToken = generateToken(
                { userId: user.id, googleId, email, name, avatar, action: 'link_google' },
                'link'
            );

            const response = NextResponse.redirect(`${baseUrl}/link-account`);
            response.cookies.set('link_token', linkToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: 10 * 60,
                path: '/',
            });
            return response;
        }

        // SCENARIO C: Brand new user — create account with Google
        const username = email.split('@')[0].toLowerCase().replace(/[^a-z0-9._]/g, '');
        const finalUsername = `${username}_${Math.random().toString(36).slice(2, 6)}`;

        await query(
            `INSERT INTO public_users (email, username, name, avatar_url, password_hash, google_id, auth_provider, email_verified_at)
             VALUES (?, ?, ?, ?, '', ?, 'google', NOW())`,
            [email, finalUsername, name, avatar, googleId]
        );

        const [newUser] = await query('SELECT id FROM public_users WHERE google_id = ?', [googleId]);

        if (!newUser) {
            return NextResponse.redirect(`${baseUrl}/login?error=account_creation_failed`);
        }

        const token = generateToken(newUser.id, 'public');
        const response = NextResponse.redirect(`${baseUrl}${redirectPath}`);
        response.cookies.set('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60,
            path: '/',
        });
        return response;

    } catch (error) {
        console.error('Google callback error:', error);
        return NextResponse.redirect(`${baseUrl}/login?error=auth_failed`);
    }
}
