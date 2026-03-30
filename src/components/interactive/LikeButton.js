'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../providers/AuthProvider';

export default function LikeButton({ blogId, initialCount = 0 }) {
    const { user, requireAuth } = useAuth();
    const [liked, setLiked] = useState(false);
    const [count, setCount] = useState(initialCount);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!user || !blogId) return;

        fetch(`/api/likes?blogId=${blogId}&userId=${user.id}`)
            .then(res => {
                if (!res.ok) return null;
                return res.json();
            })
            .then(data => {
                if (data) setLiked(data.liked);
            })
            .catch(console.error);
    }, [user, blogId]);

    const handleLike = async () => {
        requireAuth(async () => {
            setLoading(true);

            if (liked) {
                const res = await fetch(`/api/likes?blogId=${blogId}&userId=${user.id}`, {
                    method: 'DELETE'
                });
                if (res.ok) {
                    setLiked(false);
                    setCount(c => c - 1);
                }
            } else {
                const res = await fetch('/api/likes', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ blogId, userId: user.id })
                });
                if (res.ok) {
                    setLiked(true);
                    setCount(c => c + 1);
                }
            }

            setLoading(false);
        });
    };

    return (
        <button
            onClick={handleLike}
            disabled={loading}
            className={`flex items-center gap-2 px-4 py-2 rounded-full transition ${liked
                ? 'bg-red-50 text-red-600'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
        >
            <svg
                className={`w-5 h-5 ${liked ? 'fill-current' : 'stroke-current fill-none'}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
            </svg>
            <span>{count}</span>
        </button>
    );
}