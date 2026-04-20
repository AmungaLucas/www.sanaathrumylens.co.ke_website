'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useAuth } from '../providers/AuthProvider';

export default function CommentForm({ blogId, parentId = null, onCommentAdded, compact = false }) {
    const { user, requireAuth } = useAuth();
    const [content, setContent] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [focused, setFocused] = useState(false);
    const textareaRef = useRef(null);

    const MAX_CHARS = 1000;

    // Auto-resize textarea
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
        }
    }, [content]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!content.trim()) return;

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
                setFocused(false);
                if (onCommentAdded) onCommentAdded();
                setTimeout(() => setSuccess(false), 3000);
            }

            setSubmitting(false);
        });
    };

    return (
        <form onSubmit={handleSubmit} className={compact ? '' : ''}>
            {/* Success state */}
            {success && (
                <div className="flex items-center gap-2 mb-3 px-3 py-2 bg-green-50 text-green-700 text-sm rounded-xl animate-fade-in">
                    <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Comment posted successfully
                </div>
            )}

            <div className="flex gap-3">
                {/* User avatar */}
                <div className="flex-shrink-0 pt-1">
                    {user ? (
                        <div className="relative w-9 h-9">
                            <Image
                                src={user.avatar_url || user.image || '/default-avatar.png'}
                                alt={user.name}
                                width={36}
                                height={36}
                                className="rounded-full object-cover bg-gray-100"
                            />
                        </div>
                    ) : (
                        <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center">
                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </div>
                    )}
                </div>

                {/* Textarea + controls */}
                <div className="flex-1">
                    <div
                        className={`relative rounded-2xl border transition-all duration-200 ${
                            focused
                                ? 'border-blue-300 ring-2 ring-blue-100 bg-white'
                                : 'border-gray-200 bg-gray-50 hover:border-gray-300'
                        }`}
                    >
                        <textarea
                            ref={textareaRef}
                            rows={compact ? 2 : 3}
                            placeholder={user ? "Share your thoughts..." : "Sign in to join the conversation..."}
                            value={content}
                            onChange={(e) => {
                                if (e.target.value.length <= MAX_CHARS) {
                                    setContent(e.target.value);
                                }
                            }}
                            onFocus={() => setFocused(true)}
                            onBlur={() => {
                                if (!content) setFocused(false);
                            }}
                            className="w-full px-4 pt-3 pb-2 bg-transparent resize-none focus:outline-none text-sm text-gray-900 placeholder-gray-400 leading-relaxed"
                            style={{ minHeight: compact ? '56px' : '76px', maxHeight: '200px' }}
                        />

                        {/* Bottom bar: character count + submit */}
                        {(focused || content) && (
                            <div className="flex items-center justify-between px-3 py-2 border-t border-gray-100">
                                <span className={`text-xs ${content.length > 900 ? 'text-amber-500' : 'text-gray-400'} transition-colors`}>
                                    {content.length}/{MAX_CHARS}
                                </span>
                                <button
                                    type="submit"
                                    disabled={submitting || !content.trim()}
                                    className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-blue-600 text-white text-xs font-medium rounded-full hover:bg-blue-700 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
                                >
                                    {submitting ? (
                                        <>
                                            <svg className="animate-spin w-3 h-3" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                            </svg>
                                            Posting...
                                        </>
                                    ) : (
                                        <>
                                            Post
                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                            </svg>
                                        </>
                                    )}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(-4px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in {
                    animation: fade-in 0.3s ease-out;
                }
            `}</style>
        </form>
    );
}
