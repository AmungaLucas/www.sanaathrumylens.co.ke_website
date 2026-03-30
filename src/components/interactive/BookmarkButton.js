'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../providers/AuthProvider';

export default function BookmarkButton({ blogId, compact = false }) {
    const { user, requireAuth } = useAuth();
    const [bookmarked, setBookmarked] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);

    useEffect(() => {
        if (!user || !blogId) return;

        fetch(`/api/bookmarks?userId=${user.id}&blogId=${blogId}`)
            .then(res => {
                if (!res.ok) return null;
                return res.json();
            })
            .then(data => {
                if (data) setBookmarked(data.bookmarked);
            })
            .catch(console.error);
    }, [user, blogId]);

    const handleBookmark = async () => {
        requireAuth(async (currentUser) => {
            if (!currentUser) return;
            setLoading(true);

            if (bookmarked) {
                const res = await fetch(`/api/bookmarks?blogId=${blogId}&userId=${currentUser.id}`, {
                    method: 'DELETE'
                });
                if (res.ok) {
                    setBookmarked(false);
                    setShowTooltip(true);
                    setTimeout(() => setShowTooltip(false), 2000);
                }
            } else {
                const res = await fetch('/api/bookmarks', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ blogId, userId: currentUser.id })
                });
                if (res.ok) {
                    setBookmarked(true);
                    setShowTooltip(true);
                    setTimeout(() => setShowTooltip(false), 2000);
                }
            }

            setLoading(false);
        });
    };

    if (compact) {
        return (
            <div className="relative group">
                <button
                    onClick={handleBookmark}
                    disabled={loading}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-full transition-all duration-200 ${
                        bookmarked
                            ? 'bg-yellow-50 text-yellow-600'
                            : 'bg-gray-100 text-gray-600 hover:bg-yellow-50 hover:text-yellow-600'
                    }`}
                    aria-label={bookmarked ? 'Remove bookmark' : 'Add bookmark'}
                >
                    <svg
                        className={`w-5 h-5 transition-transform duration-200 group-hover:scale-110 ${bookmarked ? 'fill-current' : 'stroke-current fill-none'}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                        />
                    </svg>
                    {/* Show "Save" label on hover */}
                    <span className="text-sm font-medium max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-[60px] transition-all duration-300">
                        {bookmarked ? 'Saved' : 'Save'}
                    </span>
                </button>

                {showTooltip && (
                    <div className="absolute -top-9 left-1/2 -translate-x-1/2 px-2.5 py-1 bg-gray-900 text-white text-xs rounded-lg whitespace-nowrap animate-fade-in z-10">
                        {bookmarked ? 'Saved to bookmarks' : 'Removed from bookmarks'}
                        <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px border-4 border-transparent border-t-gray-900" />
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className="relative">
            <button
                onClick={handleBookmark}
                disabled={loading}
                className={`p-2 rounded-full transition-all duration-200 ${
                    bookmarked
                        ? 'bg-yellow-100 text-yellow-600 hover:bg-yellow-200'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                aria-label={bookmarked ? 'Remove bookmark' : 'Add bookmark'}
            >
                <svg
                    className={`w-5 h-5 ${bookmarked ? 'fill-current' : 'stroke-current fill-none'}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                    />
                </svg>
            </button>

            {showTooltip && (
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded whitespace-nowrap animate-fade-in">
                    {bookmarked ? 'Saved to bookmarks' : 'Removed from bookmarks'}
                </div>
            )}
        </div>
    );
}
