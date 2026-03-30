import { hashPassword } from '@/lib/auth';
import { query } from '@/lib/db';
import { sendPasswordResetEmail } from '@/lib/email';
import crypto from 'crypto';

// Request password reset
export async function POST(req) {
  try {
    const { email } = await req.json();

    if (!email) {
      return Response.json({ error: 'Email required' }, { status: 400 });
    }

    // Check if user exists
    const user = await query('SELECT id, email, name FROM public_users WHERE email = ?', [email]);

    if (user.length > 0) {
      // Generate reset token
      const token = crypto.randomBytes(32).toString('hex');
      const expiresAt = new Date(Date.now() + 3600000); // 1 hour

      // Save token to database
      await query(
        `INSERT INTO password_reset_tokens (user_id, token, expires_at) 
         VALUES (?, ?, ?)`,
        [user[0].id, token, expiresAt]
      );

      // Send email (don't await)
      sendPasswordResetEmail(email, token).catch(console.error);
    }

    // Always return success to prevent email enumeration
    return Response.json({
      success: true,
      message: 'If an account exists, you will receive a password reset email.'
    });
  } catch (error) {
    console.error('Password reset request error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Confirm password reset
export async function PUT(req) {
  try {
    const { token, newPassword } = await req.json();

    if (!token || !newPassword) {
      return Response.json({ error: 'Token and new password required' }, { status: 400 });
    }

    // Verify token
    const resetToken = await query(
      `SELECT user_id, expires_at FROM password_reset_tokens 
       WHERE token = ? AND used_at IS NULL`,
      [token]
    );

    if (resetToken.length === 0) {
      return Response.json({ error: 'Invalid or expired token' }, { status: 400 });
    }

    const { user_id, expires_at } = resetToken[0];

    // Check if token expired
    if (new Date(expires_at) < new Date()) {
      return Response.json({ error: 'Token expired' }, { status: 400 });
    }

    // Hash new password
    const hashedPassword = await hashPassword(newPassword);

    // Update user password
    await query('UPDATE public_users SET password_hash = ? WHERE id = ?', [hashedPassword, user_id]);

    // Mark token as used
    await query('UPDATE password_reset_tokens SET used_at = NOW() WHERE token = ?', [token]);

    return Response.json({ success: true, message: 'Password reset successful' });
  } catch (error) {
    console.error('Password reset confirm error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}