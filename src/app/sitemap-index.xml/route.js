import { query } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://sanaathrumylens.co.ke';

    // Count total posts to determine if we need multiple sitemaps
    const result = await query("SELECT COUNT(*) as total FROM posts WHERE status = ? AND is_deleted = FALSE", ['published']);
    const totalPosts = result[0].total;
    const postsPerSitemap = 5000;
    const sitemapCount = Math.ceil(totalPosts / postsPerSitemap);

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${baseUrl}/sitemap.xml</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </sitemap>
  ${sitemapCount > 1 ? Array.from({ length: sitemapCount - 1 }, (_, i) => `
  <sitemap>
    <loc>${baseUrl}/sitemap-${i + 2}.xml</loc>
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
