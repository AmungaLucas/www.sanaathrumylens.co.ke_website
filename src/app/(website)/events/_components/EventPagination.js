'use client';

import Link from 'next/link';

export default function EventPagination({ currentPage, totalPages, filters }) {
    const buildUrl = (page) => {
        const params = new URLSearchParams();
        params.set('page', page);
        if (filters.eventType) params.set('type', filters.eventType);
        if (filters.location) params.set('location', filters.location);
        if (filters.month) params.set('month', filters.month);
        return `/events?${params.toString()}`;
    };

    const getPageNumbers = () => {
        const delta = 2;
        const range = [];
        const rangeWithDots = [];
        let l;

        for (let i = 1; i <= totalPages; i++) {
            if (i === 1 || i === totalPages || (i >= currentPage - delta && i <= currentPage + delta)) {
                range.push(i);
            }
        }

        range.forEach((i) => {
            if (l) {
                if (i - l === 2) {
                    rangeWithDots.push(l + 1);
                } else if (i - l !== 1) {
                    rangeWithDots.push('...');
                }
            }
            rangeWithDots.push(i);
            l = i;
        });

        return rangeWithDots;
    };

    if (totalPages <= 1) return null;

    return (
        <div className="flex justify-center items-center gap-2 mt-8">
            {/* Previous Button */}
            {currentPage > 1 && (
                <Link
                    href={buildUrl(currentPage - 1)}
                    className="px-3 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition"
                >
                    ← Previous
                </Link>
            )}

            {/* Page Numbers */}
            <div className="flex gap-1">
                {getPageNumbers().map((page, index) => (
                    page === '...' ? (
                        <span key={`dots-${index}`} className="px-3 py-2 text-gray-500">
                            ...
                        </span>
                    ) : (
                        <Link
                            key={page}
                            href={buildUrl(page)}
                            className={`px-3 py-2 rounded-lg transition ${currentPage === page
                                ? 'bg-blue-600 text-white'
                                : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                                }`}
                        >
                            {page}
                        </Link>
                    )
                ))}
            </div>

            {/* Next Button */}
            {currentPage < totalPages && (
                <Link
                    href={buildUrl(currentPage + 1)}
                    className="px-3 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition"
                >
                    Next →
                </Link>
            )}
        </div>
    );
}