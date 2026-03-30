'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchBar() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const [loading, setLoading] = useState(false);
    const wrapperRef = useRef(null);
    const router = useRouter();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setShowResults(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        const search = async () => {
            if (query.length < 2) {
                setResults([]);
                return;
            }

            setLoading(true);
            const res = await fetch(`/api/search?q=${encodeURIComponent(query)}&limit=5`);
            const data = await res.json();
            setResults(data.articles || []);
            setLoading(false);
        };

        const debounce = setTimeout(search, 300);
        return () => clearTimeout(debounce);
    }, [query]);

    const handleSearch = (e) => {
        e.preventDefault();
        if (query.trim()) {
            router.push(`/search?q=${encodeURIComponent(query)}`);
            setShowResults(false);
        }
    };

    return (
        <div ref={wrapperRef} className="relative">
            <form onSubmit={handleSearch} className="relative">
                <input
                    type="text"
                    placeholder="Search articles..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => setShowResults(true)}
                    className="w-full px-4 py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <svg
                    className="absolute left-3 top-2.5 w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                </svg>
            </form>

            {showResults && query.length >= 2 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
                    {loading ? (
                        <div className="p-4 text-center text-gray-500">Searching...</div>
                    ) : results.length > 0 ? (
                        <div>
                            {results.map((article) => (
                                <a
                                    key={article.id}
                                    href={`/blogs/${article.slug}`}
                                    onClick={() => setShowResults(false)}
                                    className="block p-3 hover:bg-gray-50 border-b border-gray-100 last:border-0"
                                >
                                    <h4 className="font-medium text-gray-900">{article.title}</h4>
                                    <p className="text-sm text-gray-500 mt-1 line-clamp-1">{article.excerpt}</p>
                                    <p className="text-xs text-gray-400 mt-1">
                                        {article.author_name} • {new Date(article.published_at).toLocaleDateString()}
                                    </p>
                                </a>
                            ))}
                            <div className="p-2 border-t border-gray-100">
                                <button
                                    onClick={handleSearch}
                                    className="w-full text-center text-sm text-blue-600 hover:text-blue-800 py-1"
                                >
                                    View all results →
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="p-4 text-center text-gray-500">
                            No results found for &quot;{query}&quot;
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}