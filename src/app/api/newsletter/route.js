import { query } from '@/lib/db';

export async function POST(req) {
    try {
        const { email, name } = await req.json();

        if (!email) {
            return Response.json({ error: 'Email required' }, { status: 400 });
        }

        // Check if already subscribed
        const existing = await query(`
      SELECT id, status FROM newsletter_subscribers WHERE email = ?
    `, [email]);

        if (existing.length > 0) {
            if (existing[0].status === 'ACTIVE') {
                return Response.json({
                    success: false,
                    message: 'Email already subscribed'
                }, { status: 400 });
            } else {
                // Reactivate
                await query(`
          UPDATE newsletter_subscribers 
          SET status = 'ACTIVE', name = ? 
          WHERE email = ?
        `, [name || null, email]);

                return Response.json({
                    success: true,
                    message: 'Subscription reactivated'
                });
            }
        }

        // New subscription
        await query(`
      INSERT INTO newsletter_subscribers (email, name) VALUES (?, ?)
    `, [email, name || null]);

        return Response.json({
            success: true,
            message: 'Subscribed successfully'
        });
    } catch (error) {
        console.error('Newsletter error:', error);
        return Response.json({ error: 'Internal server error' }, { status: 500 });
    }
}