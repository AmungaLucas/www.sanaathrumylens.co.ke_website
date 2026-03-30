import { NextResponse } from 'next/server';
import { verifyPassword, generateToken } from '@/lib/auth';
import { query } from '@/lib/db';

export async function POST(req) {
    try {
        const { email, password } = await req.json();

        // Check public users first
        let user = await query('SELECT * FROM public_users WHERE email = ?', [email]);
        let userType = 'public';

        if (user.length === 0) {
            // Check admin users
            user = await query('SELECT * FROM admin_users WHERE email = ?', [email]);
            userType = 'admin';
        }

        if (user.length === 0) {
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
        }

        const userData = user[0];

        // Verify password
        const valid = await verifyPassword(password, userData.password_hash);
        if (!valid) {
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
        }

        // Generate token
        const token = generateToken(userData.id, userType);

        // Update last login
        await query(
            `UPDATE ${userType === 'public' ? 'public_users' : 'admin_users'} 
       SET last_login_at = NOW() 
       WHERE id = ?`,
            [userData.id]
        );

        // Set cookie
        const response = NextResponse.json({
            success: true,
            user: {
                id: userData.id,
                email: userData.email,
                name: userData.name,
                userType
            }
        });

        response.cookies.set('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60,
            path: '/',
        });

        return response;
    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}