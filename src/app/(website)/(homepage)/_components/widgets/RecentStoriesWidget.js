export default function RecentStoriesWidget({ stories }) {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <div className="flex items-center gap-2 mb-4">
                <span className="text-xl">📖</span>
                <h3 className="text-lg font-semibold text-gray-900">
                    Recent Stories
                </h3>
            </div>

            <div className="space-y-3">
                {stories.map((story) => (
                    <a
                        key={story.id}
                        href={`/blogs/${story.slug}`}
                        className="block group"
                    >
                        <h4 className="text-sm font-medium text-gray-900 group-hover:text-blue-600 line-clamp-2">
                            {story.title}
                        </h4>
                        <p className="text-xs text-gray-500 mt-1">
                            {new Date(story.published_at).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric'
                            })}
                        </p>
                    </a>
                ))}
            </div>

            <div className="mt-4 pt-3 border-t border-gray-100">
                <a href="/blogs" className="text-sm text-blue-600 hover:text-blue-800">
                    View all articles →
                </a>
            </div>
        </div>
    );
}