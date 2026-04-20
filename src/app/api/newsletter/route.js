import { query } from '@/lib/db';
import { NextResponse } from 'next/server';
import { rateLimit, getClientIp } from '@/lib/rate-limit';

export async function POST(req) {
    try {
        // Rate limiting: 10 per minute
        const ip = getClientIp(req);
        const { success, retryAfter } = rateLimit(ip, 10, 60000);
        if (!success) {
            return NextResponse.json(
                { error: 'Too many requests. Please try again later.' },
                {
                    status: 429,
                    headers: { 'Retry-After': String(retryAfter) },
                }
            );
        }

        const { email, name } = await req.json();

        if (!email) {
            return NextResponse.json({ error: 'Email required' }, { status: 400 });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json({ error: 'Please enter a valid email address' }, { status: 400 });
        }

        // Trim email
        const trimmedEmail = typeof email === 'string' ? email.trim() : '';
        const trimmedName = typeof name === 'string' ? name.trim() : '';

        if (!trimmedEmail) {
            return NextResponse.json({ error: 'Email required' }, { status: 400 });
        }

        // Check if already subscribed
        const existing = await query(`
      SELECT id, status FROM newsletter_subscribers WHERE email = ?
    `, [trimmedEmail]);

        if (existing.length > 0) {
            if (existing[0].status === 'ACTIVE') {
                return NextResponse.json({
                    success: false,
                    message: 'Email already subscribed'
                }, { status: 400 });
            } else {
                // Reactivate
                await query(`
          UPDATE newsletter_subscribers
          SET status = 'ACTIVE', name = ?
          WHERE email = ?
        `, [trimmedName || null, trimmedEmail]);

                return NextResponse.json({
                    success: true,
                    message: 'Subscription reactivated'
                });
            }
        }

        // New subscription
        await query(`
      INSERT INTO newsletter_subscribers (email, name) VALUES (?, ?)
    `, [trimmedEmail, trimmedName || null]);

        return NextResponse.json({
            success: true,
            message: 'Subscribed successfully'
        });
    } catch (error) {
        console.error('Newsletter error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
