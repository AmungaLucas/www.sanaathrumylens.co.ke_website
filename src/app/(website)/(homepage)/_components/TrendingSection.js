import Image from 'next/image';
export default function TrendingSection({ articles }) {
    if (!articles || articles.length === 0) return null;

    return (
        <div className="bg-linear-to-r from-orange-50 to-red-50 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-6">
                <span className="text-2xl">🔥</span>
                <h2 className="text-2xl font-bold text-gray-900">Trending Now</h2>
                <span className="text-sm text-gray-500 ml-2">
                    Most discussed this week
                </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {articles.map((article, index) => (
                    <a
                        key={article.id}
                        href={`/blogs/${article.slug}`}
                        className="group"
                    >
                        <div className="relative">
                            {article.featured_image ? (
                                <div className="relative w-full h-32 rounded-lg overflow-hidden">
                                    <Image
                                        src={article.featured_image}
                                        alt={article.title}
                                        fill
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                                        className="object-cover group-hover:opacity-90 transition"
                                    />
                                </div>
                            ) : (
                                <div className="w-full h-32 bg-gray-200 rounded-lg" />
                            )}
                            <div className="absolute top-2 left-2 bg-orange-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
                                {index + 1}
                            </div>
                        </div>
                        <h3 className="text-sm font-semibold text-gray-900 mt-2 group-hover:text-orange-600 line-clamp-2">
                            {article.title}
                        </h3>
                        <p className="text-xs text-gray-500 mt-1">
                            {article.author_name}
                        </p>
                    </a>
                ))}
            </div>
        </div>
    );
}
