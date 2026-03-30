import { NextResponse } from 'next/server';

export async function GET(req) {
    const clientId = process.env.GOOGLE_CLIENT_ID;

    if (!clientId) {
        return NextResponse.redirect(new URL('/login?error=google_not_configured', req.url));
    }

    // Build redirect_uri dynamically from the current request origin
    const origin = req.headers.get('x-forwarded-host')
        ? `${req.headers.get('x-forwarded-proto') || 'https'}://${req.headers.get('x-forwarded-host')}`
        : req.headers.get('host')
            ? `http://${req.headers.get('host')}`
            : 'http://localhost:3000';

    const redirectUri = `${origin}/api/auth/google/callback`;

    const params = new URLSearchParams({
        client_id: clientId,
        redirect_uri: redirectUri,
        response_type: 'code',
        scope: 'openid email profile',
        access_type: 'offline',
        prompt: 'consent',
        state: Buffer.from(JSON.stringify({ redirect: '/', origin })).toString('base64'),
    });

    return NextResponse.redirect(
        `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`
    );
}
