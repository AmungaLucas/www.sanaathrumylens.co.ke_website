// src/lib/auth.js
// This stays the same - for API routes (Node.js runtime)
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { query } from './db';

const JWT_SECRET = process.env.JWT_SECRET;
const SALT_ROUNDS = 10;

export async function hashPassword(password) {
    return await bcrypt.hash(password, SALT_ROUNDS);
}

export async function verifyPassword(password, hash) {
    return await bcrypt.compare(password, hash);
}

export function generateToken(userId, userType) {
    return jwt.sign(
        { userId, userType, exp: Math.floor(Date.now() / 1000) + (7 * 24 * 60 * 60) },
        JWT_SECRET
    );
}

export function verifyToken(token) {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (error) {
        return null;
    }
}

export async function getUserFromToken(token) {
    const decoded = verifyToken(token);
    if (!decoded) return null;

    if (decoded.userType === 'public') {
        const users = await query('SELECT * FROM public_users WHERE id = ?', [decoded.userId]);
        return users[0] || null;
    } else if (decoded.userType === 'admin') {
        const users = await query('SELECT * FROM admin_users WHERE id = ?', [decoded.userId]);
        return users[0] || null;
    }

    return null;
}