'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import GoogleAd from '@/components/ui/GoogleAd';

export default function BookmarksPage() {
  const router = useRouter();
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchBookmarks() {
      try {
        // Check auth first
        const sessionRes = await fetch('/api/auth/session');
        if (!sessionRes.ok || !(await sessionRes.json()).user) {
          router.push('/api/auth/signin');
          return;
        }

        // Fetch bookmarks
        const res = await fetch('/api/bookmarks');
        if (!res.ok) {
          throw new Error('Failed to fetch bookmarks');
        }
        const data = await res.json();
        setBookmarks(data.bookmarks || []);
      } catch (err) {
        console.error('Error fetching bookmarks:', err);
        setError('Unable to load your bookmarks. Please try again later.');
      } finally {
        setLoading(false);
      }
    }
    fetchBookmarks();
  }, [router]);

  const removeBookmark = async (articleId) => {
    try {
      const res = await fetch('/api/bookmarks', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ articleId }),
      });

      if (res.ok) {
        setBookmarks((prev) => prev.filter((b) => b.id !== articleId));
      }
    } catch (err) {
      console.error('Error removing bookmark:', err);
    }
  };

  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="text-gray-500 text-sm">Loading your bookmarks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-linear-to-r from-blue-600 to-purple-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">
            My Bookmarks
          </h1>
          <p className="text-lg text-blue-100">
            Articles you&apos;ve saved for later reading
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Main Content */}
          <div className="flex-1">
            {error ? (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
                <div className="text-6xl mb-4">⚠️</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Something Went Wrong
                </h3>
                <p className="text-gray-600 mb-4">{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-medium"
                >
                  Try Again
                </button>
              </div>
            ) : bookmarks.length === 0 ? (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
                <div className="text-6xl mb-4">🔖</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No Bookmarks Yet
                </h3>
                <p className="text-gray-600 mb-4 max-w-md mx-auto">
                  You haven&apos;t bookmarked any articles yet. Start exploring our content and
                  save articles you&apos;d like to read later by clicking the bookmark icon.
                </p>
                <div className="flex flex-wrap gap-3 justify-center">
                  <Link
                    href="/blogs"
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-medium"
                  >
                    Browse Articles
                  </Link>
                  <Link
                    href="/categories"
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition text-sm font-medium"
                  >
                    Explore Categories
                  </Link>
                </div>
              </div>
            ) : (
              <>
                {/* Results count */}
                <div className="mb-6">
                  <p className="text-gray-600">
                    You have <span className="font-semibold text-gray-900">{bookmarks.length}</span>{' '}
                    saved {bookmarks.length === 1 ? 'article' : 'articles'}
                  </p>
                </div>

                {/* Bookmarks List */}
                <div className="space-y-4">
                  {bookmarks.map((article) => (
                    <div
                      key={article.id}
                      className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition"
                    >
                      <div className="flex flex-col sm:flex-row">
                        {/* Thumbnail */}
                        {article.coverImage && (
                          <div className="sm:w-48 h-40 sm:h-auto flex-shrink-0 relative">
                            <Link href={`/blogs/${article.slug}`}>
                              <Image
                                src={article.coverImage}
                                alt={article.title}
                                fill
                                sizes="192px"
                                className="object-cover"
                              />
                            </Link>
                          </div>
                        )}

                        {/* Content */}
                        <div className="flex-1 p-5">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              {article.category && (
                                <Link
                                  href={`/categories/${article.category.slug}`}
                                  className="text-xs font-medium text-blue-600 hover:text-blue-800 uppercase tracking-wider"
                                >
                                  {article.category.name}
                                </Link>
                              )}
                              <Link href={`/blogs/${article.slug}`}>
                                <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition mt-1 mb-2">
                                  {article.title}
                                </h3>
                              </Link>
                              {article.excerpt && (
                                <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                                  {article.excerpt}
                                </p>
                              )}
                              <div className="flex items-center gap-4 text-xs text-gray-500">
                                {article.author && (
                                  <span>
                                    By {article.author.name}
                                  </span>
                                )}
                                {article.publishedAt && (
                                  <span>
                                    {new Date(article.publishedAt).toLocaleDateString('en-KE', {
                                      year: 'numeric',
                                      month: 'short',
                                      day: 'numeric',
                                    })}
                                  </span>
                                )}
                              </div>
                            </div>

                            {/* Actions */}
                            <div className="flex items-start gap-2 flex-shrink-0">
                              <button
                                onClick={() => removeBookmark(article.id)}
                                className="p-2 text-gray-400 hover:text-red-500 transition"
                                title="Remove bookmark"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              </button>
                              <button
                                onClick={() => removeBookmark(article.id)}
                                className="p-2 text-gray-400 hover:text-red-500 transition"
                                title="Remove bookmark"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Sidebar */}
          <aside className="w-full lg:w-80 space-y-6">
            {/* Ad */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden sticky top-24">
              <div className="p-3 bg-gray-50 border-b border-gray-100">
                <p className="text-xs text-gray-400 text-center">Sponsored</p>
              </div>
              <div className="p-4">
                <GoogleAd slot="bookmarks-sidebar" format="rectangle" style={{ minHeight: '250px' }} />
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <h3 className="font-semibold text-gray-900 mb-4">Quick Links</h3>
              <div className="space-y-2">
                <Link href="/profile" className="block p-3 rounded-lg hover:bg-gray-50 text-gray-700 hover:text-blue-600 transition">
                  <span className="font-medium">My Profile</span>
                  <p className="text-xs text-gray-500 mt-0.5">View your account</p>
                </Link>
                <Link href="/blogs" className="block p-3 rounded-lg hover:bg-gray-50 text-gray-700 hover:text-blue-600 transition">
                  <span className="font-medium">Browse Articles</span>
                  <p className="text-xs text-gray-500 mt-0.5">Discover new content</p>
                </Link>
                <Link href="/categories" className="block p-3 rounded-lg hover:bg-gray-50 text-gray-700 hover:text-blue-600 transition">
                  <span className="font-medium">Categories</span>
                  <p className="text-xs text-gray-500 mt-0.5">Explore by topic</p>
                </Link>
              </div>
            </div>

            {/* Tips */}
            <div className="bg-linear-to-r from-blue-50 to-purple-50 rounded-xl p-5">
              <h3 className="font-semibold text-gray-900 mb-3">Bookmarking Tips</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 flex-shrink-0">✓</span>
                  <span>Click the bookmark icon on any article to save it</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 flex-shrink-0">✓</span>
                  <span>Bookmarks sync across your devices when logged in</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 flex-shrink-0">✓</span>
                  <span>Organise your reading list for offline reference</span>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
