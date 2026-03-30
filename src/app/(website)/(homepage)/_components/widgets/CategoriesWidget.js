export default function CategoriesWidget({ categories }) {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <div className="flex items-center gap-2 mb-4">
                <span className="text-xl">📂</span>
                <h3 className="text-lg font-semibold text-gray-900">
                    Categories
                </h3>
            </div>

            <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                    <a
                        key={category.id}
                        href={`/categories/${category.slug}`}
                        className="px-3 py-1.5 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-blue-100 hover:text-blue-700 transition"
                    >
                        {category.name}
                        {category.post_count > 0 && (
                            <span className="ml-1 text-xs text-gray-500">
                                ({category.post_count})
                            </span>
                        )}
                    </a>
                ))}
            </div>
        </div>
    );
}