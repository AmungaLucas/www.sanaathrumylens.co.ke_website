export default function PopularTagsWidget({ tags }) {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <div className="flex items-center gap-2 mb-4">
                <span className="text-xl">🏷️</span>
                <h3 className="text-lg font-semibold text-gray-900">
                    Popular Topics
                </h3>
            </div>

            <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                    <a
                        key={tag.id}
                        href={`/tags/${tag.slug}`}
                        className="inline-block px-3 py-1.5 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-blue-100 hover:text-blue-700 transition"
                        style={{
                            fontSize: `${Math.max(11, Math.min(14, 11 + tag.usage_count * 0.1))}px`,
                        }}
                    >
                        #{tag.name}
                        {tag.usage_count > 5 && (
                            <span className="ml-1 text-xs text-gray-500">
                                ({tag.usage_count})
                            </span>
                        )}
                    </a>
                ))}
            </div>

            <div className="mt-4 pt-3 border-t border-gray-100">
                <a href="/tags" className="text-sm text-blue-600 hover:text-blue-800">
                    Browse all topics →
                </a>
            </div>
        </div>
    );
}