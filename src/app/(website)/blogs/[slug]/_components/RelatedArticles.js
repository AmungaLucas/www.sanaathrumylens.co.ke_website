/* eslint-disable @next/next/no-img-element */
export default function RelatedArticles({ articles }) {
    return (
        <div className="mt-12 pt-8 border-t border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
                You Might Also Like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {articles.map((article) => (
                    <a
                        key={article.id}
                        href={`/blogs/${article.slug}`}
                        className="group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition"
                    >
                        {article.featured_image && (
                            <img
                                src={article.featured_image}
                                alt={article.title}
                                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                        )}
                        <div className="p-5">
                            <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 line-clamp-2 mb-2">
                                {article.title}
                            </h3>
                            <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                                {article.excerpt}
                            </p>
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                                <span>{article.author_name}</span>
                                <span>•</span>
                                <span>{new Date(article.published_at).toLocaleDateString()}</span>
                            </div>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
}