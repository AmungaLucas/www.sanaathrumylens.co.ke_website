'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../providers/AuthProvider';

export default function FollowButton({ authorId, authorName, initialFollowers = 0 }) {
    const { user, requireAuth } = useAuth();
    const [following, setFollowing] = useState(false);
    const [followers, setFollowers] = useState(initialFollowers);
    const [loading, setLoading] = useState(false);

    // Check if user is following on mount
    useEffect(() => {
        if (!user || !authorId) return;

        fetch(`/api/follow?authorId=${authorId}&userId=${user.id}`)
            .then(res => {
                if (!res.ok) return null;
                return res.json();
            })
            .then(data => {
                if (data) setFollowing(data.following);
            })
            .catch(console.error);
    }, [user, authorId]);

    const handleFollow = async () => {
        requireAuth(async () => {
            setLoading(true);

            if (following) {
                // Unfollow
                const res = await fetch(`/api/follow?authorId=${authorId}&userId=${user.id}`, {
                    method: 'DELETE'
                });
                if (res.ok) {
                    setFollowing(false);
                    setFollowers(followers - 1);
                }
            } else {
                // Follow
                const res = await fetch('/api/follow', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ authorId, userId: user.id })
                });
                if (res.ok) {
                    setFollowing(true);
                    setFollowers(followers + 1);
                }
            }

            setLoading(false);
        });
    };

    return (
        <button
            onClick={handleFollow}
            disabled={loading}
            className={`px-6 py-2 rounded-full font-medium transition-all duration-200 flex items-center gap-2 ${following
                ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
        >
            {loading ? (
                <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
            ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d={following
                            ? "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            : "M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"}
                    />
                </svg>
            )}
            <span>
                {loading
                    ? '...'
                    : following
                        ? `Following (${followers.toLocaleString()})`
                        : `Follow (${followers.toLocaleString()})`
                }
            </span>
        </button>
    );
}