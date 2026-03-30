import Link from 'next/link';

export default function SEOTestPage() {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

    const endpoints = [
        { name: 'Sitemap', url: '/sitemap.xml', type: 'XML' },
        { name: 'RSS Feed', url: '/feed.xml', type: 'XML' },
        { name: 'Robots.txt', url: '/robots.txt', type: 'Text' },
        { name: 'Categories', url: '/categories', type: 'HTML' },
        { name: 'Tags', url: '/tags', type: 'HTML' },
        { name: 'Blogs', url: '/blogs', type: 'HTML' },
        { name: 'Events', url: '/events', type: 'HTML' },
        { name: 'Authors', url: '/authors', type: 'HTML' },
    ];

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <h1 className="text-2xl font-bold mb-6">SEO Configuration Test</h1>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
                <h2 className="text-lg font-semibold mb-4">SEO Endpoints</h2>
                <div className="grid gap-3">
                    {endpoints.map((endpoint) => (
                        <div key={endpoint.url} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div>
                                <span className="font-medium">{endpoint.name}</span>
                                <span className="ml-2 text-xs text-gray-500">{endpoint.type}</span>
                            </div>
                            <div className="flex gap-3">
                                <code className="text-sm text-gray-600">{baseUrl}{endpoint.url}</code>
                                <a
                                    href={endpoint.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:text-blue-800 text-sm"
                                >
                                    Open →
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold mb-4">Google Search Console Verification</h2>
                <p className="text-gray-600 mb-4">
                    Add these URLs to Google Search Console:
                </p>
                <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                        <span className="text-green-500">✓</span>
                        <code className="text-sm">{baseUrl}/sitemap.xml</code>
                    </li>
                    <li className="flex items-center gap-2">
                        <span className="text-green-500">✓</span>
                        <code className="text-sm">{baseUrl}/feed.xml</code>
                    </li>
                    <li className="flex items-center gap-2">
                        <span className="text-green-500">✓</span>
                        <code className="text-sm">{baseUrl}/robots.txt</code>
                    </li>
                </ul>
            </div>

            <div className="mt-8 text-center">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800"
                >
                    ← Back to Home
                </Link>
            </div>
        </div>
    );
}