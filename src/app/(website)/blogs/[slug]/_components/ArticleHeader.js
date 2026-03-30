/* eslint-disable @next/next/no-img-element */
export default function ArticleHeader({ blog }) {
    return (
        <header className="mb-8">
            {/* Categories */}
            {blog.categories && blog.categories.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                    {blog.categories.map(category => (
                        <a
                            key={category.id}
                            href={`/categories/${category.slug}`}
                            className="text-sm text-blue-600 hover:text-blue-800"
                        >
                            #{category.name}
                        </a>
                    ))}
                </div>
            )}

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                {blog.title}
            </h1>

            {/* Author & Meta */}
            <div className="flex flex-wrap items-center gap-4 mb-6 pb-6 border-b border-gray-200">
                <div className="flex items-center gap-3">
                    <img
                        src={blog.author_avatar || '/default-avatar.png'}
                        alt={blog.author_name}
                        className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                        <div className="flex items-center gap-2">
                            <a
                                href={`/authors/${blog.author_slug}`}
                                className="font-medium text-gray-900 hover:text-blue-600"
                            >
                                {blog.author_name}
                            </a>
                            {blog.author_verified && (
                                <span className="text-blue-500 text-sm" title="Verified Author">✓</span>
                            )}
                        </div>
                        {blog.author_title && (
                            <p className="text-sm text-gray-500">{blog.author_title}</p>
                        )}
                    </div>
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>{new Date(blog.published_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                    })}</span>
                    <span>•</span>
                    <span>{Math.ceil(blog.content.length / 1000)} min read</span>
                    <span>•</span>
                    <span>{blog.view_count?.toLocaleString()} views</span>
                </div>
            </div>

            {/* Featured Image */}
            {blog.featured_image && (
                <div className="mb-8">
                    <img
                        src={blog.featured_image}
                        alt={blog.featured_image_alt || blog.title}
                        className="w-full h-auto rounded-xl shadow-lg"
                    />
                    {blog.featured_image_alt && (
                        <p className="text-xs text-gray-500 mt-2 text-center">
                            {blog.featured_image_alt}
                        </p>
                    )}
                </div>
            )}
        </header>
    );
}