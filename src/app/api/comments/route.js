import { query } from '@/lib/db';
import { verifyToken } from '@/lib/auth';
import { NextResponse } from 'next/server';

// Helper: extract userId from JWT cookie
function getUserId(req) {
    const token = req.cookies.get('token')?.value;
    if (!token) return null;
    const decoded = verifyToken(token);
    return decoded?.userId || null;
}

// GET comments for a post
export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const postId = searchParams.get('blogId') || searchParams.get('postId');

        if (!postId) {
            return NextResponse.json({ error: 'Post ID required' }, { status: 400 });
        }

        const comments = await query(`
        SELECT
          c.id, c.content, c.created_at, c.likes as like_count,
          c.user_name as author_name, c.parent_id,
          u.id as user_id, u.avatar as avatar_url
        FROM comments c
        LEFT JOIN users u ON c.user_id = u.id
        WHERE c.post_id = ? AND c.is_deleted = FALSE
        ORDER BY c.created_at ASC
      `, [postId]);

        return NextResponse.json(comments);
    } catch (error) {
        console.error('Comments API error:', error);
        return NextResponse.json([], { status: 200 });
    }
}

// POST a new comment
export async function POST(req) {
    try {
        const userId = getUserId(req);

        if (!userId) {
            return NextResponse.json({ error: 'Authentication required to comment' }, { status: 401 });
        }

        const { blogId, postId, content, authorName, parentId } = await req.json();
        const finalPostId = postId || blogId;

        if (!finalPostId || !content) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Validate that the post exists
        const postExists = await query('SELECT id FROM posts WHERE id = ? AND is_deleted = FALSE', [finalPostId]);
        if (!postExists || postExists.length === 0) {
            return NextResponse.json({ error: 'Post not found' }, { status: 404 });
        }

        // Validate that the user exists
        const userExists = await query('SELECT id FROM users WHERE id = ?', [userId]);
        if (!userExists || userExists.length === 0) {
            return NextResponse.json({ error: 'User not found' }, { status: 401 });
        }

        // If parentId is provided, validate it exists and belongs to the same post
        if (parentId) {
            const parentComment = await query(
                'SELECT id FROM comments WHERE id = ? AND post_id = ? AND is_deleted = FALSE',
                [parentId, finalPostId]
            );
            if (!parentComment || parentComment.length === 0) {
                return NextResponse.json({ error: 'Parent comment not found' }, { status: 404 });
            }
        }

        const result = await query(`
      INSERT INTO comments (post_id, user_id, user_name, content, parent_id)
      VALUES (?, ?, ?, ?, ?)
    `, [finalPostId, userId, authorName || 'Anonymous', content, parentId || null]);

        // Update comment count
        await query(`
      UPDATE posts SET stats_comments = stats_comments + 1 WHERE id = ?
    `, [finalPostId]);

        return NextResponse.json({
            success: true,
            commentId: result.insertId || null,
            message: 'Comment posted successfully'
        });
    } catch (error) {
        console.error('Comment error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
