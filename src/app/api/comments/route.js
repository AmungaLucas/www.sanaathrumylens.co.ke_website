import { query } from '@/lib/db';
import { getUserFromToken } from '@/lib/auth';
import { NextResponse } from 'next/server';

// GET comments for a blog
export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const blogId = searchParams.get('blogId');

        if (!blogId) {
            return NextResponse.json({ error: 'Blog ID required' }, { status: 400 });
        }

        const comments = await query(`
        SELECT
          c.id, c.content, c.created_at, c.like_count,
          c.author_name, c.author_email,
          u.id as user_id, u.avatar_url
        FROM comments c
        LEFT JOIN public_users u ON c.user_id = u.id
        WHERE c.blog_id = ? AND c.status = 'APPROVED'
        ORDER BY c.created_at DESC
      `, [blogId]);

        return NextResponse.json(comments);
    } catch (error) {
        console.error('Comments API error:', error);
        return NextResponse.json([], { status: 200 });
    }
}

// POST a new comment
export async function POST(req) {
    try {
        const { blogId, content, authorName, authorEmail, userId } = await req.json();

        if (!blogId || !content) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Require authenticated user
        if (!userId) {
            return NextResponse.json({ error: 'Authentication required to comment' }, { status: 401 });
        }

        // Validate that the blog exists
        const blogExists = await query('SELECT id FROM blogs WHERE id = ?', [blogId]);
        if (!blogExists || blogExists.length === 0) {
            return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
        }

        // Validate that the user exists
        const userExists = await query('SELECT id FROM public_users WHERE id = ?', [userId]);
        if (!userExists || userExists.length === 0) {
            return NextResponse.json({ error: 'User not found' }, { status: 401 });
        }

        const result = await query(`
      INSERT INTO comments (blog_id, user_id, author_name, author_email, content, status)
      VALUES (?, ?, ?, ?, ?, 'PENDING')
    `, [blogId, userId, authorName || 'Anonymous', authorEmail || null, content]);

        // Update comment count
        await query(`
      UPDATE blogs SET comment_count = comment_count + 1 WHERE id = ?
    `, [blogId]);

        return NextResponse.json({
            success: true,

            message: 'Comment submitted for moderation'
        });
    } catch (error) {
        console.error('Comment error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}