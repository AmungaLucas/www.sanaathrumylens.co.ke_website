import { query } from '@/lib/db';
import { sendEmail } from '@/lib/email';

export async function POST(req) {
    try {
        const { name, email, subject, message } = await req.json();

        if (!name || !email || !message) {
            return Response.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Save to database
        await query(`
      INSERT INTO contact_submissions (name, email, subject, message)
      VALUES (?, ?, ?, ?)
    `, [name, email, subject || null, message]);

        // Send email notification
        await sendEmail({
            to: process.env.SMTP_FROM_EMAIL,
            subject: `New Contact Form Submission: ${subject || 'No Subject'}`,
            html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject || 'N/A'}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
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