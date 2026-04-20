import { query } from '@/lib/db';
import { verifyToken } from '@/lib/auth';

// Helper: extract userId from JWT cookie
function getUserId(req) {
    const token = req.cookies.get('token')?.value;
    if (!token) return null;
    const decoded = verifyToken(token);
    return decoded?.userId || null;
}

// Get user's bookmarks
export async function GET(req) {
    try {
        const userId = getUserId(req);
        const { searchParams } = new URL(req.url);
        const blogId = searchParams.get('blogId');

        if (!userId) {
            return Response.json({ error: 'Authentication required' }, { status: 401 });
        }

        // Check if user exists
        const user = await query('SELECT id FROM users WHERE id = ?', [userId]);
        if (user.length === 0) {
            return Response.json({ error: 'User not found' }, { status: 404 });
        }

        // If blogId provided, check if specific post is bookmarked
        if (blogId) {
            const result = await query(`
                SELECT id FROM bookmarks
                WHERE user_id = ? AND post_id = ?
            `, [userId, blogId]);

            return Response.json({ bookmarked: result.length > 0 });
        }

        // Otherwise, get all bookmarks for user
        const bookmarks = await query(`
            SELECT
                b.id,
                b.title,
                b.slug,
                b.excerpt,
                b.featured_image,
                b.published_at,
                b.stats_views as view_count,
                a.name as author_name,
                a.slug as author_slug,
                bm.created_at as saved_at
            FROM bookmarks bm
            JOIN posts b ON bm.post_id = b.id
            LEFT JOIN authors a ON b.author_id = a.id
            WHERE bm.user_id = ? AND b.status = 'published' AND b.is_deleted = FALSE
            ORDER BY bm.created_at DESC
        `, [userId]);

        return Response.json(bookmarks);
    } catch (error) {
        console.error('Bookmarks GET error:', error);
        return Response.json({ error: 'Internal server error' }, { status: 500 });
    }
}

// Add bookmark
export async function POST(req) {
    try {
        const userId = getUserId(req);
        const { blogId } = await req.json();

        if (!blogId || !userId) {
            return Response.json({ error: 'Post ID and authentication required' }, { status: 400 });
        }

        // Check if post exists and is published
        const post = await query('SELECT id FROM posts WHERE id = ? AND status = ?', [blogId, 'published']);
        if (post.length === 0) {
            return Response.json({ error: 'Post not found' }, { status: 404 });
        }

        // Check if already bookmarked
        const existing = await query(`
            SELECT id FROM bookmarks WHERE post_id = ? AND user_id = ?
        `, [blogId, userId]);

        if (existing.length > 0) {
            return Response.json({ alreadyBookmarked: true });
        }

        // Add bookmark
        await query(`
            INSERT INTO bookmarks (post_id, user_id) VALUES (?, ?)
        `, [blogId, userId]);

        return Response.json({ success: true, message: 'Bookmark added' });
    } catch (error) {
        console.error('Bookmarks POST error:', error);
        return Response.json({ error: 'Internal server error' }, { status: 500 });
    }
}

// Remove bookmark
export async function DELETE(req) {
    try {
        const userId = getUserId(req);
        const { searchParams } = new URL(req.url);
        const blogId = searchParams.get('blogId');

        if (!blogId || !userId) {
            return Response.json({ error: 'Post ID and authentication required' }, { status: 400 });
        }

        // Remove bookmark
        const result = await query(`
            DELETE FROM bookmarks WHERE post_id = ? AND user_id = ?
        `, [blogId, userId]);

        if (result.affectedRows === 0) {
            return Response.json({ error: 'Bookmark not found' }, { status: 404 });
        }

        return Response.json({ success: true, message: 'Bookmark removed' });
    } catch (error) {
        console.error('Bookmarks DELETE error:', error);
        return Response.json({ error: 'Internal server error' }, { status: 500 });
    }
}
