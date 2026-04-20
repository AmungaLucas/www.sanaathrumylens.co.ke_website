import { notFound } from 'next/navigation';
import Image from 'next/image';
import {
  getAuthorBySlug,
  getArticlesByAuthor,
  getAuthorSpecialties,
  getAuthorEducation,
  getAuthorExperience,
  getRecentStories
} from '@/lib/queries';
import Link from 'next/link';
import ArticleCard from '@/app/(website)/(homepage)/_components/ArticleCard';
import GoogleAd from '@/components/ui/GoogleAd';
import NewsletterWidget from '@/app/(website)/(homepage)/_components/widgets/NewsletterWidget';
import RecentStoriesWidget from '@/app/(website)/(homepage)/_components/widgets/RecentStoriesWidget';
import FollowButton from '@/components/interactive/FollowButton';

// Generate metadata dynamically
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const author = await getAuthorBySlug(slug);

  if (!author) {
    return {
      title: 'Author Not Found',
      description: 'The requested author could not be found.',
    };
  }

  return {
    title: `${author.name} - Author Profile`,
    description: author.bio || `Read articles by ${author.name} on Sanaa Thru My Lens. ${author.author_title || ''}`,
    keywords: `${author.name}, ${author.author_title}, kenya author, articles`,
    openGraph: {
      title: `${author.name} - Author Profile`,
      description: author.short_bio || author.bio,
      images: author.avatar_url ? [author.avatar_url] : [],
      type: 'profile',
    },
  };
}

export default async function AuthorPage({ params }) {
  const { slug } = await params;
  const author = await getAuthorBySlug(slug);

  if (!author) {
    notFound();
  }

  // Fetch author data in parallel
  const [articles, specialties, education, experience, recentStories] = await Promise.all([
    getArticlesByAuthor(author.id, 9, 0),
    getAuthorSpecialties(author.id),
    getAuthorEducation(author.id),
    getAuthorExperience(author.id),
    getRecentStories(4)
  ]);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Author Header */}
      <div className="bg-linear-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            {/* Avatar */}
            <div className="relative w-32 h-32 flex-shrink-0">
              <Image
                src={author.avatar_url || '/default-avatar.png'}
                alt={author.name}
                width={128}
                height={128}
                className="rounded-full border-4 border-white object-cover"
              />
            </div>

            {/* Author Info */}
            <div className="text-center md:text-left flex-1">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                <h1 className="text-3xl font-bold">{author.name}</h1>
                {author.is_verified && (
                  <span className="bg-blue-500/20 text-blue-200 px-2 py-0.5 rounded text-sm">
                    Verified Author
                  </span>
                )}
              </div>

              {author.author_title && (
                <p className="text-lg text-blue-100 mb-3">{author.author_title}</p>
              )}

              {author.location && (
                <p className="text-blue-200 text-sm mb-4">
                  📍 {author.location}
                </p>
              )}

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">📝</span>
                  <span>{author.total_posts} Articles</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">👁️</span>
                  <span>{author.total_views?.toLocaleString()} Views</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">❤️</span>
                  <span>{author.total_likes?.toLocaleString()} Likes</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">👥</span>
                  <span>{author.follower_count} Followers</span>
                </div>
              </div>

              {/* Follow Button */}
              <div className="mt-4">
                <FollowButton authorId={author.id} initialFollowers={author.follower_count} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Main Content */}
          <div className="flex-1">
            {/* Bio */}
            {author.bio && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-3">About</h2>
                <p className="text-gray-700 leading-relaxed">{author.bio}</p>
              </div>
            )}

            {/* Specialties */}
            {specialties.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-3">Expertise</h2>
                <div className="flex flex-wrap gap-2">
                  {specialties.map((specialty) => (
                    <span key={specialty.specialty} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">
                      {specialty.specialty}
                      {specialty.expertise_level && (
                        <span className="ml-1 text-xs text-blue-500">
                          ({specialty.expertise_level.toLowerCase()})
                        </span>
                      )}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Education */}
            {education.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Education</h2>
                <div className="space-y-4">
                  {education.map((edu, index) => (
                    <div key={index} className="border-l-2 border-blue-300 pl-4">
                      <h3 className="font-semibold text-gray-900">{edu.institution}</h3>
                      <p className="text-gray-600 text-sm">{edu.degree}{edu.field_of_study ? ` in ${edu.field_of_study}` : ''}</p>
                      <p className="text-gray-500 text-xs">
                        {edu.start_year} - {edu.is_current ? 'Present' : edu.end_year}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Experience */}
            {experience.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Experience</h2>
                <div className="space-y-4">
                  {experience.map((exp, index) => (
                    <div key={index} className="border-l-2 border-purple-300 pl-4">
                      <h3 className="font-semibold text-gray-900">{exp.job_title}</h3>
                      <p className="text-gray-600 text-sm">{exp.company}</p>
                      {exp.location && <p className="text-gray-500 text-xs">{exp.location}</p>}
                      <p className="text-gray-500 text-xs">
                        {new Date(exp.start_date).getFullYear()} - {exp.is_current ? 'Present' : new Date(exp.end_date).getFullYear()}
                      </p>
                      {exp.description && <p className="text-gray-600 text-sm mt-2">{exp.description}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Articles */}
            {articles.length > 0 ? (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">
                  Articles by {author.name}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {articles.map((article, index) => (
                    <ArticleCard key={article.id} article={article} index={index} />
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
                <p className="text-gray-500">No articles published yet.</p>
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
                <GoogleAd slot="author-sidebar" format="rectangle" style={{ minHeight: '250px' }} />
              </div>
            </div>

            {/* Social Links */}
            {(author.twitter_handle || author.linkedin_url || author.instagram_handle || author.website) && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                <h3 className="font-semibold text-gray-900 mb-3">Connect</h3>
                <div className="space-y-2">
                  {author.twitter_handle && (
                    <a
                      href={`https://twitter.com/${author.twitter_handle}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-gray-600 hover:text-blue-500 transition"
                    >
                      <span>🐦</span>
                      <span>@{author.twitter_handle}</span>
                    </a>
                  )}
                  {author.linkedin_url && (
                    <a
                      href={author.linkedin_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-gray-600 hover:text-blue-700 transition"
                    >
                      <span>🔗</span>
                      <span>LinkedIn</span>
                    </a>
                  )}
                  {author.instagram_handle && (
                    <a
                      href={`https://instagram.com/${author.instagram_handle}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-gray-600 hover:text-pink-500 transition"
                    >
                      <span>📸</span>
                      <span>@{author.instagram_handle}</span>
                    </a>
                  )}
                  {author.website && (
                    <a
                      href={author.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition"
                    >
                      <span>🌐</span>
                      <span>Personal Website</span>
                    </a>
                  )}
                </div>
              </div>
            )}

            {/* Recent Stories */}
            <RecentStoriesWidget stories={recentStories} />

            {/* Newsletter */}
            <div className="bg-linear-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
              <h3 className="text-lg font-semibold mb-2">Subscribe for Updates</h3>
              <p className="text-sm text-blue-100 mb-4">
                Get notified when {author.name} publishes new articles
              </p>
              <NewsletterWidget />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
