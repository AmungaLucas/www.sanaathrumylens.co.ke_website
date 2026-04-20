import Image from 'next/image';
import LikeButton from '@/components/interactive/LikeButton';

export default function ArticleCard({ article, index }) {
    return (
        <article className="group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow">
            {article.featured_image && (
                <div className="relative overflow-hidden h-48">
                    <Image
                        src={article.featured_image}
                        alt={article.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {/* Category Badge */}
                    {article.categories && article.categories[0] && (
                        <span className="absolute top-3 left-3 px-2 py-1 bg-blue-600 text-white text-xs rounded-md">
                            {article.categories[0].name}
                        </span>
                    )}
                </div>
            )}

            <div className="p-5">
                {/* Author Info */}
                <div className="flex items-center gap-2 mb-3">
                    <div className="relative w-6 h-6 flex-shrink-0">
                        <Image
                            src={article.author_avatar || '/default-avatar.png'}
                            alt={article.author_name}
                            width={24}
                            height={24}
                            className="rounded-full object-cover"
                        />
                    </div>
                    <a
                        href={`/authors/${article.author_slug}`}
                        className="text-sm text-gray-600 hover:text-blue-600"
                    >
                        {article.author_name}
                    </a>
                    {article.author_verified && (
                        <span className="text-blue-500 text-xs">✓</span>
                    )}
                    <span className="text-xs text-gray-400">•</span>
                    <span className="text-xs text-gray-400">
                        {new Date(article.published_at).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                        })}
                    </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                    <a href={`/blogs/${article.slug}`} className="hover:text-blue-600 transition">
                        {article.title}
                    </a>
                </h3>

                {/* Excerpt */}
                <p className="text-gray-600 mb-4 line-clamp-2">
                    {article.excerpt}
                </p>

                {/* Stats */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            <span>{article.view_count?.toLocaleString() || 0}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                            <span>{article.comment_count || 0}</span>
                        </div>
                    </div>

                    {/* Like Button - Interactive */}
                    <LikeButton
                        blogId={article.id}
                        initialCount={article.like_count || 0}
                        userId={null} // Will be set by client component after auth
                    />
                </div>
            </div>
        </article>
    );
}
