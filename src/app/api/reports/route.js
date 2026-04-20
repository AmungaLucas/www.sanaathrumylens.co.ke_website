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
            const post = await query('SELECT id FROM posts WHERE id = ?', [contentId]);
            contentExists = post.length > 0;
        } else if (contentType === 'COMMENT') {
            const comment = await query('SELECT id FROM comments WHERE id = ?', [contentId]);
            contentExists = comment.length > 0;
        }

        if (!contentExists) {
            return NextResponse.json({ error: 'Content not found' }, { status: 404 });
        }

        // Check if user already reported this content
        const existing = await query(`
            SELECT id FROM comment_reports
            WHERE reporter_id = ? AND comment_id = ? AND status = 'pending'
        `, [reporterId, contentId]);

        if (existing.length > 0) {
            return NextResponse.json({ error: 'You have already reported this content' }, { status: 400 });
        }

        // Create report
        const result = await query(`
            INSERT INTO comment_reports (comment_id, reporter_id, reported_user_id, status)
            VALUES (?, ?, NULL, 'pending')
        `, [contentId, reporterId]);

        return NextResponse.json({
            success: true,
            reportId: result.insertId,
            message: 'Thank you for your report. We will review it shortly.'
        });
    } catch (error) {
        console.error('Reports POST error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
