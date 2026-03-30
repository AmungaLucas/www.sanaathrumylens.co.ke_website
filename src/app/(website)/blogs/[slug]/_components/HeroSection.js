/* eslint-disable @next/next/no-img-element */
'use client';

import ReportButton from '@/components/interactive/ReportButton';

export default function HeroSection({ blog }) {
    return (
        <header className="relative w-full h-[70vh] min-h-[480px] max-h-[700px] overflow-hidden">
            {/* Background Image */}
            {blog.featured_image ? (
                <img
                    src={blog.featured_image}
                    alt={blog.featured_image_alt || blog.title}
                    className="absolute inset-0 w-full h-full object-cover"
                />
            ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-700" />
            )}

            {/* Dark Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />

            {/* Content Overlay */}
            <div className="relative z-10 flex flex-col justify-end h-full px-6 sm:px-8 md:px-12 lg:px-16 pb-12 md:pb-16 max-w-4xl mx-auto w-full">
                {/* Categories */}
                {blog.categories && blog.categories.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                        {blog.categories.map(category => (
                            <a
                                key={category.id}
                                href={`/categories/${category.slug}`}
                                className="text-sm font-medium text-blue-300 hover:text-blue-200 transition-colors duration-200"
                            >
                                #{category.name}
                            </a>
                        ))}
                    </div>
                )}

                {/* Title + Report */}
                <div className="flex items-start gap-3 mb-5">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight flex-1 tracking-tight">
                        {blog.title}
                    </h1>
                    <div className="flex-shrink-0 mt-1 opacity-70 hover:opacity-100 transition-opacity duration-200">
                        <ReportButton
                            contentType="BLOG"
                            contentId={blog.id}
                            contentTitle={blog.title}
                        />
                    </div>
                </div>

                {/* Author & Meta */}
                <div className="flex flex-wrap items-center gap-4">
                    <div className="flex items-center gap-3">
                        <img
                            src={blog.author_avatar || '/default-avatar.png'}
                            alt={blog.author_name}
                            className="w-11 h-11 rounded-full object-cover ring-2 ring-white/30"
                        />
                        <div>
                            <div className="flex items-center gap-2">
                                <a
                                    href={`/authors/${blog.author_slug}`}
                                    className="font-semibold text-white hover:text-blue-300 transition-colors duration-200"
                                >
                                    {blog.author_name}
                                </a>
                                {blog.author_verified && (
                                    <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20" title="Verified Author">
                                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                )}
                            </div>
                            {blog.author_title && (
                                <p className="text-sm text-gray-300">{blog.author_title}</p>
                            )}
                        </div>
                    </div>

                    <div className="hidden sm:block w-px h-5 bg-white/30" />

                    <div className="flex items-center gap-3 text-sm text-gray-300">
                        <time dateTime={blog.published_at}>
                            {new Date(blog.published_at).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            })}
                        </time>
                        <span className="w-1 h-1 rounded-full bg-gray-400" />
                        <span>{Math.ceil(blog.content.length / 1000)} min read</span>
                        {blog.view_count && (
                            <>
                                <span className="w-1 h-1 rounded-full bg-gray-400" />
                                <span>{blog.view_count.toLocaleString()} views</span>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}
