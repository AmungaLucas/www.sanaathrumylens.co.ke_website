import { verifyToken } from '@/lib/auth';
import { query } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(request) {
    try {
        const token = request.cookies.get('token')?.value;

        if (!token) {
            return NextResponse.json(null, { status: 401 });
        }

        const decoded = verifyToken(token);
        if (!decoded) {
            return NextResponse.json(null, { status: 401 });
        }

        let users;
        if (decoded.userType === 'admin') {
            users = await query(
                `SELECT id, email, name, avatar_url, role, status FROM admin_users WHERE id = ?`,
                [decoded.userId]
            );
        } else {
            users = await query(
                `SELECT id, email, name, avatar_url, status FROM public_users WHERE id = ?`,
                [decoded.userId]
            );
        }

        if (users.length === 0) {
            return NextResponse.json(null, { status: 401 });
        }

        return NextResponse.json({ ...users[0], userType: decoded.userType });
    } catch (error) {
        console.error('Auth API error:', error);
        return NextResponse.json(null, { status: 500 });
    }
}