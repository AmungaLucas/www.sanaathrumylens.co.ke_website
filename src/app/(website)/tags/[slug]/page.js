import { notFound } from 'next/navigation';
import { getTagBySlug, getArticlesByTag, getPopularTags, getRecentStories } from '@/lib/queries';
import Link from 'next/link';
import ArticleCard from '@/app/(website)/(homepage)/_components/ArticleCard';
import GoogleAd from '@/components/ui/GoogleAd';
import NewsletterWidget from '@/app/(website)/(homepage)/_components/widgets/NewsletterWidget';
import RecentStoriesWidget from '@/app/(website)/(homepage)/_components/widgets/RecentStoriesWidget';
import PopularTagsWidget from '@/app/(website)/(homepage)/_components/widgets/PopularTagsWidget';

export const dynamic = 'force-dynamic';

// Generate metadata dynamically
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const tag = await getTagBySlug(slug);

  if (!tag) {
    return {
      title: 'Tag Not Found',
      description: 'The requested tag could not be found.',
    };
  }

  return {
    title: `#${tag.name} - Sanaa Thru My Lens`,
    description: `Explore articles tagged with #${tag.name}. Discover insights, stories, and perspectives from Kenya's creative ecosystem.`,
    keywords: `${tag.name}, kenya ${tag.name}, ${tag.name} articles`,
    openGraph: {
      title: `#${tag.name} Articles`,
      description: `Explore ${tag.name} content on Sanaa Thru My Lens`,
      type: 'website',
    },
  };
}

export default async function TagPage({ params }) {
  const { slug } = await params;
  const tag = await getTagBySlug(slug);

  if (!tag) {
    notFound();
  }

  // Fetch articles for this tag
  const articles = await getArticlesByTag(tag.id, 12, 0);
  const popularTags = await getPopularTags(15);
  const recentStories = await getRecentStories(4);
  const relatedTags = popularTags.filter(t => t.id !== tag.id).slice(0, 10);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Tag Header */}
      <div className="bg-linear-to-r from-purple-600 to-pink-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2 text-sm mb-4">
            <Link href="/" className="text-purple-200 hover:text-white">Home</Link>
            <span className="text-purple-300">/</span>
            <Link href="/tags" className="text-purple-200 hover:text-white">Tags</Link>
            <span className="text-purple-300">/</span>
            <span className="text-white">#{tag.name}</span>
          </div>

          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-4xl">🏷️</span>
                <h1 className="text-3xl sm:text-4xl font-bold">
                  #{tag.name}
                </h1>
              </div>
              <p className="text-lg text-purple-100 max-w-2xl mt-2">
                {articles.length} {articles.length === 1 ? 'article' : 'articles'} tagged with #{tag.name}
              </p>
            </div>

            {/* RSS Feed Link */}
            <Link
              href={`/feed.xml?tag=${tag.slug}`}
              className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M6 5c7.18 0 13 5.82 13 13M6 11a7 7 0 017 7m-6 0a1 1 0 11-2 0 1 1 0 012 0z" />
              </svg>
              <span className="text-sm">RSS Feed</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {articles.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {articles.map((article, index) => (
                    <ArticleCard key={article.id} article={article} index={index} />
                  ))}
                </div>

                {/* Pagination */}
                {articles.length >= 12 && (
                  <div className="mt-8 text-center">
                    <button className="px-6 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                      Load More
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
                <div className="text-6xl mb-4">🏷️</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No articles yet
                </h3>
                <p className="text-gray-600">
                  Check back soon for articles tagged with #{tag.name}.
                </p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="w-full lg:w-80 space-y-6">
            {/* Ad */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden ">
              <div className="p-3 bg-gray-50 border-b border-gray-100">
                <p className="text-xs text-gray-400 text-center">Sponsored</p>
              </div>
              <div className="p-4">
                <GoogleAd slot="tag-sidebar" format="rectangle" style={{ minHeight: '250px' }} />
              </div>
            </div>

            {/* Related Tags */}
            {relatedTags.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                <h3 className="font-semibold text-gray-900 mb-4">Related Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {relatedTags.map((relatedTag) => (
                    <Link
                      key={relatedTag.id}
                      href={`/tags/${relatedTag.slug}`}
                      className="px-3 py-1.5 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-blue-100 hover:text-blue-600 transition"
                    >
                      #{relatedTag.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Newsletter */}
            <div className="bg-linear-to-r from-purple-600 to-pink-600 rounded-xl p-6 text-white">
              <h3 className="text-lg font-semibold mb-2">Subscribe for Updates</h3>
              <p className="text-sm text-purple-100 mb-4">
                Get notified when new articles are published with #{tag.name}
              </p>
              <NewsletterWidget />
            </div>

            {/* Recent Stories */}
            <RecentStoriesWidget stories={recentStories} />

            {/* Popular Tags */}
            <PopularTagsWidget tags={popularTags.slice(0, 10)} />
          </aside>
        </div>
      </div>
    </div>
  );
}