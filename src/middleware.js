import { NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth-edge';

// API routes that require authentication
const PROTECTED_API_ROUTES = [
    '/api/likes',
    '/api/bookmarks',
    '/api/follow',
    '/api/reports',
];

export function middleware(request) {
    const { pathname } = request.nextUrl;

    // ── Security headers (applied to ALL responses) ──
    const response = NextResponse.next();

    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

    // ── API route protection ──
    const isProtectedApi = PROTECTED_API_ROUTES.some(
        (route) => pathname === route || pathname.startsWith(route + '/')
    );

    if (isProtectedApi) {
        const token = request.cookies.get('token')?.value;

        if (!token || !verifyToken(token)) {
            return NextResponse.json(
                { error: 'Authentication required' },
                { status: 401, headers: response.headers }
            );
        }
    }

    return response;
}

export const config = {
    matcher: [
        // Apply to all API routes and pages
        '/((?!_next/static|_next/image|favicon.ico|public/).*)',
    ],
};
