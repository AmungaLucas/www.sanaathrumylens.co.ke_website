import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      {/* Hero Section */}
      <div className="bg-linear-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-8xl sm:text-9xl font-bold mb-4 opacity-80">404</h1>
          <p className="text-2xl sm:text-3xl font-semibold mb-2">
            Page Not Found
          </p>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        {/* Search Box */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            Try searching for what you need
          </h2>
          <form action="/search" method="get" className="flex gap-3">
            <input
              type="text"
              name="q"
              placeholder="Search articles..."
              className="flex-1 px-4 py-3 rounded-lg border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
            >
              Search
            </button>
          </form>
        </div>

        {/* Popular Categories */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Browse Popular Categories
          </h2>
          <div className="flex flex-wrap gap-2">
            {[
              { name: 'Architecture', slug: 'architecture' },
              { name: 'Interior Design', slug: 'interior-design' },
              { name: 'Urban Planning', slug: 'urban-planning' },
              { name: 'Art & Culture', slug: 'art-culture' },
              { name: 'Sustainability', slug: 'sustainability' },
              { name: 'Events', slug: 'events' },
            ].map((cat) => (
              <Link
                key={cat.slug}
                href={`/categories/${cat.slug}`}
                className="px-4 py-2 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-blue-100 hover:text-blue-600 transition"
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Navigation Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <Link
            href="/"
            className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:border-blue-300 hover:shadow-md transition"
          >
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="text-blue-600 text-lg">🏠</span>
            </div>
            <div>
              <span className="font-semibold text-gray-900 block">Go Home</span>
              <span className="text-xs text-gray-500">Back to the homepage</span>
            </div>
          </Link>
          <Link
            href="/blogs"
            className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:border-blue-300 hover:shadow-md transition"
          >
            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
              <span className="text-purple-600 text-lg">📰</span>
            </div>
            <div>
              <span className="font-semibold text-gray-900 block">All Articles</span>
              <span className="text-xs text-gray-500">Browse our latest content</span>
            </div>
          </Link>
          <Link
            href="/categories"
            className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:border-blue-300 hover:shadow-md transition"
          >
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
              <span className="text-green-600 text-lg">📂</span>
            </div>
            <div>
              <span className="font-semibold text-gray-900 block">Categories</span>
              <span className="text-xs text-gray-500">Explore by topic</span>
            </div>
          </Link>
          <Link
            href="/contacts"
            className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:border-blue-300 hover:shadow-md transition"
          >
            <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
              <span className="text-amber-600 text-lg">💬</span>
            </div>
            <div>
              <span className="font-semibold text-gray-900 block">Contact Us</span>
              <span className="text-xs text-gray-500">Report a broken link</span>
            </div>
          </Link>
        </div>

        {/* Help Text */}
        <div className="bg-linear-to-r from-blue-50 to-purple-50 rounded-xl p-6 text-center">
          <p className="text-sm text-gray-600">
            If you believe this is an error, please{' '}
            <Link href="/contacts" className="text-blue-600 hover:text-blue-800 font-medium">
              contact us
            </Link>{' '}
            or visit our{' '}
            <Link href="/faq" className="text-blue-600 hover:text-blue-800 font-medium">
              FAQ page
            </Link>{' '}
            for help.
          </p>
        </div>
      </div>
    </div>
  );
}
