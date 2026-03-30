import { query } from '@/lib/db';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const tag = searchParams.get('tag');
  const limit = parseInt(searchParams.get('limit') || '20');

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://sanaathrumylens.co.ke';

  // Build query based on filters
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
      a.name as author_name,
      a.slug as author_slug,
      GROUP_CONCAT(DISTINCT c.name ORDER BY c.name SEPARATOR ', ') as categories,
      GROUP_CONCAT(DISTINCT t.name ORDER BY t.name SEPARATOR ', ') as tags
    FROM blogs b
    LEFT JOIN admin_users a ON b.author_id = a.id
    LEFT JOIN blog_categories bc ON bc.blog_id = b.id
    LEFT JOIN categories c ON c.id = bc.category_id
    LEFT JOIN blog_tags bt ON bt.blog_id = b.id
    LEFT JOIN tags t ON t.id = bt.tag_id
    WHERE b.status = 'PUBLISHED'
  `;

  const params = [];

  if (category) {
    sql += ` AND c.slug = ?`;
    params.push(category);
  }

  if (tag) {
    sql += ` AND t.slug = ?`;
    params.push(tag);
  }

  sql += ` GROUP BY b.id ORDER BY b.published_at DESC LIMIT ?`;
  params.push(limit);

  const blogs = await query(sql, params);

  // Build RSS feed title and description
  let feedTitle = 'Sanaa Thru My Lens';
  let feedDescription = 'Exploring architecture, design, and creative culture in Kenya';

  if (category) {
    const cat = await query('SELECT name FROM categories WHERE slug = ?', [category]);
    if (cat[0]) {
      feedTitle = `${cat[0].name} - Sanaa Thru My Lens`;
      feedDescription = `Latest articles about ${cat[0].name} from Kenya's creative ecosystem`;
    }
  }

  if (tag) {
    const tagData = await query('SELECT name FROM tags WHERE slug = ?', [tag]);
    if (tagData[0]) {
      feedTitle = `#${tagData[0].name} - Sanaa Thru My Lens`;
      feedDescription = `Latest articles tagged with #${tagData[0].name}`;
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
    
    ${blogs.map(blog => `
    <item>
      <title>${escapeXml(blog.title)}</title>
      <link>${baseUrl}/blogs/${blog.slug}</link>
      <guid isPermaLink="true">${baseUrl}/blogs/${blog.slug}</guid>
      <description><![CDATA[${blog.excerpt || ''}]]></description>
      <content:encoded><![CDATA[
        ${blog.featured_image ? `<img src="${blog.featured_image}" alt="${escapeXml(blog.title)}" /><br/>` : ''}
        ${blog.excerpt || ''}
        <br/><br/>
        <a href="${baseUrl}/blogs/${blog.slug}">Read more →</a>
      ]]></content:encoded>
      <pubDate>${new Date(blog.published_at).toUTCString()}</pubDate>
      <dc:creator>${escapeXml(blog.author_name)}</dc:creator>
      ${blog.categories ? blog.categories.split(',').map(cat => `
      <category>${escapeXml(cat.trim())}</category>
      `).join('') : ''}
      ${blog.tags ? blog.tags.split(',').map(tag => `
      <category>${escapeXml(tag.trim())}</category>
      `).join('') : ''}
    </item>
    `).join('')}
    
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