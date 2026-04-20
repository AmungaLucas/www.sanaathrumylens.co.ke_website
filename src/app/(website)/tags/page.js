import { getPopularTags } from '@/lib/queries';
import Link from 'next/link';
import GoogleAd from '@/components/ui/GoogleAd';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: "Tags - Sanaa Thru My Lens",
  description: "Browse articles by tags. Discover topics like architecture, design, urbanism, and more",
  keywords: "kenya tags, article topics, popular tags",
  alternates: {
    canonical: 'https://www.sanaathrumylens.co.ke/tags',
  },
};

export default async function TagsPage() {
  const tags = await getPopularTags(100); // Get all tags

  // Group tags by first letter
  const groupedTags = tags.reduce((acc, tag) => {
    const firstLetter = tag.name.charAt(0).toUpperCase();
    if (!acc[firstLetter]) acc[firstLetter] = [];
    acc[firstLetter].push(tag);
    return acc;
  }, {});

  const sortedLetters = Object.keys(groupedTags).sort();

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-linear-to-r from-blue-600 to-purple-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">
            Explore Tags
          </h1>
          <p className="text-lg text-blue-100 max-w-2xl">
            Discover articles by topic. Find what interests you most.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Main Content */}
          <div className="flex-1">
            {/* Tag Cloud */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                All Tags ({tags.length})
              </h2>

              {/* Popular Tags Cloud */}
              <div className="mb-8">
                <h3 className="text-lg font-medium text-gray-800 mb-4">Popular Tags</h3>
                <div className="flex flex-wrap gap-3">
                  {tags.slice(0, 30).map((tag) => (
                    <Link
                      key={tag.id}
                      href={`/tags/${tag.slug}`}
                      className="group inline-block px-4 py-2 bg-gray-100 rounded-full hover:bg-blue-100 transition-all duration-200"
                      style={{
                        fontSize: `${Math.max(12, Math.min(20, 12 + tag.usage_count * 0.2))}px`,
                      }}
                    >
                      <span className="text-gray-700 group-hover:text-blue-600">
                        #{tag.name}
                      </span>
                      <span className="ml-1 text-xs text-gray-500 group-hover:text-blue-500">
                        ({tag.usage_count})
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* All Tags by Letter */}
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-4">All Tags</h3>
                {sortedLetters.map((letter) => (
                  <div key={letter} className="mb-6 last:mb-0">
                    <h4 className="text-2xl font-bold text-gray-800 mb-3 border-b border-gray-200 pb-1">
                      {letter}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {groupedTags[letter].map((tag) => (
                        <Link
                          key={tag.id}
                          href={`/tags/${tag.slug}`}
                          className="px-3 py-1.5 bg-gray-50 text-gray-700 text-sm rounded-full hover:bg-blue-100 hover:text-blue-600 transition"
                        >
                          #{tag.name}
                          <span className="ml-1 text-xs text-gray-400">
                            ({tag.usage_count})
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {tags.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500">No tags found.</p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="w-full lg:w-80 space-y-6">
            {/* Ad */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden sticky top-24">
              <div className="p-3 bg-gray-50 border-b border-gray-100">
                <p className="text-xs text-gray-400 text-center">Sponsored</p>
              </div>
              <div className="p-4">
                <GoogleAd slot="tags-sidebar" format="rectangle" style={{ minHeight: '250px' }} />
              </div>
            </div>

            {/* Top Tags Widget */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <h3 className="font-semibold text-gray-900 mb-4">Top 20 Tags</h3>
              <div className="flex flex-wrap gap-2">
                {tags.slice(0, 20).map((tag) => (
                  <Link
                    key={tag.id}
                    href={`/tags/${tag.slug}`}
                    className="px-3 py-1.5 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-blue-100 hover:text-blue-600 transition"
                  >
                    #{tag.name}
                  </Link>
                ))}
              </div>
              <div className="mt-4 pt-3 border-t border-gray-100">
                <Link href="/tags" className="text-sm text-blue-600 hover:text-blue-800">
                  View all tags →
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}