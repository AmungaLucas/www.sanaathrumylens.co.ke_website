/* eslint-disable @next/next/no-img-element */
export default function TopAuthorsWidget({ authors }) {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <div className="flex items-center gap-2 mb-4">
                <span className="text-xl">👥</span>
                <h3 className="text-lg font-semibold text-gray-900">
                    Top Contributors
                </h3>
            </div>

            <div className="space-y-4">
                {authors.map((author, index) => (
                    <a
                        key={author.id}
                        href={`/authors/${author.slug}`}
                        className="flex items-center gap-3 group"
                    >
                        <div className="relative">
                            <img
                                src={author.avatar_url || '/default-avatar.png'}
                                alt={author.name}
                                className="w-10 h-10 rounded-full object-cover"
                            />
                            {index < 3 && (
                                <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center text-[10px] font-bold text-white">
                                    {index + 1}
                                </div>
                            )}
                        </div>

                        <div className="flex-1">
                            <h4 className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition">
                                {author.name}
                                {author.is_verified && (
                                    <span className="ml-1 text-blue-500 text-xs">✓</span>
                                )}
                            </h4>
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                                <span>{author.total_posts} articles</span>
                                <span>•</span>
                                <span>{author.total_views?.toLocaleString()} views</span>
                            </div>
                        </div>
                    </a>
                ))}
            </div>

            <div className="mt-4 pt-3 border-t border-gray-100">
                <a href="/authors" className="text-sm text-blue-600 hover:text-blue-800">
                    View all authors →
                </a>
            </div>
        </div>
    );
}