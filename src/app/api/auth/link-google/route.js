import { query } from '@/lib/db';
import { verifyToken, verifyPassword, generateToken } from '@/lib/auth';
import { NextResponse } from 'next/server';

/**
 * POST /api/auth/link-google
 * 
 * Two modes:
 * 1. Link Google to existing credential account (user is logged in, has link_token cookie)
 * 2. Verify password + link Google (user arrived from Google callback, needs to prove ownership)
 */
export async function POST(req) {
    try {
        const { password } = await req.json();
        const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

        if (!password) {
            return NextResponse.json({ error: 'Password is required to link accounts' }, { status: 400 });
        }

        // Get the link token from cookie
        const linkToken = req.cookies.get('link_token')?.value;

        if (!linkToken) {
            return NextResponse.json({ error: 'No pending account link. Please try signing in with Google again.' }, { status: 400 });
        }

        // Verify the link token — we'll use our regular JWT verifier
        const linkData = verifyToken(linkToken);

        if (!linkData || !linkData.userId || !linkData.googleId || linkData.action !== 'link_google') {
            return NextResponse.json({ error: 'Invalid or expired link token. Please try again.' }, { status: 400 });
        }

        // Fetch the user
        const [users] = await query(
            'SELECT id, email, name, password_hash, auth_provider, google_id FROM public_users WHERE id = ?',
            [linkData.userId]
        );

        if (users.length === 0) {
            return NextResponse.json({ error: 'Account not found' }, { status: 404 });
        }

        const user = users[0];

        // Already linked?
        if (user.google_id) {
            // Clear the link token cookie
            const response = NextResponse.json({ success: true, message: 'Google account already linked', alreadyLinked: true });
            response.cookies.set('link_token', '', { maxAge: 0, path: '/' });
            return response;
        }

        // Verify password — user must prove they own this credential account
        const valid = await verifyPassword(password, user.password_hash);
        if (!valid) {
            return NextResponse.json({ error: 'Incorrect password. Please try again.' }, { status: 401 });
        }

        // Link the Google account
        await query(
            'UPDATE public_users SET google_id = ?, auth_provider = ?, avatar_url = ? WHERE id = ?',
            [linkData.googleId, 'both', linkData.avatar || user.avatar_url, user.id]
        );

        // Generate a proper auth token and clear link token
        const authToken = generateToken(user.id, 'public');
        const response = NextResponse.json({
            success: true,
            message: 'Google account linked successfully',
            user: { id: user.id, email: user.email, name: linkData.name || user.name }
        });

        response.cookies.set('token', authToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60,
            path: '/',
        });

        response.cookies.set('link_token', '', { maxAge: 0, path: '/' });

        return response;

    } catch (error) {
        console.error('Link Google error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

/**
 * GET /api/auth/link-google
 * Returns the pending link info (email, name) for the UI without exposing sensitive data
 */
export async function GET(req) {
    try {
        const linkToken = req.cookies.get('link_token')?.value;

        if (!linkToken) {
            return NextResponse.json({ error: 'No pending link' }, { status: 400 });
        }

        const linkData = verifyToken(linkToken);

        if (!linkData || linkData.action !== 'link_google') {
            return NextResponse.json({ error: 'Invalid or expired link token' }, { status: 400 });
        }

        // Return safe info for the UI
        return NextResponse.json({
            googleEmail: linkData.email,
            googleName: linkData.name,
            googleAvatar: linkData.avatar,
        });

    } catch (error) {
        console.error('Link Google GET error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
