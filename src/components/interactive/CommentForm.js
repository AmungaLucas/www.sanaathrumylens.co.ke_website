'use client';

import { useState } from 'react';
import { useAuth } from '../providers/AuthProvider';

export default function CommentForm({ blogId, parentId = null, onCommentAdded }) {
    const { user, requireAuth } = useAuth();
    const [content, setContent] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!content.trim()) return;

        // currentUser is passed by requireAuth to avoid stale closure
        requireAuth(async (currentUser) => {
            setSubmitting(true);

            const payload = {
                blogId,
                content,
                parentId,
                userId: currentUser?.id,
                authorName: currentUser?.name || 'Anonymous',
                authorEmail: currentUser?.email || null
            };

            const res = await fetch('/api/comments', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (res.ok) {
                setContent('');
                setSuccess(true);
                if (onCommentAdded) onCommentAdded();
                setTimeout(() => setSuccess(false), 3000);
            }

            setSubmitting(false);
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <textarea
                rows="4"
                placeholder={user ? "Share your thoughts..." : "Sign in to leave a comment..."}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
            />

            <button
                type="submit"
                disabled={submitting}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
            >
                {submitting ? 'Submitting...' : user ? 'Post Comment' : 'Sign in to Comment'}
            </button>

            {success && (
                <div className="p-3 bg-green-50 text-green-700 rounded-lg">
                    Comment posted successfully!
                </div>
            )}
        </form>
    );
}
