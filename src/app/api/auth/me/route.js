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

        if (decoded.userType === 'admin') {
            const users = await query(
                `SELECT id, email, name, avatar_url FROM admin_users WHERE id = ?`,
                [decoded.userId]
            );

            if (users.length === 0) {
                return NextResponse.json(null, { status: 401 });
            }

            const user = users[0];
            return NextResponse.json({
                id: user.id,
                email: user.email,
                display_name: user.name,
                avatar: user.avatar_url,
            });
        } else {
            const users = await query(
                `SELECT id, email, name, avatar_url FROM public_users WHERE id = ?`,
                [decoded.userId]
            );

            if (users.length === 0) {
                return NextResponse.json(null, { status: 401 });
            }

            const user = users[0];
            return NextResponse.json({
                id: user.id,
                email: user.email,
                display_name: user.name,
                avatar: user.avatar_url,
            });
        }
    } catch (error) {
        console.error('Auth API error:', error);
        return NextResponse.json(null, { status: 500 });
    }
}
