import { NextResponse } from 'next/server';
import { verifyPassword, generateToken } from '@/lib/auth';
import { query } from '@/lib/db';

export async function POST(req) {
  try {
    const body = await req.json();
    const { email, password } = body;

    // Validate inputs
    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Please enter a valid email address' }, { status: 400 });
    }

    // Check public users first, then admin
    let user = await query('SELECT * FROM public_users WHERE email = ?', [email]);
    let userType = 'public';

    if (user.length === 0) {
      user = await query('SELECT * FROM admin_users WHERE email = ?', [email]);
      userType = 'admin';
    }

    if (user.length === 0) {
      return NextResponse.json({ error: 'No account found with that email address' }, { status: 400 });
    }

    const userData = user[0];

    // Check account status
    if (userData.status === 'SUSPENDED') {
      return NextResponse.json({ error: 'Your account has been suspended. Please contact support.' }, { status: 403 });
    }
    if (userData.status === 'BANNED') {
      return NextResponse.json({ error: 'Your account has been banned.' }, { status: 403 });
    }

    // Verify password
    const valid = await verifyPassword(password, userData.password_hash);
    if (!valid) {
      return NextResponse.json({ error: 'Incorrect password. Please try again.' }, { status: 400 });
    }

    const token = generateToken(userData.id, userType);

    await query(
      `UPDATE ${userType === 'public' ? 'public_users' : 'admin_users'} 
       SET last_login_at = NOW() WHERE id = ?`,
      [userData.id]
    );

    const response = NextResponse.json({
      success: true,
      user: { id: userData.id, email: userData.email, name: userData.name, userType }
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
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
  }
}