import { NextResponse } from 'next/server';
import { hashPassword, generateToken } from '@/lib/auth';
import { query } from '@/lib/db';
import { sendWelcomeEmail } from '@/lib/email';

export async function POST(req) {
  try {
    const { email, password, name, username } = await req.json();

    // Validate presence
    if (!email || !password || !name) {
      return NextResponse.json({ error: 'Name, email and password are all required' }, { status: 400 });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Please enter a valid email address' }, { status: 400 });
    }

    // Validate password strength
    if (password.length < 6) {
      return NextResponse.json({ error: 'Password must be at least 6 characters' }, { status: 400 });
    }

    // Check if email already registered
    const existing = await query('SELECT id FROM public_users WHERE email = ?', [email]);
    if (existing.length > 0) {
      return NextResponse.json({ error: 'An account with this email already exists. Try logging in instead.' }, { status: 400 });
    }

    const hashedPassword = await hashPassword(password);

    // Auto-generate username if not provided
    const baseUsername = username || email.split('@')[0].toLowerCase().replace(/[^a-z0-9._]/g, '');
    const finalUsername = `${baseUsername}_${Math.random().toString(36).slice(2, 6)}`;

    // Check username uniqueness (edge case)
    const existingUsername = await query('SELECT id FROM public_users WHERE username = ?', [finalUsername]);
    const safeUsername = existingUsername.length > 0
      ? `${baseUsername}_${Math.random().toString(36).slice(2, 8)}`
      : finalUsername;

    await query(
      `INSERT INTO public_users (email, username, name, password_hash, email_verified_at) 
       VALUES (?, ?, ?, ?, NOW())`,
      [email, safeUsername, name, hashedPassword]
    );

    // Fetch the actual UUID back (insertId is 0 for UUID primary keys)
    const users = await query('SELECT id FROM public_users WHERE email = ?', [email]);
    const userId = users[0].id;

    const token = generateToken(userId, 'public');

    sendWelcomeEmail(email, name).catch(console.error);

    const response = NextResponse.json({
      success: true,
      user: { id: userId, email, name }
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
    console.error('Signup error:', error);
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
  }
}