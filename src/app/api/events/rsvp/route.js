import { rsvpToEvent } from '@/lib/queries';
import { sendEmail } from '@/lib/email';

export async function POST(req) {
    try {
        const { eventId, userId, name, email, guestsCount } = await req.json();

        if (!eventId || !name || !email) {
            return Response.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Save RSVP to database
        await rsvpToEvent(eventId, userId, name, email, guestsCount);

        // Send confirmation email (don't await)
        sendEmail({
            to: email,
            subject: 'Event Registration Confirmed',
            html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Registration Confirmed!</h2>
          <p>Hi ${name},</p>
          <p>You're registered for the event. We'll send you reminders and updates.</p>
          <p>Number of guests: ${guestsCount}</p>
          <p>Thank you for joining us!</p>
        </div>
      `,
        }).catch(console.error);

        return Response.json({ success: true });
    } catch (error) {
        console.error('RSVP error:', error);
        return Response.json({ error: 'Internal server error' }, { status: 500 });
    }
}