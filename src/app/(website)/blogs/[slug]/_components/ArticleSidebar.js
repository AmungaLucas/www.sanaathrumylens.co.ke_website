import NewsletterWidget from '@/app/(website)/(homepage)/_components/widgets/NewsletterWidget';
import RecentStoriesWidget from '@/app/(website)/(homepage)/_components/widgets/RecentStoriesWidget';

export default function ArticleSidebar({ recentStories, tags, categories }) {
    return (
        <div className="space-y-6">
            {/* Newsletter */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-blue-600 to-purple-600 p-6 text-white">
                {/* Decorative circles */}
                <div className="absolute -top-8 -right-8 w-32 h-32 bg-white/10 rounded-full" />
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/5 rounded-full" />

                <div className="relative z-10">
                    <h3 className="text-lg font-bold mb-1.5">Stay in the loop</h3>
                    <p className="text-sm text-blue-100 mb-4 leading-relaxed">
                        Get fresh stories delivered weekly
                    </p>
                    <NewsletterWidget />
                </div>
            </div>

            {/* Recent Stories */}
            {recentStories && recentStories.length > 0 && (
                <RecentStoriesWidget stories={recentStories} />
            )}

            {/* Categories */}
            {categories && categories.length > 0 && (
                <div className="bg-white rounded-2xl border border-gray-100 p-5">
                    <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Categories</h3>
                    <div className="flex flex-wrap gap-2">
                        {categories.map((cat) => (
                            <a
                                key={cat.id}
                                href={`/categories/${cat.slug}`}
                                className="px-3 py-1.5 bg-gray-50 text-gray-600 text-sm rounded-full hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
                            >
                                {cat.name}
                            </a>
                        ))}
                    </div>
                </div>
            )}

            {/* Tags */}
            {tags && tags.length > 0 && (
                <div className="bg-white rounded-2xl border border-gray-100 p-5">
                    <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Topics</h3>
                    <div className="flex flex-wrap gap-2">
                        {tags.map((tag) => (
                            <a
                                key={tag.id}
                                href={`/tags/${tag.slug}`}
                                className="px-3 py-1.5 bg-gray-50 text-gray-600 text-sm rounded-full hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
                            >
                                #{tag.name}
                            </a>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
