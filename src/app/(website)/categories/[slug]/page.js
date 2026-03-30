import { notFound } from 'next/navigation';
import { getCategoryBySlug, getArticlesByCategory, getPopularTags, getRecentStories } from '@/lib/queries';
import Link from 'next/link';
import ArticleCard from '@/app/(website)/(homepage)/_components/ArticleCard';
import GoogleAd from '@/components/ui/GoogleAd';
import NewsletterWidget from '@/app/(website)/(homepage)/_components/widgets/NewsletterWidget';
import RecentStoriesWidget from '@/app/(website)/(homepage)/_components/widgets/RecentStoriesWidget';
import PopularTagsWidget from '@/app/(website)/(homepage)/_components/widgets/PopularTagsWidget';

// Generate metadata dynamically
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    return {
      title: 'Category Not Found',
      description: 'The requested category could not be found.',
    };
  }

  return {
    title: `${category.name} - Sanaa Thru My Lens`,
    description: category.description || `Explore articles about ${category.name}. Discover insights, stories, and perspectives from Kenya's creative ecosystem.`,
    keywords: `${category.name.toLowerCase()}, kenya ${category.name.toLowerCase()}, ${category.name} articles`,
    openGraph: {
      title: `${category.name} Articles`,
      description: category.description || `Explore ${category.name} content on Sanaa Thru My Lens`,
      type: 'website',
    },
  };
}

export default async function CategoryPage({ params }) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  // Fetch articles for this category
  const articles = await getArticlesByCategory(category.id, 12, 0);
  const popularTags = await getPopularTags(15);
  const recentStories = await getRecentStories(4);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Category Header */}
      <div className="bg-linear-to-r from-blue-600 to-purple-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2 text-sm mb-4">
            <Link href="/" className="text-blue-200 hover:text-white">Home</Link>
            <span className="text-blue-300">/</span>
            <Link href="/categories" className="text-blue-200 hover:text-white">Categories</Link>
            <span className="text-blue-300">/</span>
            <span className="text-white">{category.name}</span>
          </div>

          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-4xl">{getCategoryIcon(category.name)}</span>
                <h1 className="text-3xl sm:text-4xl font-bold">
                  {category.name}
                </h1>
              </div>
              {category.description && (
                <p className="text-lg text-blue-100 max-w-2xl mt-2">
                  {category.description}
                </p>
              )}
              <p className="text-blue-200 mt-3">
                {articles.length} {articles.length === 1 ? 'article' : 'articles'} in this category
              </p>
            </div>

            {/* RSS Feed Link */}
            <Link
              href={`/feed.xml?category=${category.slug}`}
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

                {/* Pagination (add later) */}
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
                <div className="text-6xl mb-4">📭</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No articles yet
                </h3>
                <p className="text-gray-600">
                  Check back soon for articles in this category.
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
                <GoogleAd slot="category-sidebar" format="rectangle" style={{ minHeight: '250px' }} />
              </div>
            </div>

            {/* Newsletter */}
            <div className="bg-linear-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
              <h3 className="text-lg font-semibold mb-2">Subscribe for Updates</h3>
              <p className="text-sm text-blue-100 mb-4">
                Get notified when new articles are published in this category
              </p>
              <NewsletterWidget />
            </div>

            {/* Recent Stories */}
            <RecentStoriesWidget stories={recentStories} />

            {/* Popular Tags */}
            <PopularTagsWidget tags={popularTags} />
          </aside>
        </div>
      </div>
    </div>
  );
}

// Helper function for category icons
function getCategoryIcon(categoryName) {
  const icons = {
    'Architecture': '🏛️',
    'Design': '🎨',
    'Urbanism': '🏙️',
    'Culture': '🎭',
    'Technology': '💻',
    'Sustainability': '🌱',
    'Art': '🖼️',
    'Photography': '📸',
    'Interviews': '🎤',
    'Reviews': '⭐',
  };
  return icons[categoryName] || '📁';
}