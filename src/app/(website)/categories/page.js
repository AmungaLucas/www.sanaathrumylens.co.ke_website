import { getAllCategories } from '@/lib/queries';
import Link from 'next/link';
import GoogleAd from '@/components/ui/GoogleAd';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: "Categories - Sanaa Thru My Lens",
  description: "Browse articles by category. Explore architecture, design, urbanism, and creative culture in Kenya",
  keywords: "kenya architecture categories, design topics, creative categories",
  alternates: {
    canonical: 'https://www.sanaathrumylens.co.ke/categories',
  },
};

export default async function CategoriesPage() {
  const categories = await getAllCategories(100); // Get all categories

  // Group categories by first letter for better organization
  const groupedCategories = categories.reduce((acc, category) => {
    const firstLetter = category.name.charAt(0).toUpperCase();
    if (!acc[firstLetter]) acc[firstLetter] = [];
    acc[firstLetter].push(category);
    return acc;
  }, {});

  const sortedLetters = Object.keys(groupedCategories).sort();

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-linear-to-r from-blue-600 to-purple-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">
            Explore Categories
          </h1>
          <p className="text-lg text-blue-100 max-w-2xl">
            Discover articles organized by topic. Find what interests you most.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Main Content */}
          <div className="flex-1">
            {/* Categories Grid */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                All Categories ({categories.length})
              </h2>

              {sortedLetters.map((letter) => (
                <div key={letter} className="mb-8 last:mb-0">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4 border-b border-gray-200 pb-2">
                    {letter}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {groupedCategories[letter].map((category) => (
                      <Link
                        key={category.id}
                        href={`/categories/${category.slug}`}
                        className="group flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-blue-50 transition-all duration-200"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-2xl group-hover:scale-110 transition-transform">
                            {getCategoryIcon(category.name)}
                          </span>
                          <div>
                            <span className="font-medium text-gray-900 group-hover:text-blue-600">
                              {category.name}
                            </span>
                            <p className="text-xs text-gray-500">
                              {category.post_count} {category.post_count === 1 ? 'article' : 'articles'}
                            </p>
                          </div>
                        </div>
                        <svg
                          className="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}

              {categories.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500">No categories found.</p>
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
                <GoogleAd slot="categories-sidebar" format="rectangle" style={{ minHeight: '250px' }} />
              </div>
            </div>

            {/* Popular Categories Widget */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <h3 className="font-semibold text-gray-900 mb-4">Popular Categories</h3>
              <div className="space-y-3">
                {categories.slice(0, 10).map((category) => (
                  <Link
                    key={category.id}
                    href={`/categories/${category.slug}`}
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition"
                  >
                    <span className="text-gray-700">{category.name}</span>
                    <span className="text-sm text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                      {category.post_count}
                    </span>
                  </Link>
                ))}
              </div>
              <div className="mt-4 pt-3 border-t border-gray-100">
                <Link href="/categories" className="text-sm text-blue-600 hover:text-blue-800">
                  View all categories →
                </Link>
              </div>
            </div>
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