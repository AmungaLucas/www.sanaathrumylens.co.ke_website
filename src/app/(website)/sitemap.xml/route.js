import { query } from '@/lib/db';

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://sanaathrumylens.co.ke';

  // Fetch all content that should be indexed
  const [
    posts,
    categories,
    events,
    authors
  ] = await Promise.all([
    // Published posts
    query(`
      SELECT slug, updated_at, published_at
      FROM posts
      WHERE status = 'published' AND is_deleted = FALSE
      ORDER BY updated_at DESC
    `).catch(() => []),

    // Active categories
    query(`
      SELECT slug, created_at
      FROM categories
      WHERE is_active = TRUE
    `).catch(() => []),

    // Published events
    query(`
      SELECT slug, updated_at
      FROM events
      WHERE status = 'published'
      AND is_deleted = FALSE
      AND start_date >= NOW()
    `).catch(() => []),

    // Active authors
    query(`
      SELECT slug, updated_at
      FROM authors
    `).catch(() => [])
  ]);

  // Static pages that should be indexed
  const staticPages = [
    { url: '', changefreq: 'daily', priority: 1.0 },
    { url: 'blogs', changefreq: 'daily', priority: 0.9 },
    { url: 'events', changefreq: 'weekly', priority: 0.8 },
    { url: 'categories', changefreq: 'weekly', priority: 0.7 },
    { url: 'tags', changefreq: 'weekly', priority: 0.7 },
    { url: 'authors', changefreq: 'weekly', priority: 0.7 },
    { url: 'about', changefreq: 'monthly', priority: 0.5 },
    { url: 'contacts', changefreq: 'monthly', priority: 0.5 },
  ];

  // Build XML sitemap
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">

  ${staticPages.map(page => `
  <url>
    <loc>${baseUrl}/${page.url}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>
  `).join('')}

  ${posts.map(post => `
  <url>
    <loc>${baseUrl}/blogs/${post.slug}</loc>
    <lastmod>${new Date(post.updated_at).toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
    <news:news>
      <news:publication>
        <news:name>Sanaa Thru My Lens</news:name>
        <news:language>en</news:language>
      </news:publication>
      <news:publication_date>${new Date(post.published_at).toISOString()}</news:publication_date>
      <news:title>${escapeXml(post.title || '')}</news:title>
    </news:news>
  </url>
  `).join('')}

  ${categories.map(category => `
  <url>
    <loc>${baseUrl}/categories/${category.slug}</loc>
    <lastmod>${new Date(category.created_at).toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>
  `).join('')}

  ${events.map(event => `
  <url>
    <loc>${baseUrl}/events/${event.slug}</loc>
    <lastmod>${new Date(event.updated_at).toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
  `).join('')}

  ${authors.map(author => `
  <url>
    <loc>${baseUrl}/authors/${author.slug}</loc>
    <lastmod>${new Date(author.updated_at).toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>
  `).join('')}

</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}

// Helper function to escape XML special characters
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
