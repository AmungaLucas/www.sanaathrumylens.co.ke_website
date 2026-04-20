import { query } from '@/lib/db';
import { verifyToken } from '@/lib/auth';

// Helper: extract userId from JWT cookie
function getUserId(req) {
    const token = req.cookies.get('token')?.value;
    if (!token) return null;
    const decoded = verifyToken(token);
    return decoded?.userId || null;
}

// Check if user liked a post
export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const postId = searchParams.get('blogId') || searchParams.get('postId');
    const userId = getUserId(req);

    if (!postId || !userId) {
        return Response.json({ liked: false });
    }

    try {
        const result = await query(`
            SELECT id FROM post_likes 
            WHERE post_id = ? AND user_id = ? AND is_deleted = FALSE
        `, [postId, userId]);

        return Response.json({ liked: result.length > 0 });
    } catch (error) {
        console.error('Like check error:', error);
        return Response.json({ liked: false });
    }
}

// Add like
export async function POST(req) {
    try {
        const userId = getUserId(req);
        const { blogId, postId } = await req.json();
        const finalPostId = postId || blogId;

        if (!finalPostId || !userId) {
            return Response.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const existing = await query(`
            SELECT id FROM post_likes WHERE post_id = ? AND user_id = ? AND is_deleted = FALSE
        `, [finalPostId, userId]);

        if (existing.length > 0) {
            return Response.json({ alreadyLiked: true });
        }

        await query(`
            INSERT INTO post_likes (post_id, user_id) VALUES (?, ?)
        `, [finalPostId, userId]);

        await query(`
            UPDATE posts SET stats_likes = stats_likes + 1 WHERE id = ?
        `, [finalPostId]);

        return Response.json({ success: true });
    } catch (error) {
        console.error('Like error:', error);
        return Response.json({ error: 'Internal server error' }, { status: 500 });
    }
}

// Remove like
export async function DELETE(req) {
    try {
        const userId = getUserId(req);
        const { searchParams } = new URL(req.url);
        const postId = searchParams.get('blogId') || searchParams.get('postId');

        if (!postId || !userId) {
            return Response.json({ error: 'Missing required fields' }, { status: 400 });
        }

        await query(`
            UPDATE post_likes SET is_deleted = TRUE WHERE post_id = ? AND user_id = ?
        `, [postId, userId]);

        await query(`
            UPDATE posts SET stats_likes = stats_likes - 1 WHERE id = ?
        `, [postId]);

        return Response.json({ success: true });
    } catch (error) {
        console.error('Unlike error:', error);
        return Response.json({ error: 'Internal server error' }, { status: 500 });
    }
}
