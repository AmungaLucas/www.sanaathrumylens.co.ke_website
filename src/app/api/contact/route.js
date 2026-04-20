import { query } from '@/lib/db';
import { sendEmail } from '@/lib/email';
import { rateLimit, getClientIp } from '@/lib/rate-limit';

export async function POST(req) {
    try {
        // Rate limiting: 5 per minute
        const ip = getClientIp(req);
        const { success, retryAfter } = rateLimit(ip, 5, 60000);
        if (!success) {
            return Response.json(
                { error: 'Too many requests. Please try again later.' },
                {
                    status: 429,
                    headers: { 'Retry-After': String(retryAfter) },
                }
            );
        }

        const { name, email, subject, message, honeypot } = await req.json();

        // Honeypot spam protection: if honeypot field is filled, silently reject
        if (honeypot) {
            // Return success to not alert bots
            return Response.json({
                success: true,
                message: 'Message sent successfully'
            });
        }

        // Validate required fields
        if (!name || !email || !message) {
            return Response.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return Response.json({ error: 'Please enter a valid email address' }, { status: 400 });
        }

        // Trim inputs
        const trimmedName = typeof name === 'string' ? name.trim() : '';
        const trimmedEmail = typeof email === 'string' ? email.trim() : '';
        const trimmedMessage = typeof message === 'string' ? message.trim() : '';
        const trimmedSubject = typeof subject === 'string' ? subject.trim() : '';

        if (!trimmedName || !trimmedEmail || !trimmedMessage) {
            return Response.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Limit message length to 5000 characters
        if (trimmedMessage.length > 5000) {
            return Response.json({ error: 'Message is too long. Maximum 5000 characters allowed.' }, { status: 400 });
        }

        // Limit name and subject length
        if (trimmedName.length > 200) {
            return Response.json({ error: 'Name is too long.' }, { status: 400 });
        }
        if (trimmedSubject.length > 300) {
            return Response.json({ error: 'Subject is too long.' }, { status: 400 });
        }

        // Save to database
        await query(`
      INSERT INTO contact_submissions (name, email, subject, message)
      VALUES (?, ?, ?, ?)
    `, [trimmedName, trimmedEmail, trimmedSubject || null, trimmedMessage]);

        // Send email notification
        await sendEmail({
            to: process.env.SMTP_FROM_EMAIL,
            subject: `New Contact Form Submission: ${trimmedSubject || 'No Subject'}`,
            html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${trimmedName}</p>
        <p><strong>Email:</strong> ${trimmedEmail}</p>
        <p><strong>Subject:</strong> ${trimmedSubject || 'N/A'}</p>
        <p><strong>Message:</strong></p>
        <p>${trimmedMessage}</p>
      `
        }).catch(console.error);

        return Response.json({
            success: true,
            message: 'Message sent successfully'
        });
    } catch (error) {
        console.error('Contact error:', error);
        return Response.json({ error: 'Internal server error' }, { status: 500 });
    }
}
