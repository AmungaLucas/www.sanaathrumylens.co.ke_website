import GoogleAd from '@/components/ui/GoogleAd';
import RecentStoriesWidget from '@/app/(website)/(homepage)/_components/widgets/RecentStoriesWidget';
import CategoriesWidget from '@/app/(website)/(homepage)/_components/widgets/CategoriesWidget';
import PopularTagsWidget from '@/app/(website)/(homepage)/_components/widgets/PopularTagsWidget';
import NewsletterWidget from '@/app/(website)/(homepage)/_components/widgets/NewsletterWidget';

export default function ArticleSidebar({ recentStories, tags, categories }) {
    return (
        <aside className="w-full lg:w-80 space-y-6">
            {/* Ad Position 1: Sidebar Top */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-3 bg-gray-50 border-b border-gray-100">
                    <p className="text-xs text-gray-400 text-center">Sponsored</p>
                </div>
                <div className="p-4">
                    <GoogleAd slot="article-sidebar-top" format="rectangle" style={{ minHeight: '250px' }} />
                </div>
            </div>

            {/* Newsletter */}
            <div className="bg-linear-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
                <h3 className="text-lg font-semibold mb-2">Subscribe to Newsletter</h3>
                <p className="text-sm text-blue-100 mb-4">Get fresh stories delivered weekly</p>
                <NewsletterWidget />
            </div>

            {/* Recent Stories */}
            <RecentStoriesWidget stories={recentStories} />

            {/* Ad Position 2: Sidebar Middle */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-3 bg-gray-50 border-b border-gray-100">
                    <p className="text-xs text-gray-400 text-center">Advertisement</p>
                </div>
                <div className="p-4">
                    <GoogleAd slot="article-sidebar-middle" format="rectangle" style={{ minHeight: '250px' }} />
                </div>
            </div>

            {/* Categories */}
            {categories && categories.length > 0 && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                    <h3 className="font-semibold text-gray-900 mb-4">Categories</h3>
                    <div className="flex flex-wrap gap-2">
                        {categories.map((cat) => (
                            <a
                                key={cat.id}
                                href={`/categories/${cat.slug}`}
                                className="px-3 py-1.5 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-blue-100 hover:text-blue-700"
                            >
                                {cat.name}
                            </a>
                        ))}
                    </div>
                </div>
            )}

            {/* Tags */}
            {tags && tags.length > 0 && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                    <h3 className="font-semibold text-gray-900 mb-4">Topics</h3>
                    <div className="flex flex-wrap gap-2">
                        {tags.map((tag) => (
                            <a
                                key={tag.id}
                                href={`/tags/${tag.slug}`}
                                className="px-3 py-1.5 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-blue-100 hover:text-blue-700"
                            >
                                #{tag.name}
                            </a>
                        ))}
                    </div>
                </div>
            )}

            {/* Ad Position 3: Sidebar Bottom */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden sticky top-6">
                <div className="p-3 bg-gray-50 border-b border-gray-100">
                    <p className="text-xs text-gray-400 text-center">Advertisement</p>
                </div>
                <div className="p-4">
                    <GoogleAd slot="article-sidebar-bottom" format="rectangle" style={{ minHeight: '250px' }} />
                </div>
            </div>
        </aside>
    );
}