import { query } from '@/lib/db';
import { verifyToken } from '@/lib/auth';

// Get user's bookmarks
export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const userId = searchParams.get('userId');
        const blogId = searchParams.get('blogId');

        if (!userId) {
            return Response.json({ error: 'User ID required' }, { status: 400 });
        }

        // Check if user exists
        const user = await query('SELECT id FROM public_users WHERE id = ?', [userId]);
        if (user.length === 0) {
            return Response.json({ error: 'User not found' }, { status: 404 });
        }

        // If blogId provided, check if specific blog is bookmarked
        if (blogId) {
            const result = await query(`
        SELECT id FROM blog_saves 
        WHERE user_id = ? AND blog_id = ?
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
        b.view_count,
        a.name as author_name,
        a.slug as author_slug,
        bs.created_at as saved_at
      FROM blog_saves bs
      JOIN blogs b ON bs.blog_id = b.id
      LEFT JOIN admin_users a ON b.author_id = a.id
      WHERE bs.user_id = ? AND b.status = 'PUBLISHED'
      ORDER BY bs.created_at DESC
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
        const { blogId, userId } = await req.json();

        if (!blogId || !userId) {
            return Response.json({ error: 'Blog ID and User ID required' }, { status: 400 });
        }

        // Check if blog exists and is published
        const blog = await query('SELECT id FROM blogs WHERE id = ? AND status = "PUBLISHED"', [blogId]);
        if (blog.length === 0) {
            return Response.json({ error: 'Blog not found' }, { status: 404 });
        }

        // Check if already bookmarked
        const existing = await query(`
      SELECT id FROM blog_saves WHERE blog_id = ? AND user_id = ?
    `, [blogId, userId]);

        if (existing.length > 0) {
            return Response.json({ alreadyBookmarked: true });
        }

        // Add bookmark
        await query(`
      INSERT INTO blog_saves (blog_id, user_id) VALUES (?, ?)
    `, [blogId, userId]);

        // Update bookmark count in blogs table (optional)
        await query(`
      UPDATE blogs SET bookmark_count = bookmark_count + 1 WHERE id = ?
    `, [blogId]);

        return Response.json({ success: true, message: 'Bookmark added' });
    } catch (error) {
        console.error('Bookmarks POST error:', error);
        return Response.json({ error: 'Internal server error' }, { status: 500 });
    }
}

// Remove bookmark
export async function DELETE(req) {
    try {
        const { searchParams } = new URL(req.url);
        const blogId = searchParams.get('blogId');
        const userId = searchParams.get('userId');

        if (!blogId || !userId) {
            return Response.json({ error: 'Blog ID and User ID required' }, { status: 400 });
        }

        // Remove bookmark
        const result = await query(`
      DELETE FROM blog_saves WHERE blog_id = ? AND user_id = ?
    `, [blogId, userId]);

        if (result.affectedRows === 0) {
            return Response.json({ error: 'Bookmark not found' }, { status: 404 });
        }

        // Update bookmark count in blogs table
        await query(`
      UPDATE blogs SET bookmark_count = bookmark_count - 1 WHERE id = ?
    `, [blogId]);

        return Response.json({ success: true, message: 'Bookmark removed' });
    } catch (error) {
        console.error('Bookmarks DELETE error:', error);
        return Response.json({ error: 'Internal server error' }, { status: 500 });
    }
}