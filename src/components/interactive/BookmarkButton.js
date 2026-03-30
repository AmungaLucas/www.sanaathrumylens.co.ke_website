'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../providers/AuthProvider';

export default function BookmarkButton({ blogId }) {
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
        // currentUser is passed by requireAuth to avoid stale closure
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

    return (
        <div className="relative">
            <button
                onClick={handleBookmark}
                disabled={loading}
                className={`p-2 rounded-full transition-all duration-200 ${bookmarked
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
