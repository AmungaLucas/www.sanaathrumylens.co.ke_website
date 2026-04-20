import { query } from '@/lib/db';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const tag = searchParams.get('tag');
  const limit = parseInt(searchParams.get('limit') || '20');

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://sanaathrumylens.co.ke';

  // Build query for published posts
  let sql = `
    SELECT
      b.id,
      b.title,
      b.slug,
      b.excerpt,
      b.content,
      b.featured_image,
      b.published_at,
      b.updated_at,
      b.category_ids,
      b.tags,
      a.name as author_name,
      a.slug as author_slug
    FROM posts b
    LEFT JOIN authors a ON b.author_id = a.id
    WHERE b.status = 'published' AND b.is_deleted = FALSE
  `;

  const params = [];

  if (category) {
    sql += ` AND JSON_CONTAINS(b.category_ids, CAST((SELECT id FROM categories WHERE slug = ? LIMIT 1) AS CHAR))`;
    params.push(category);
  }

  if (tag) {
    // Filter by tag in JSON field - simplified approach
    sql += ` AND b.tags LIKE ?`;
    params.push(`%"${tag}"%`);
  }

  sql += ` ORDER BY b.published_at DESC LIMIT ?`;
  params.push(limit);

  const posts = await query(sql, params).catch(() => []);

  // Build RSS feed title and description
  let feedTitle = 'Sanaa Thru My Lens';
  let feedDescription = 'Exploring architecture, design, and creative culture in Kenya';

  if (category) {
    const cat = await query('SELECT name FROM categories WHERE slug = ?', [category]).catch(() => []);
    if (cat[0]) {
      feedTitle = `${cat[0].name} - Sanaa Thru My Lens`;
      feedDescription = `Latest articles about ${cat[0].name} from Kenya's creative ecosystem`;
    }
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
     xmlns:dc="http://purl.org/dc/elements/1.1/"
     xmlns:content="http://purl.org/rss/1.0/modules/content/"
     xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(feedTitle)}</title>
    <link>${baseUrl}</link>
    <description>${escapeXml(feedDescription)}</description>
    <language>en-ke</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml" />
    <image>
      <url>${baseUrl}/logo.png</url>
      <title>${escapeXml(feedTitle)}</title>
      <link>${baseUrl}</link>
    </image>

    ${posts.map(post => {
      // Parse tags from JSON
      let tagNames = [];
      if (post.tags) {
        try {
          const parsed = typeof post.tags === 'string' ? JSON.parse(post.tags) : post.tags;
          if (Array.isArray(parsed)) {
            tagNames = parsed.map(t => typeof t === 'string' ? t : (t.name || '')).filter(Boolean);
          }
        } catch {}
      }

      return `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${baseUrl}/blogs/${post.slug}</link>
      <guid isPermaLink="true">${baseUrl}/blogs/${post.slug}</guid>
      <description><![CDATA[${post.excerpt || ''}]]></description>
      <content:encoded><![CDATA[
        ${post.featured_image ? `<img src="${post.featured_image}" alt="${escapeXml(post.title)}" /><br/>` : ''}
        ${post.excerpt || ''}
        <br/><br/>
        <a href="${baseUrl}/blogs/${post.slug}">Read more &rarr;</a>
      ]]></content:encoded>
      <pubDate>${new Date(post.published_at).toUTCString()}</pubDate>
      <dc:creator>${escapeXml(post.author_name || 'Sanaa Thru My Lens')}</dc:creator>
      ${tagNames.map(t => `<category>${escapeXml(t)}</category>`).join('')}
    </item>`;
    }).join('')}

  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}

function escapeXml(unsafe) {
  if (!unsafe) return '';
  return unsafe.replace(/[<>&'"]/g, function (c) {
    if (c === '<') return '&lt;';
    if (c === '>') return '&gt;';
    if (c === '&') return '&amp;';
    if (c === "'") return '&apos;';
    if (c === '"') return '&quot;';
    return c;
  });
}
