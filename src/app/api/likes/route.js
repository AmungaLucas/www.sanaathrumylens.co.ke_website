import { query } from '@/lib/db';

// Check if user liked a blog
export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const blogId = searchParams.get('blogId');
    const userId = searchParams.get('userId');

    if (!blogId || !userId) {
        return Response.json({ liked: false });
    }

    try {
        const result = await query(`
            SELECT id FROM blog_likes 
            WHERE blog_id = ? AND user_id = ?
        `, [blogId, userId]);

        return Response.json({ liked: result.length > 0 });
    } catch (error) {
        console.error('Like check error:', error);
        return Response.json({ liked: false });
    }
}

// Add like
export async function POST(req) {
    try {
        const { blogId, userId } = await req.json();

        if (!blogId || !userId) {
            return Response.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const existing = await query(`
            SELECT id FROM blog_likes WHERE blog_id = ? AND user_id = ?
        `, [blogId, userId]);

        if (existing.length > 0) {
            return Response.json({ alreadyLiked: true });
        }

        await query(`
            INSERT INTO blog_likes (blog_id, user_id) VALUES (?, ?)
        `, [blogId, userId]);

        await query(`
            UPDATE blogs SET like_count = like_count + 1 WHERE id = ?
        `, [blogId]);

        return Response.json({ success: true });
    } catch (error) {
        console.error('Like error:', error);
        return Response.json({ error: 'Internal server error' }, { status: 500 });
    }
}

// Remove like
export async function DELETE(req) {
    try {
        const { searchParams } = new URL(req.url);
        const blogId = searchParams.get('blogId');
        const userId = searchParams.get('userId');

        if (!blogId || !userId) {
            return Response.json({ error: 'Missing required fields' }, { status: 400 });
        }

        await query(`
            DELETE FROM blog_likes WHERE blog_id = ? AND user_id = ?
        `, [blogId, userId]);

        await query(`
            UPDATE blogs SET like_count = like_count - 1 WHERE id = ?
        `, [blogId]);

        return Response.json({ success: true });
    } catch (error) {
        console.error('Unlike error:', error);
        return Response.json({ error: 'Internal server error' }, { status: 500 });
    }
}