import { query } from '@/lib/db';

export async function GET() {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://sanaathrumylens.co.ke';

    // Count total blogs to determine if we need multiple sitemaps
    const result = await query('SELECT COUNT(*) as total FROM blogs WHERE status = "PUBLISHED"');
    const totalBlogs = result[0].total;
    const blogsPerSitemap = 5000;
    const sitemapCount = Math.ceil(totalBlogs / blogsPerSitemap);

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${baseUrl}/sitemap.xml</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </sitemap>
  ${sitemapCount > 1 ? Array.from({ length: sitemapCount }, (_, i) => `
  <sitemap>
    <loc>${baseUrl}/sitemap-${i + 1}.xml</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </sitemap>
  `).join('') : ''}
</sitemapindex>`;

    return new Response(xml, {
        headers: {
            'Content-Type': 'application/xml',
            'Cache-Control': 'public, max-age=3600, s-maxage=3600',
        },
    });
}