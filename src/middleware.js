// src/middleware.js
import { NextResponse } from 'next/server';
import { verifyToken } from './lib/auth-edge'; // Use Edge-compatible version

export async function middleware(request) {
    const { pathname } = request.nextUrl;

    // Public paths (no auth required)
    const publicPaths = [
        '/',
        '/about',
        '/contacts',
        '/blogs',
        '/blogs/',
        '/events',
        '/categories',
        '/tags',
        '/authors',
        '/search',
        '/login',
        '/signup',
        '/reset-password',
        '/api/blogs',
        '/api/events',
        '/api/categories',
        '/api/tags',
        '/api/search',
        '/api/auth/login',
        '/api/auth/signup',
        '/api/auth/logout',
        '/api/auth/google',
        '/api/auth/me',
        '/api/auth/reset-password',
        '/api/comments',
        '/api/cookie-consent',
        '/api/contact',
        '/api/newsletter',
        '/api/likes',
        '/api/bookmarks',
        '/api/follow',
        '/api/reports',
        '/api/events/rsvp',
    ];

    const isPublicPath = publicPaths.some(path => pathname === path || pathname.startsWith(path + '/'));

    if (isPublicPath) {
        return NextResponse.next();
    }

    // All /api/* routes should be public (they handle auth internally)
    if (pathname.startsWith('/api/')) {
        return NextResponse.next();
    }

    // Check auth for protected routes
    const token = request.cookies.get('token')?.value;

    if (!token) {
        const loginUrl = new URL('/login', request.url);
        loginUrl.searchParams.set('redirect', pathname);
        return NextResponse.redirect(loginUrl);
    }

    const decoded = verifyToken(token);
    if (!decoded) {
        const loginUrl = new URL('/login', request.url);
        loginUrl.searchParams.set('redirect', pathname);
        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|ads.txt|robots.txt|sitemap.xml|feed.xml|.*\\.(?:png|jpg|jpeg|gif|svg|webp|ico|woff|woff2|ttf|otf|eot|mp4|mp3|pdf)).*)',
    ],
};