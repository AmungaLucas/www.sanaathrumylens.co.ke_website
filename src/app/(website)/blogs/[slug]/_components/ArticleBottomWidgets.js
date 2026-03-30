'use client';

import { useState } from 'react';
import NewsletterWidget from '@/app/(website)/(homepage)/_components/widgets/NewsletterWidget';
import RecentStoriesWidget from '@/app/(website)/(homepage)/_components/widgets/RecentStoriesWidget';

export default function ArticleBottomWidgets({ recentStories, tags, categories }) {
    const [newsletterOpen, setNewsletterOpen] = useState(true);

    return (
        <div className="mt-16 pt-12 border-t border-gray-200 space-y-10">
            {/* Newsletter CTA */}
            {newsletterOpen && (
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 via-blue-600 to-purple-600 p-8 md:p-10 text-white">
                    {/* Decorative circles */}
                    <div className="absolute -top-8 -right-8 w-40 h-40 bg-white/10 rounded-full" />
                    <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-white/5 rounded-full" />

                    <div className="relative z-10 max-w-lg">
                        <h3 className="text-xl md:text-2xl font-bold mb-2">Stay in the loop</h3>
                        <p className="text-blue-100 text-sm mb-5 leading-relaxed">
                            Get the latest stories, insights, and creative inspiration delivered straight to your inbox every week.
                        </p>
                        <NewsletterWidget />
                    </div>
                    <button
                        onClick={() => setNewsletterOpen(false)}
                        className="absolute top-4 right-4 text-white/40 hover:text-white/80 transition-colors"
                        aria-label="Dismiss"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            )}

            {/* Recent Stories */}
            <div>
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-1 h-6 bg-gradient-to-b from-blue-600 to-purple-600 rounded-full" />
                    <h3 className="text-lg font-bold text-gray-900">Recent Stories</h3>
                </div>
                <RecentStoriesWidget stories={recentStories} />
            </div>

            {/* Categories & Tags */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {categories && categories.length > 0 && (
                    <div>
                        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Categories</h3>
                        <div className="flex flex-wrap gap-2">
                            {categories.map((cat) => (
                                <a
                                    key={cat.id}
                                    href={`/categories/${cat.slug}`}
                                    className="px-4 py-1.5 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-blue-100 hover:text-blue-700 transition-all duration-200"
                                >
                                    {cat.name}
                                </a>
                            ))}
                        </div>
                    </div>
                )}
                {tags && tags.length > 0 && (
                    <div>
                        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Topics</h3>
                        <div className="flex flex-wrap gap-2">
                            {tags.map((tag) => (
                                <a
                                    key={tag.id}
                                    href={`/tags/${tag.slug}`}
                                    className="px-4 py-1.5 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-blue-100 hover:text-blue-700 transition-all duration-200"
                                >
                                    #{tag.name}
                                </a>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
