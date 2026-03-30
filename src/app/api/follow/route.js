import { query } from '@/lib/db';

// Check if user is following author
export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const authorId = searchParams.get('authorId');
        const userId = searchParams.get('userId');

        if (!authorId || !userId) {
            return Response.json({ error: 'Author ID and User ID required' }, { status: 400 });
        }

        // Check if author exists
        const author = await query('SELECT id FROM admin_users WHERE id = ? AND status = "ACTIVE"', [authorId]);
        if (author.length === 0) {
            return Response.json({ error: 'Author not found' }, { status: 404 });
        }

        // Check follow status
        const result = await query(`
      SELECT id FROM author_followers WHERE author_id = ? AND follower_id = ?
    `, [authorId, userId]);

        return Response.json({ following: result.length > 0 });
    } catch (error) {
        console.error('Follow GET error:', error);
        return Response.json({ error: 'Internal server error' }, { status: 500 });
    }
}

// Follow author
export async function POST(req) {
    try {
        const { authorId, userId } = await req.json();

        if (!authorId || !userId) {
            return Response.json({ error: 'Author ID and User ID required' }, { status: 400 });
        }

        // Check if author exists and is active
        const author = await query(`
      SELECT id, name, slug FROM admin_users WHERE id = ? AND status = 'ACTIVE'
    `, [authorId]);

        if (author.length === 0) {
            return Response.json({ error: 'Author not found' }, { status: 404 });
        }

        // Check if already following
        const existing = await query(`
      SELECT id FROM author_followers WHERE author_id = ? AND follower_id = ?
    `, [authorId, userId]);

        if (existing.length > 0) {
            return Response.json({ alreadyFollowing: true });
        }

        // Add follow
        await query(`
      INSERT INTO author_followers (author_id, follower_id) VALUES (?, ?)
    `, [authorId, userId]);

        // Update follower count in admin_users table
        await query(`
      UPDATE admin_users SET follower_count = follower_count + 1 WHERE id = ?
    `, [authorId]);

        // Optional: Create notification for author
        await query(`
      INSERT INTO notifications (user_id, type, title, content, link)
      VALUES (?, 'new_follower', ?, ?, ?)
    `, [
            authorId,
            'New Follower',
            `${await getUsername(userId)} started following you`,
            `/authors/${author[0].slug}`
        ]);

        return Response.json({ success: true, following: true, message: `Now following ${author[0].name}` });
    } catch (error) {
        console.error('Follow POST error:', error);
        return Response.json({ error: 'Internal server error' }, { status: 500 });
    }
}

// Unfollow author
export async function DELETE(req) {
    try {
        const { searchParams } = new URL(req.url);
        const authorId = searchParams.get('authorId');
        const userId = searchParams.get('userId');

        if (!authorId || !userId) {
            return Response.json({ error: 'Author ID and User ID required' }, { status: 400 });
        }

        // Remove follow
        const result = await query(`
      DELETE FROM author_followers WHERE author_id = ? AND follower_id = ?
    `, [authorId, userId]);

        if (result.affectedRows === 0) {
            return Response.json({ error: 'Not following this author' }, { status: 404 });
        }

        // Update follower count in admin_users table
        await query(`
      UPDATE admin_users SET follower_count = follower_count - 1 WHERE id = ?
    `, [authorId]);

        return Response.json({ success: true, following: false, message: 'Unfollowed successfully' });
    } catch (error) {
        console.error('Follow DELETE error:', error);
        return Response.json({ error: 'Internal server error' }, { status: 500 });
    }
}

// Helper function to get username
async function getUsername(userId) {
    const user = await query('SELECT name FROM public_users WHERE id = ?', [userId]);
    return user[0]?.name || 'Someone';
}