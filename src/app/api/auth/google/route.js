import { query } from '@/lib/db';
import { generateToken } from '@/lib/auth';
import { sendWelcomeEmail } from '@/lib/email';

export async function POST(req) {
    try {
        const { email, name, googleId, avatar } = await req.json();

        // Check if user exists
        let user = await query('SELECT * FROM public_users WHERE email = ?', [email]);

        if (user.length === 0) {
            // Create new user
            const result = await query(
                `INSERT INTO public_users (email, name, avatar_url, password_hash, email_verified_at) 
         VALUES (?, ?, ?, '', NOW())`,
                [email, name, avatar]
            );

            user = [{ id: result.insertId, email, name }];

            // Send welcome email (don't await to not block response)
            sendWelcomeEmail(email, name).catch(console.error);
        }

        const userData = user[0];

        // Generate token
        const token = generateToken(userData.id, 'public');

        // Update last login
        await query('UPDATE public_users SET last_active_at = NOW() WHERE id = ?', [userData.id]);

        // Set cookie
        const response = Response.json({
            success: true,
            user: {
                id: userData.id,
                email: userData.email,
                name: userData.name,
                avatar: userData.avatar_url
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
        console.error('Google auth error:', error);
        return Response.json({ error: 'Internal server error' }, { status: 500 });
    }
}