import { query } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get('q');
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = parseInt(searchParams.get('offset') || '0');

    if (!q || q.length < 2) {
      return NextResponse.json({ articles: [], total: 0 });
    }

    const searchTerm = `%${q}%`;

    // Search articles
    const articles = await query(`
      SELECT
        b.id, b.title, b.slug, b.excerpt, b.featured_image,
        b.published_at, b.stats_views as view_count,
        a.name as author_name, a.slug as author_slug
      FROM posts b
      LEFT JOIN authors a ON b.author_id = a.id
      WHERE b.status = 'published'
        AND b.is_deleted = FALSE
        AND (b.title LIKE ? OR b.content LIKE ? OR b.excerpt LIKE ?)
      ORDER BY
        CASE
          WHEN b.title LIKE ? THEN 3
          WHEN b.excerpt LIKE ? THEN 2
          ELSE 1
        END DESC,
        b.published_at DESC
      LIMIT ? OFFSET ?
    `, [searchTerm, searchTerm, searchTerm, searchTerm, searchTerm, limit, offset]);

    // Count total results
    const countResult = await query(`
      SELECT COUNT(*) as total
      FROM posts
      WHERE status = 'published'
        AND is_deleted = FALSE
        AND (title LIKE ? OR content LIKE ? OR excerpt LIKE ?)
    `, [searchTerm, searchTerm, searchTerm]);

    return NextResponse.json({
      articles,
      total: countResult[0].total,
      query: q
    });
  } catch (error) {
    console.error('Search API error:', error);
    return NextResponse.json({ articles: [], total: 0, query: '', error: 'Search failed' }, { status: 500 });
  }
}
