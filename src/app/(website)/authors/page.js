import Image from 'next/image';
import { getTopAuthors } from '@/lib/queries';
import Link from 'next/link';
import GoogleAd from '@/components/ui/GoogleAd';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: "Authors - Sanaa Thru My Lens",
  description: "Meet our talented authors and contributors. Discover their work and expertise in Kenya's creative ecosystem.",
  keywords: "kenya authors, contributors, writers, creative experts",
};

export default async function AuthorsPage() {
  const authors = await getTopAuthors(50); // Get all authors

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-linear-to-r from-blue-600 to-purple-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">
            Meet Our Authors
          </h1>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto">
            Passionate voices from Kenya&apos;s creative community sharing their insights and expertise
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Main Content */}
          <div className="flex-1">
            {authors.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {authors.map((author) => (
                  <Link
                    key={author.id}
                    href={`/authors/${author.slug}`}
                    className="group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300"
                  >
                    <div className="relative">
                      {author.cover_image_url ? (
                        <div className="relative w-full h-32">
                          <Image
                            src={author.cover_image_url}
                            alt={author.name}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-full h-32 bg-linear-to-r from-blue-500 to-purple-500" />
                      )}
                      <div className="absolute -bottom-10 left-6">
                        <div className="relative w-20 h-20">
                          <Image
                            src={author.avatar_url || '/default-avatar.png'}
                            alt={author.name}
                            width={80}
                            height={80}
                            className="rounded-full border-4 border-white object-cover"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="p-6 pt-12">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-lg text-gray-900 group-hover:text-blue-600">
                          {author.name}
                        </h3>
                        {author.is_verified && (
                          <span className="text-blue-500 text-sm" title="Verified Author">✓</span>
                        )}
                      </div>
                      {author.author_title && (
                        <p className="text-sm text-gray-600 mb-2">{author.author_title}</p>
                      )}
                      {author.short_bio && (
                        <p className="text-sm text-gray-500 mb-3 line-clamp-2">{author.short_bio}</p>
                      )}
                      <div className="flex items-center gap-4 text-xs text-gray-500 pt-3 border-t border-gray-100">
                        <span>{author.total_posts} articles</span>
                        <span>•</span>
                        <span>{author.total_views?.toLocaleString()} views</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
                <p className="text-gray-500">No authors found.</p>
              </div>
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
                <GoogleAd slot="authors-sidebar" format="rectangle" style={{ minHeight: '250px' }} />
              </div>
            </div>

            {/* Become an Author CTA */}
            <div className="bg-linear-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white text-center">
              <div className="text-3xl mb-3">✍️</div>
              <h3 className="text-lg font-semibold mb-2">Become an Author</h3>
              <p className="text-sm text-blue-100 mb-4">
                Share your expertise with our community
              </p>
              <Link
                href="/become-author"
                className="inline-block px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition text-sm font-medium"
              >
                Apply Now →
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
