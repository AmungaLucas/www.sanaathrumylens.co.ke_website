/* eslint-disable @next/next/no-img-element */
export default function EditorsPicksSection({ articles }) {
    if (!articles || articles.length === 0) return null;

    return (
        <div className="border-l-4 border-blue-500 pl-6">
            <div className="flex items-center gap-2 mb-6">
                <span className="text-2xl">✍️</span>
                <h2 className="text-2xl font-bold text-gray-900">Editor&apos;s Picks</h2>
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                    Curated by our team
                </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {articles.map((article) => (
                    <a
                        key={article.id}
                        href={`/blogs/${article.slug}`}
                        className="group"
                    >
                        {article.featured_image && (
                            <div className="relative overflow-hidden rounded-lg mb-3">
                                <img
                                    src={article.featured_image}
                                    alt={article.title}
                                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <span className="text-white text-sm font-medium">Read more →</span>
                                </div>
                            </div>
                        )}
                        <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 line-clamp-2">
                            {article.title}
                        </h3>
                        <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                            {article.excerpt}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                            <span>{article.author_name}</span>
                            <span>•</span>
                            <span>{new Date(article.published_at).toLocaleDateString()}</span>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
}