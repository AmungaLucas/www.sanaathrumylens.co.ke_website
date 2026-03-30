import { Suspense } from 'react';
import { getAllBlogs, countAllBlogs, getAllCategories, getPopularTags } from '@/lib/queries';
import BlogFilters from './_components/BlogFilters';
import BlogGrid from './_components/BlogGrid';
import BlogPagination from './_components/BlogPagination';
import GoogleAd from '@/components/ui/GoogleAd';

// SEO Metadata
export const metadata = {
  title: "All Articles - Sanaa Thru My Lens",
  description: "Explore our collection of articles on architecture, design, urbanism, and creative culture in Kenya",
  keywords: "kenya architecture articles, design blog, creative ecosystem, urbanism kenya",
};

export default async function BlogsPage({ searchParams }) {
  const page = parseInt(searchParams.page) || 1;
  const category = searchParams.category || null;
  const tag = searchParams.tag || null;
  const limit = 12;
  const offset = (page - 1) * limit;

  // Fetch data in parallel
  const [articles, totalArticles, categories, popularTags] = await Promise.all([
    getAllBlogs(limit, offset),
    countAllBlogs(),
    getAllCategories(20),
    getPopularTags(20)
  ]);

  const totalPages = Math.ceil(totalArticles / limit);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-linear-to-r from-blue-600 to-purple-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">
            All Articles
          </h1>
          <p className="text-lg text-blue-100 max-w-2xl">
            Discover stories, insights, and perspectives from Kenya&apos;s creative ecosystem
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Filters */}
            <BlogFilters
              categories={categories}
              tags={popularTags}
              currentCategory={category}
              currentTag={tag}
            />

            {/* Articles Grid */}
            {articles.length > 0 ? (
              <>
                <BlogGrid articles={articles} />

                {/* Pagination */}
                {totalPages > 1 && (
                  <BlogPagination
                    currentPage={page}
                    totalPages={totalPages}
                    category={category}
                    tag={tag}
                  />
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">No articles found.</p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="w-full lg:w-80 space-y-6">
            {/* Ad Position 1: Sidebar Top */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-3 bg-gray-50 border-b border-gray-100">
                <p className="text-xs text-gray-400 text-center">Sponsored</p>
              </div>
              <div className="p-4">
                <GoogleAd slot="blog-sidebar-top" format="rectangle" style={{ minHeight: '250px' }} />
              </div>
            </div>

            {/* Categories Widget */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <h3 className="font-semibold text-gray-900 mb-4">Categories</h3>
              <div className="space-y-2">
                {categories.slice(0, 10).map((cat) => (
                  <a
                    key={cat.id}
                    href={`/blogs?category=${cat.slug}`}
                    className={`flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition ${category === cat.slug ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                      }`}
                  >
                    <span>{cat.name}</span>
                    <span className="text-sm text-gray-500">({cat.post_count})</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Ad Position 2: Sidebar Middle */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-3 bg-gray-50 border-b border-gray-100">
                <p className="text-xs text-gray-400 text-center">Advertisement</p>
              </div>
              <div className="p-4">
                <GoogleAd slot="blog-sidebar-middle" format="rectangle" style={{ minHeight: '250px' }} />
              </div>
            </div>

            {/* Popular Tags */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <h3 className="font-semibold text-gray-900 mb-4">Popular Tags</h3>
              <div className="flex flex-wrap gap-2">
                {popularTags.slice(0, 15).map((tag) => (
                  <a
                    key={tag.id}
                    href={`/blogs?tag=${tag.slug}`}
                    className={`px-3 py-1.5 rounded-full text-sm transition ${tag === tag.slug
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                  >
                    #{tag.name}
                  </a>
                ))}
              </div>
            </div>

            {/* Ad Position 3: Sidebar Bottom */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-3 bg-gray-50 border-b border-gray-100">
                <p className="text-xs text-gray-400 text-center">Sponsored</p>
              </div>
              <div className="p-4">
                <GoogleAd slot="blog-sidebar-bottom" format="rectangle" style={{ minHeight: '250px' }} />
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}