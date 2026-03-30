'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function BlogFilters({ categories, tags, currentCategory, currentTag }) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [showTags, setShowTags] = useState(false);

    const handleFilter = (type, value) => {
        const params = new URLSearchParams(searchParams);

        if (type === 'category') {
            if (value === currentCategory) {
                params.delete('category');
            } else {
                params.set('category', value);
                params.delete('tag');
            }
        } else if (type === 'tag') {
            if (value === currentTag) {
                params.delete('tag');
            } else {
                params.set('tag', value);
                params.delete('category');
            }
        }

        params.delete('page');
        router.push(`/blogs?${params.toString()}`);
    };

    const clearFilters = () => {
        router.push('/blogs');
    };

    const hasActiveFilters = currentCategory || currentTag;

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 mb-8">
            <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Filter Articles</h3>
                {hasActiveFilters && (
                    <button
                        onClick={clearFilters}
                        className="text-sm text-blue-600 hover:text-blue-800"
                    >
                        Clear all
                    </button>
                )}
            </div>

            {/* Categories */}
            <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Categories</h4>
                <div className="flex flex-wrap gap-2">
                    {categories.slice(0, 8).map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => handleFilter('category', cat.slug)}
                            className={`px-3 py-1.5 rounded-full text-sm transition ${currentCategory === cat.slug
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            {cat.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* Tags Toggle */}
            <button
                onClick={() => setShowTags(!showTags)}
                className="text-sm text-blue-600 hover:text-blue-800 mb-2"
            >
                {showTags ? '▼ Hide tags' : '▶ Show tags'}
            </button>

            {/* Tags */}
            {showTags && (
                <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Popular Tags</h4>
                    <div className="flex flex-wrap gap-2">
                        {tags.slice(0, 20).map((tag) => (
                            <button
                                key={tag.id}
                                onClick={() => handleFilter('tag', tag.slug)}
                                className={`px-3 py-1.5 rounded-full text-sm transition ${currentTag === tag.slug
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                #{tag.name}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Active Filters Display */}
            {hasActiveFilters && (
                <div className="mt-4 pt-3 border-t border-gray-100">
                    <p className="text-sm text-gray-500 mb-2">Active filters:</p>
                    <div className="flex gap-2">
                        {currentCategory && (
                            <span className="px-2 py-1 bg-blue-100 text-blue-700 text-sm rounded">
                                Category: {currentCategory}
                                <button
                                    onClick={() => handleFilter('category', currentCategory)}
                                    className="ml-2 text-blue-500 hover:text-blue-700"
                                >
                                    ×
                                </button>
                            </span>
                        )}
                        {currentTag && (
                            <span className="px-2 py-1 bg-blue-100 text-blue-700 text-sm rounded">
                                Tag: #{currentTag}
                                <button
                                    onClick={() => handleFilter('tag', currentTag)}
                                    className="ml-2 text-blue-500 hover:text-blue-700"
                                >
                                    ×
                                </button>
                            </span>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}