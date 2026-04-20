import { query } from '@/lib/db';
import { verifyToken } from '@/lib/auth';

// Helper: extract userId from JWT cookie
function getUserId(req) {
    const token = req.cookies.get('token')?.value;
    if (!token) return null;
    const decoded = verifyToken(token);
    return decoded?.userId || null;
}

// Check if user is following author
export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const authorId = searchParams.get('authorId');
        const userId = getUserId(req);

        if (!authorId || !userId) {
            return Response.json({ following: false });
        }

        // author_followers table doesn't exist yet
        return Response.json({ following: false });
    } catch (error) {
        console.error('Follow GET error:', error);
        return Response.json({ error: 'Internal server error' }, { status: 500 });
    }
}

// Follow author
export async function POST(req) {
    try {
        const userId = getUserId(req);
        const { authorId } = await req.json();

        if (!authorId || !userId) {
            return Response.json({ error: 'Author ID and authentication required' }, { status: 400 });
        }

        // Check if author exists
        const author = await query('SELECT id, name FROM authors WHERE id = ?', [authorId]);

        if (author.length === 0) {
            return Response.json({ error: 'Author not found' }, { status: 404 });
        }

        // author_followers table doesn't exist yet — feature not available
        return Response.json({ success: false, message: 'Follow feature is coming soon.' });
    } catch (error) {
        console.error('Follow POST error:', error);
        return Response.json({ error: 'Internal server error' }, { status: 500 });
    }
}

// Unfollow author
export async function DELETE(req) {
    try {
        const userId = getUserId(req);
        const { searchParams } = new URL(req.url);
        const authorId = searchParams.get('authorId');

        if (!authorId || !userId) {
            return Response.json({ error: 'Author ID and authentication required' }, { status: 400 });
        }

        // author_followers table doesn't exist yet
        return Response.json({ success: false, message: 'Follow feature is coming soon.' });
    } catch (error) {
        console.error('Follow DELETE error:', error);
        return Response.json({ error: 'Internal server error' }, { status: 500 });
    }
}
