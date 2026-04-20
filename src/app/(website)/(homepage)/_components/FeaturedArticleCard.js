import Image from 'next/image';
export default function FeaturedArticleCard({ article }) {
    return (
        <a href={`/blogs/${article.slug}`} className="group block">
            <div className="relative overflow-hidden rounded-xl">
                {article.featured_image ? (
                    <div className="relative h-64 lg:h-80">
                        <Image
                            src={article.featured_image}
                            alt={article.title}
                            fill
                            sizes="(max-width: 1024px) 100vw, 66vw"
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                    </div>
                ) : (
                    <div className="w-full h-64 lg:h-80 bg-linear-to-br from-gray-800 to-gray-900" />
                )}
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs text-white/80">Popular</span>
                        <span className="text-xs text-white/80">•</span>
                        <span className="text-xs text-white/80">
                            {article.view_count?.toLocaleString()} views
                        </span>
                    </div>
                    <h3 className="text-xl lg:text-2xl font-bold text-white mb-2 line-clamp-2">
                        {article.title}
                    </h3>
                    <p className="text-white/80 text-sm line-clamp-2 mb-3">
                        {article.excerpt}
                    </p>
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-white/90">{article.author_name}</span>
                        <span className="text-white/60">•</span>
                        <span className="text-sm text-white/60">
                            {new Date(article.published_at).toLocaleDateString()}
                        </span>
                    </div>
                </div>
            </div>
        </a>
    );
}
