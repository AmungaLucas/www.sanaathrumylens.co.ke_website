import Image from 'next/image';
import {
  getLatestArticles,
  getTrendingArticles,
  getPopularArticles,
  getEditorsPicks,
  getFeaturedArticle,
  getRecentStories,
  getAllCategories,
  getPopularTags,
  getUpcomingEvents,
  getTopAuthors
} from '@/lib/queries';

// Components
import HeroSection from './_components/HeroSection';
import TrendingSection from './_components/TrendingSection';
import ArticleCard from './_components/ArticleCard';
import EditorsPicksSection from './_components/EditorsPicksSection';
import FeaturedArticleCard from './_components/FeaturedArticleCard';
import CompactArticleCard from './_components/CompactArticleCard';
import NewsletterWidget from './_components/widgets/NewsletterWidget';
import TopAuthorsWidget from './_components/widgets/TopAuthorsWidget';
import RecentStoriesWidget from './_components/widgets/RecentStoriesWidget';
import UpcomingEventsWidget from './_components/widgets/UpcomingEventsWidget';
import CategoriesWidget from './_components/widgets/CategoriesWidget';
import PopularTagsWidget from './_components/widgets/PopularTagsWidget';

// Google Ad Component
import GoogleAd from '@/components/ui/GoogleAd';

// SEO Metadata
export const metadata = {
  title: "Sanaa Thru My Lens - Kenya's Creative Ecosystem",
  description: "Exploring architecture, design, urbanism, and creative culture in Kenya",
  keywords: "kenya architecture, creative ecosystem, design, urbanism",
  verification: {
    google: 'ca-pub-8031704055036556',
  },
};

export default async function HomePage() {
  // Fetch all data in parallel with error handling
  const [
    latestArticles,
    trendingArticles,
    popularArticles,
    editorsPicks,
    featuredArticle,
    recentStories,
    categories,
    popularTags,
    upcomingEvents,
    topAuthors
  ] = await Promise.all([
    getLatestArticles(6).catch(() => []),
    getTrendingArticles(5).catch(() => []),
    getPopularArticles(3).catch(() => []),
    getEditorsPicks(4).catch(() => []),
    getFeaturedArticle().catch(() => null),
    getRecentStories(4).catch(() => []),
    getAllCategories(8).catch(() => []),
    getPopularTags(12).catch(() => []),
    getUpcomingEvents(3).catch(() => []),
    getTopAuthors(5).catch(() => [])
  ]);

  return (
    <>
      {/* Hero Section */}
      <HeroSection />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">

        {/* Trending Now */}
        {trendingArticles.length > 0 && (
          <div className="mb-12">
            <TrendingSection articles={trendingArticles} />
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-8">

          {/* ========== LEFT COLUMN - MAIN CONTENT ========== */}
          <div className="flex-1 min-w-0">

            {/* Latest Articles Section */}
            <section className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                    Latest from the Creative Ecosystem
                  </h2>
                  <p className="text-gray-600 mt-1">
                    Fresh stories from Kenya&apos;s creative community
                  </p>
                </div>
                <a
                  href="/blogs"
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1"
                >
                  View all
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {latestArticles.slice(0, 3).map((article, index) => (
                  <ArticleCard key={article.id} article={article} index={index} />
                ))}
              </div>

              {/* AD POSITION 1: Between article rows - Mid-page high engagement */}
              <div className="my-8">
                <div className="bg-gray-50 rounded-xl p-4 text-center border border-gray-200">
                  <p className="text-xs text-gray-400 mb-2">Advertisement</p>
                  <GoogleAd
                    slot="1234567890" // Replace with your actual ad slot ID
                    format="auto"
                    style={{ minHeight: '90px' }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                {latestArticles.slice(3, 6).map((article, index) => (
                  <ArticleCard key={article.id} article={article} index={index + 3} />
                ))}
              </div>
            </section>

            {/* Editor's Picks */}
            {editorsPicks.length > 0 && (
              <section className="mb-12">
                <EditorsPicksSection articles={editorsPicks} />
              </section>
            )}

            {/* Popular Articles */}
            {popularArticles.length > 0 && (
              <section className="mb-12">
                <div className="flex items-center gap-2 mb-6">
                  <span className="text-2xl">🔥</span>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Popular Articles
                  </h2>
                  <span className="text-sm text-gray-500">
                    Most read this month
                  </span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Featured large card */}
                  {popularArticles[0] && (
                    <div className="lg:col-span-2">
                      <FeaturedArticleCard article={popularArticles[0]} />
                    </div>
                  )}

                  {/* Stacked smaller cards */}
                  <div className="space-y-6">
                    {popularArticles.slice(1).map((article) => (
                      <CompactArticleCard key={article.id} article={article} />
                    ))}
                  </div>
                </div>
              </section>
            )}
          </div>

          {/* ========== RIGHT COLUMN - SIDEBAR ========== */}
          <aside className="w-full lg:w-80 space-y-6">

            {/* AD POSITION 2: Sidebar Top - Highest visibility, above the fold */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-3 bg-gray-50 border-b border-gray-100">
                <p className="text-xs text-gray-400 text-center">Sponsored</p>
              </div>
              <div className="p-4">
                <GoogleAd
                  slot="0987654321" // Replace with your actual ad slot ID
                  format="rectangle"
                  style={{ minHeight: '250px' }}
                />
              </div>
            </div>

            {/* Newsletter Subscription */}
            <div className="bg-linear-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">📧</span>
                <h3 className="text-lg font-semibold">Subscribe to Newsletter</h3>
              </div>
              <p className="text-sm text-blue-100 mb-4">
                Get the latest stories delivered to your inbox weekly
              </p>
              <NewsletterWidget />
            </div>

            {/* Featured Article */}
            {featuredArticle && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                      Featured
                    </span>
                  </div>
                  {featuredArticle.featured_image && (
                    <div className="relative w-full h-40 rounded-lg overflow-hidden mb-3">
                      <Image
                        src={featuredArticle.featured_image}
                        alt={featuredArticle.title}
                        fill
                        sizes="320px"
                        className="object-cover"
                      />
                    </div>
                  )}
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                    <a href={`/blogs/${featuredArticle.slug}`} className="hover:text-blue-600">
                      {featuredArticle.title}
                    </a>
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                    {featuredArticle.excerpt}
                  </p>
                  <a
                    href={`/blogs/${featuredArticle.slug}`}
                    className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Read more →
                  </a>
                </div>
              </div>
            )}

            {/* Top Authors */}
            {topAuthors.length > 0 && (
              <TopAuthorsWidget authors={topAuthors} />
            )}

            {/* Recent Stories */}
            <RecentStoriesWidget stories={recentStories} />

            {/* Upcoming Events */}
            {upcomingEvents.length > 0 && (
              <UpcomingEventsWidget events={upcomingEvents} />
            )}

            {/* Categories */}
            {categories.length > 0 && (
              <CategoriesWidget categories={categories} />
            )}

            {/* Popular Tags */}
            {popularTags.length > 0 && (
              <PopularTagsWidget tags={popularTags} />
            )}

            {/* AD POSITION 3: Sidebar Bottom - Completion view */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-3 bg-gray-50 border-b border-gray-100">
                <p className="text-xs text-gray-400 text-center">Advertisement</p>
              </div>
              <div className="p-4">
                <GoogleAd
                  slot="1122334455" // Replace with your actual ad slot ID
                  format="auto"
                  style={{ minHeight: '250px' }}
                />
              </div>
            </div>
          </aside>
        </div>

        {/* AD POSITION 4: Before Footer - Optional but recommended */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="bg-gray-50 rounded-xl p-6 text-center">
            <p className="text-xs text-gray-400 mb-3">Advertisement</p>
            <GoogleAd
              slot="5544332211" // Replace with your actual ad slot ID
              format="auto"
              style={{ minHeight: '90px' }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
