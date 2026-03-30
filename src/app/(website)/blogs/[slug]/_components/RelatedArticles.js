/* eslint-disable @next/next/no-img-element */
export default function RelatedArticles({ articles }) {
    return (
        <section className="mt-16 pt-12 border-t border-gray-200">
            <div className="flex items-center gap-3 mb-8">
                <div className="w-1 h-6 bg-gradient-to-b from-blue-600 to-purple-600 rounded-full" />
                <h2 className="text-2xl font-bold text-gray-900">Continue Reading</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {articles.map((article) => (
                    <a
                        key={article.id}
                        href={`/blogs/${article.slug}`}
                        className="group block bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                    >
                        {/* Image with gradient overlay on hover */}
                        <div className="relative overflow-hidden aspect-[16/10]">
                            {article.featured_image ? (
                                <img
                                    src={article.featured_image}
                                    alt={article.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                            ) : (
                                <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300" />
                            )}
                            {/* Hover gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>

                        {/* Content */}
                        <div className="p-5">
                            <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2 mb-2 leading-snug">
                                {article.title}
                            </h3>
                            {article.excerpt && (
                                <p className="text-sm text-gray-500 line-clamp-2 mb-3 leading-relaxed">
                                    {article.excerpt}
                                </p>
                            )}
                            <div className="flex items-center gap-2 text-xs text-gray-400">
                                <span className="font-medium text-gray-600">{article.author_name}</span>
                                <span>·</span>
                                <time dateTime={article.published_at}>
                                    {new Date(article.published_at).toLocaleDateString('en-US', {
                                        month: 'short',
                                        day: 'numeric',
                                        year: 'numeric',
                                    })}
                                </time>
                            </div>
                        </div>
                    </a>
                ))}
            </div>
        </section>
    );
}
