import nodemailer from 'nodemailer';

// Create transporter
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
    },
    tls: {
        rejectUnauthorized: false, // For self-signed certificates
    },
});

export async function sendEmail({ to, subject, html, text }) {
    try {
        const info = await transporter.sendMail({
            from: `"${process.env.SMTP_FROM_NAME}" <${process.env.SMTP_FROM_EMAIL}>`,
            to,
            subject,
            text,
            html,
        });

        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error('Email error:', error);
        return { success: false, error: error.message };
    }
}

export async function sendWelcomeEmail(to, name) {
    const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #333;">Welcome to ${process.env.APP_NAME}!</h1>
      <p>Hi ${name || 'there'},</p>
      <p>Thank you for joining our community. We're excited to have you on board!</p>
      <p>You can now:</p>
      <ul>
        <li>Comment on articles</li>
        <li>Save your favorite posts</li>
        <li>Follow authors</li>
        <li>Get personalized recommendations</li>
      </ul>
      <p>Start exploring: <a href="${process.env.NEXT_PUBLIC_APP_URL}/blogs" style="color: #0066cc;">Read Articles</a></p>
      <hr style="border: none; border-top: 1px solid #eee;" />
      <p style="color: #666; font-size: 12px;">If you didn't sign up for this account, please ignore this email.</p>
    </div>
  `;

    return sendEmail({
        to,
        subject: `Welcome to ${process.env.APP_NAME}!`,
        html,
    });
}

export async function sendPasswordResetEmail(to, token) {
    const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${token}`;

    const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #333;">Reset Your Password</h1>
      <p>You requested to reset your password. Click the button below to create a new password:</p>
      <a href="${resetUrl}" style="display: inline-block; background-color: #0066cc; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; margin: 20px 0;">
        Reset Password
      </a>
      <p>If you didn't request this, please ignore this email. This link will expire in 1 hour.</p>
      <p>Or copy and paste this link: ${resetUrl}</p>
      <hr style="border: none; border-top: 1px solid #eee;" />
      <p style="color: #666; font-size: 12px;">If you're having trouble, contact support at ${process.env.SMTP_FROM_EMAIL}</p>
    </div>
  `;

    return sendEmail({
        to,
        subject: 'Reset Your Password',
        html,
    });
}