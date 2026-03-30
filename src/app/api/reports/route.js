import { query } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        const { contentType, contentId, reason, description, reporterId } = await req.json();

        if (!contentType || !contentId || !reason || !reporterId) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Validate content type
        if (!['BLOG', 'COMMENT'].includes(contentType)) {
            return NextResponse.json({ error: 'Invalid content type' }, { status: 400 });
        }

        // Check if content exists
        let contentExists = false;
        if (contentType === 'BLOG') {
            const blog = await query('SELECT id FROM blogs WHERE id = ?', [contentId]);
            contentExists = blog.length > 0;
        } else if (contentType === 'COMMENT') {
            const comment = await query('SELECT id FROM comments WHERE id = ?', [contentId]);
            contentExists = comment.length > 0;
        }

        if (!contentExists) {
            return NextResponse.json({ error: 'Content not found' }, { status: 404 });
        }

        // Check if user already reported this content
        const existing = await query(`
      SELECT id FROM content_reports
      WHERE reporter_id = ? AND content_type = ? AND content_id = ? AND status = 'PENDING'
    `, [reporterId, contentType, contentId]);

        if (existing.length > 0) {
            return NextResponse.json({ error: 'You have already reported this content' }, { status: 400 });
        }

        // Create report
        const result = await query(`
      INSERT INTO content_reports (reporter_id, content_type, content_id, reason, description, status)
      VALUES (?, ?, ?, ?, ?, 'PENDING')
    `, [reporterId, contentType, contentId, reason, description || null]);

        // Fetch the generated UUID back (insertId is 0 for UUID primary keys)
        let reportId = null;
        if (result.insertId && result.insertId > 0) {
            reportId = result.insertId;
        } else {
            const [created] = await query(
                'SELECT id FROM content_reports WHERE reporter_id = ? AND content_type = ? AND content_id = ? AND status = ? ORDER BY created_at DESC LIMIT 1',
                [reporterId, contentType, contentId, 'PENDING']
            );
            reportId = created?.id || null;
        }

        // Optional: Notify admin (if you have notification system)
        notifyAdmins(contentType, contentId, reason);

        return NextResponse.json({
            success: true,
            reportId,
            message: 'Thank you for your report. We will review it shortly.'
        });
    } catch (error) {
        console.error('Reports POST error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

// Helper function to notify admins (placeholder)
async function notifyAdmins(contentType, contentId, reason) {
    // This could send an email or create admin notifications
    console.log(`New report: ${contentType} #${contentId} - Reason: ${reason}`);
}
