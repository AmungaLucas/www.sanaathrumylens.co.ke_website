export async function GET() {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://sanaathrumylens.co.ke';

    const robots = `# Robots.txt for Sanaa Thru My Lens
# https://sanaathrumylens.co.ke

User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/
Disallow: /dashboard/
Disallow: /profile/
Disallow: /bookmarks/

# Sitemaps
Sitemap: ${baseUrl}/sitemap.xml
Sitemap: ${baseUrl}/feed.xml

# Crawl delay to be respectful
Crawl-delay: 1

# Googlebot specific
User-agent: Googlebot
Allow: /
Crawl-delay: 0.5

# Bingbot specific
User-agent: Bingbot
Allow: /
Crawl-delay: 1

# For AI bots and scrapers (optional)
User-agent: GPTBot
Disallow: /

User-agent: ChatGPT-User
Disallow: /

User-agent: CCBot
Disallow: /

User-agent: anthropic-ai
Disallow: /

# AdSense bot
User-agent: Mediapartners-Google
Allow: /
`;

    return new Response(robots, {
        headers: {
            'Content-Type': 'text/plain',
            'Cache-Control': 'public, max-age=3600, s-maxage=3600',
        },
    });
}