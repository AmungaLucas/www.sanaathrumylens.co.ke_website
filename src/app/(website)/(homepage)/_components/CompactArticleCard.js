/* eslint-disable @next/next/no-img-element */
// src/app/(homepage)/_components/CompactArticleCard.jsx
'use client';

import Link from 'next/link';

export default function CompactArticleCard({
    article,
    showImage = true,
    showMeta = true,
    showExcerpt = false,
    showDate = true,
    variant = 'default' // 'default', 'horizontal', 'minimal'
}) {
    if (!article) return null;

    const {
        id,
        title,
        slug,
        excerpt,
        featured_image,
        published_at,
        view_count,
        like_count,
        author_name,
        comment_count
    } = article;

    // Format date
    const formattedDate = published_at ? new Date(published_at).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    }) : '';

    // Variant styles
    const variantStyles = {
        default: 'flex flex-col',
        horizontal: 'flex gap-3 items-start',
        minimal: 'flex flex-col gap-1'
    };

    const imageSizes = {
        default: 'w-full h-32 object-cover rounded-lg',
        horizontal: 'w-20 h-20 object-cover rounded-lg flex-shrink-0',
        minimal: 'hidden'
    };

    return (
        <Link href={`/blogs/${slug}`} className={`group block ${variantStyles[variant]}`}>
            {/* Image */}
            {showImage && featured_image && (
                <div className={imageSizes[variant]}>
                    <img
                        src={featured_image}
                        alt={title}
                        className="w-full h-full object-cover rounded-lg group-hover:opacity-90 transition-opacity"
                    />
                </div>
            )}

            {/* Content */}
            <div className="flex-1 min-w-0">
                {/* Title */}
                <h3 className={`
          font-semibold text-gray-900 group-hover:text-blue-600 transition
          ${variant === 'minimal' ? 'text-sm' : 'text-base'}
          line-clamp-2
        `}>
                    {title}
                </h3>

                {/* Excerpt (optional) */}
                {showExcerpt && excerpt && (
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                        {excerpt}
                    </p>
                )}

                {/* Meta information */}
                {showMeta && (
                    <div className="flex flex-wrap items-center gap-2 mt-2 text-xs text-gray-500">
                        {author_name && (
                            <>
                                <span className="font-medium text-gray-700">
                                    {author_name}
                                </span>
                                <span>•</span>
                            </>
                        )}

                        {showDate && published_at && (
                            <>
                                <span>{formattedDate}</span>
                                <span>•</span>
                            </>
                        )}

                        {view_count !== undefined && view_count > 0 && (
                            <>
                                <span className="flex items-center gap-1">
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                    {view_count}
                                </span>
                                <span>•</span>
                            </>
                        )}

                        {like_count !== undefined && like_count > 0 && (
                            <>
                                <span className="flex items-center gap-1">
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                    </svg>
                                    {like_count}
                                </span>
                                <span>•</span>
                            </>
                        )}

                        {comment_count !== undefined && comment_count > 0 && (
                            <span className="flex items-center gap-1">
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                </svg>
                                {comment_count}
                            </span>
                        )}
                    </div>
                )}
            </div>
        </Link>
    );
}