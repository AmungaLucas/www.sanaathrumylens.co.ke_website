/* eslint-disable @next/next/no-img-element */
'use client';

import { useState, useEffect, useCallback } from 'react';
import CommentForm from '@/components/interactive/CommentForm';
import GoogleAd from '@/components/ui/GoogleAd';

export default function CommentsSection({ blogId }) {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [replyTo, setReplyTo] = useState(null);

    // ✅ Stable function (fixes dependency warning)
    const fetchComments = useCallback(async () => {
        try {
            const res = await fetch(`/api/comments?blogId=${blogId}`);
            if (!res.ok) return;
            const data = await res.json();
            setComments(data);
        } catch (error) {
            console.error('Error fetching comments:', error);
        } finally {
            setLoading(false);
        }
    }, [blogId]);

    // ✅ Correct effect usage
    useEffect(() => {
        setLoading(true); // important when blogId changes
        fetchComments();
    }, [fetchComments]);

    const handleCommentAdded = () => {
        fetchComments();
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffMs = now - date;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMins / 60);
        const diffDays = Math.floor(diffHours / 24);

        if (diffMins < 1) return 'Just now';
        if (diffMins < 60) return `${diffMins} minutes ago`;
        if (diffHours < 24) return `${diffHours} hours ago`;
        if (diffDays < 7) return `${diffDays} days ago`;
        return date.toLocaleDateString();
    };

    return (
        <div className="mt-8 pt-6 border-t border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Comments ({comments.length})
            </h2>

            {/* Comment Form */}
            <div className="bg-gray-50 rounded-xl p-6 mb-8">
                <CommentForm
                    blogId={blogId}
                    onCommentAdded={handleCommentAdded}
                />
            </div>

            {/* Ad */}
            <div className="my-6">
                <GoogleAd slot="comments-top" format="auto" style={{ minHeight: '90px' }} />
            </div>

            {/* Comments */}
            {loading ? (
                <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="animate-pulse">
                            <div className="flex gap-3">
                                <div className="w-10 h-10 bg-gray-200 rounded-full" />
                                <div className="flex-1">
                                    <div className="h-4 bg-gray-200 rounded w-1/4 mb-2" />
                                    <div className="h-3 bg-gray-200 rounded w-3/4" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : comments.length > 0 ? (
                <div className="space-y-6">
                    {comments.map((comment) => (
                        <div key={comment.id} className="flex gap-3">
                            <img
                                src={comment.avatar_url || '/default-avatar.png'}
                                alt={comment.author_name}
                                className="w-10 h-10 rounded-full object-cover"
                            />

                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="font-medium text-gray-900">
                                        {comment.author_name}
                                    </span>
                                    <span className="text-xs text-gray-500">
                                        {formatDate(comment.created_at)}
                                    </span>
                                </div>

                                <p className="text-gray-700">{comment.content}</p>

                                <button
                                    onClick={() => setReplyTo(comment.id)}
                                    className="text-xs text-blue-600 hover:text-blue-800 mt-2"
                                >
                                    Reply
                                </button>

                                {/* Reply Form */}
                                {replyTo === comment.id && (
                                    <div className="mt-3 pl-6">
                                        <CommentForm
                                            blogId={blogId}
                                            parentId={comment.id}
                                            onCommentAdded={() => {
                                                setReplyTo(null);
                                                fetchComments();
                                            }}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-8 text-gray-500">
                    No comments yet. Be the first to share your thoughts!
                </div>
            )}
        </div>
    );
}