'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import CommentForm from '@/components/interactive/CommentForm';
import ReportButton from '@/components/interactive/ReportButton';
import { useAuth } from '@/components/providers/AuthProvider';

// ─── Skeleton loader that mimics a comment ───────────────────
function CommentSkeleton() {
    return (
        <div className="flex gap-3 animate-pulse">
            <div className="w-10 h-10 bg-gray-200 rounded-full flex-shrink-0" />
            <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2">
                    <div className="h-4 bg-gray-200 rounded w-24" />
                    <div className="h-3 bg-gray-200 rounded w-16" />
                </div>
                <div className="space-y-1.5">
                    <div className="h-3 bg-gray-200 rounded w-full" />
                    <div className="h-3 bg-gray-200 rounded w-5/6" />
                    <div className="h-3 bg-gray-200 rounded w-2/3" />
                </div>
            </div>
        </div>
    );
}

// ─── Empty state ─────────────────────────────────────────────
function EmptyCommentsState() {
    return (
        <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">Be the first to share your thoughts</h3>
            <p className="text-sm text-gray-500 max-w-xs">Start the conversation. We&apos;d love to hear what you think about this article.</p>
        </div>
    );
}

// ─── Sign-in prompt ──────────────────────────────────────────
function SignInPrompt() {
    const { openAuthModal } = useAuth();
    return (
        <div className="flex flex-col items-center justify-center py-10 text-center bg-gray-50 rounded-2xl border border-dashed border-gray-300 px-6">
            <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">Join the conversation</h3>
            <p className="text-sm text-gray-500 mb-4 max-w-sm">Sign in to share your thoughts and connect with other readers.</p>
            <button
                onClick={() => openAuthModal('login')}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-full hover:bg-blue-700 transition-all duration-200 shadow-sm hover:shadow-md"
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                Sign in to comment
            </button>
        </div>
    );
}

// ─── Single comment component ────────────────────────────────
function CommentItem({ comment, onReply, replyTo, setReplyTo, blogId, onCommentAdded, formatDate, isReply = false }) {
    const [collapsed, setCollapsed] = useState(false);
    const hasReplies = comment.replies && comment.replies.length > 0;
    const collapsedCount = hasReplies ? comment.replies.length : 0;

    return (
        <div className={isReply ? 'relative' : ''}>
            {/* Vertical connecting line for replies */}
            {isReply && (
                <div className="absolute -left-4 top-0 bottom-0 w-0.5 bg-gray-200 rounded-full" />
            )}

            <div className="flex gap-3 py-3">
                {/* Avatar */}
                <div className="relative w-10 h-10 flex-shrink-0">
                    <Image
                        src={comment.avatar_url || '/default-avatar.png'}
                        alt={comment.author_name}
                        width={40}
                        height={40}
                        className="rounded-full object-cover bg-gray-100"
                    />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                    {/* Header row */}
                    <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-semibold text-gray-900">{comment.author_name}</span>
                        <span className="text-xs text-gray-400">{formatDate(comment.created_at)}</span>
                    </div>

                    {/* Body */}
                    <p className="text-sm text-gray-700 leading-relaxed break-words">{comment.content}</p>

                    {/* Action buttons */}
                    <div className="flex items-center gap-1 mt-2">
                        <button
                            onClick={() => setReplyTo(replyTo === comment.id ? null : comment.id)}
                            className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-all duration-200"
                        >
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                            </svg>
                            Reply
                        </button>
                        <ReportButton
                            contentType="COMMENT"
                            contentId={comment.id}
                            contentTitle={`Comment by ${comment.author_name}`}
                        />
                    </div>

                    {/* Inline reply form */}
                    {replyTo === comment.id && (
                        <div className="mt-3 ml-0">
                            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full mb-2">
                                <span>Replying to @{comment.author_name}</span>
                                <button
                                    onClick={() => setReplyTo(null)}
                                    className="text-blue-400 hover:text-blue-700 transition-colors"
                                >
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                            <CommentForm
                                blogId={blogId}
                                parentId={comment.id}
                                onCommentAdded={() => {
                                    setReplyTo(null);
                                    onCommentAdded();
                                }}
                            />
                        </div>
                    )}
                </div>
            </div>

            {/* Nested replies */}
            {hasReplies && (
                <div className="ml-8">
                    {/* Collapsible toggle */}
                    {collapsedCount > 2 && (
                        <button
                            onClick={() => setCollapsed(!collapsed)}
                            className="flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-gray-700 mb-1 transition-colors duration-200"
                        >
                            <svg
                                className={`w-3.5 h-3.5 transition-transform duration-200 ${collapsed ? '' : '-rotate-90'}`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                            {collapsed
                                ? `Show ${collapsedCount} ${collapsedCount === 1 ? 'reply' : 'replies'}`
                                : `Hide ${collapsedCount > 2 ? collapsedCount - 2 : ''} ${collapsedCount === 1 ? 'reply' : 'replies'}`
                            }
                        </button>
                    )}

                    {/* Replies */}
                    <div className={`space-y-0 ${collapsed ? 'max-h-0 overflow-hidden' : ''}`}>
                        {(collapsed
                            ? comment.replies.slice(-2)
                            : comment.replies
                        ).map(reply => (
                            <CommentItem
                                key={reply.id}
                                comment={reply}
                                onReply={onReply}
                                replyTo={replyTo}
                                setReplyTo={setReplyTo}
                                blogId={blogId}
                                onCommentAdded={onCommentAdded}
                                formatDate={formatDate}
                                isReply
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

// ─── Main Comments Section ───────────────────────────────────
export default function CommentsSection({ blogId }) {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [replyTo, setReplyTo] = useState(null);
    const [fadeIn, setFadeIn] = useState(false);
    const { user } = useAuth();

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
            setFadeIn(true);
        }
    }, [blogId]);

    useEffect(() => {
        setLoading(true);
        setFadeIn(false);
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
        if (diffMins < 60) return `${diffMins}m ago`;
        if (diffHours < 24) return `${diffHours}h ago`;
        if (diffDays < 7) return `${diffDays}d ago`;
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    const buildTree = (flatComments) => {
        const map = {};
        const tree = [];
        flatComments.forEach(comment => {
            map[comment.id] = { ...comment, replies: [] };
        });
        flatComments.forEach(comment => {
            if (comment.parent_id && map[comment.parent_id]) {
                map[comment.parent_id].replies.push(map[comment.id]);
            } else {
                tree.push(map[comment.id]);
            }
        });
        return tree;
    };

    const commentTree = buildTree(comments);

    return (
        <section className="mt-16 pt-12 border-t border-gray-200">
            {/* Section header */}
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-gray-900">
                    Comments
                    {comments.length > 0 && (
                        <span className="ml-2 text-base font-normal text-gray-400">({comments.length})</span>
                    )}
                </h2>
            </div>

            {/* Comment form or sign-in prompt */}
            {!loading && (
                <div className="mb-10">
                    {user ? (
                        <CommentForm
                            blogId={blogId}
                            onCommentAdded={handleCommentAdded}
                        />
                    ) : (
                        <SignInPrompt />
                    )}
                </div>
            )}

            {/* Comments list */}
            {loading ? (
                <div className="space-y-6">
                    {[1, 2, 3].map((i) => (
                        <CommentSkeleton key={i} />
                    ))}
                </div>
            ) : commentTree.length > 0 ? (
                <div className={`space-y-1 transition-opacity duration-500 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}>
                    {commentTree.map(comment => (
                        <CommentItem
                            key={comment.id}
                            comment={comment}
                            onReply={setReplyTo}
                            replyTo={replyTo}
                            setReplyTo={setReplyTo}
                            blogId={blogId}
                            onCommentAdded={handleCommentAdded}
                            formatDate={formatDate}
                        />
                    ))}
                </div>
            ) : (
                <EmptyCommentsState />
            )}
        </section>
    );
}
