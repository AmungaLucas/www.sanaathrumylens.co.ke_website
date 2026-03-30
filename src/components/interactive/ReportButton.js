'use client';

import { useState } from 'react';
import { useAuth } from '../providers/AuthProvider';

const REPORT_REASONS = [
    { value: 'spam', label: 'Spam or misleading', icon: '🚫' },
    { value: 'harassment', label: 'Harassment or hate speech', icon: '⚠️' },
    { value: 'inappropriate', label: 'Inappropriate content', icon: '🔞' },
    { value: 'copyright', label: 'Copyright violation', icon: '©️' },
    { value: 'misinformation', label: 'Misinformation', icon: '❌' },
    { value: 'other', label: 'Other', icon: '📝' },
];

export default function ReportButton({ contentType, contentId, contentTitle }) {
    const { user, requireAuth } = useAuth();
    const [showModal, setShowModal] = useState(false);
    const [selectedReason, setSelectedReason] = useState('');
    const [description, setDescription] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedReason) {
            setError('Please select a reason');
            return;
        }

        requireAuth(async () => {
            setSubmitting(true);
            setError('');

            try {
                const res = await fetch('/api/reports', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        contentType,
                        contentId,
                        reason: selectedReason,
                        description: description.trim() || null,
                        reporterId: user.id
                    })
                });

                const data = await res.json();

                if (res.ok) {
                    setSubmitted(true);
                    setTimeout(() => {
                        setShowModal(false);
                        setSubmitted(false);
                        setSelectedReason('');
                        setDescription('');
                    }, 2000);
                } else {
                    setError(data.error || 'Something went wrong');
                }
            } catch (err) {
                setError('Network error. Please try again.');
            } finally {
                setSubmitting(false);
            }
        });
    };

    return (
        <>
            <button
                onClick={() => setShowModal(true)}
                className="p-2 text-gray-400 hover:text-red-600 transition-all duration-200"
                aria-label="Report content"
                title="Report"
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                </svg>
            </button>

            {/* Report Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in">
                    <div className="bg-white rounded-2xl max-w-md w-full mx-4 shadow-xl animate-scale-in">
                        {/* Header */}
                        <div className="flex items-center justify-between p-5 border-b border-gray-200">
                            <div className="flex items-center gap-2">
                                <span className="text-2xl">🚩</span>
                                <h3 className="text-lg font-semibold text-gray-900">Report Content</h3>
                            </div>
                            <button
                                onClick={() => setShowModal(false)}
                                className="text-gray-400 hover:text-gray-600 transition"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Content Info */}
                        {contentTitle && (
                            <div className="p-4 bg-gray-50 border-b border-gray-100">
                                <p className="text-sm text-gray-600">
                                    Reporting: <span className="font-medium text-gray-900">{contentTitle}</span>
                                </p>
                            </div>
                        )}

                        {!submitted ? (
                            <form onSubmit={handleSubmit} className="p-5">
                                {/* Reasons */}
                                <div className="space-y-3 mb-5">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Why are you reporting this?
                                    </label>
                                    {REPORT_REASONS.map((reason) => (
                                        <label
                                            key={reason.value}
                                            className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition ${selectedReason === reason.value
                                                ? 'border-red-500 bg-red-50'
                                                : 'border-gray-200 hover:border-gray-300'
                                                }`}
                                        >
                                            <input
                                                type="radio"
                                                name="reason"
                                                value={reason.value}
                                                checked={selectedReason === reason.value}
                                                onChange={(e) => setSelectedReason(e.target.value)}
                                                className="w-4 h-4 text-red-600"
                                            />
                                            <span className="text-lg">{reason.icon}</span>
                                            <span className="text-sm text-gray-700">{reason.label}</span>
                                        </label>
                                    ))}
                                </div>

                                {/* Additional Details */}
                                <div className="mb-5">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Additional details (optional)
                                    </label>
                                    <textarea
                                        rows="3"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        placeholder="Please provide any additional context..."
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                                    />
                                </div>

                                {error && (
                                    <div className="mb-4 p-3 bg-red-50 text-red-700 text-sm rounded-lg">
                                        {error}
                                    </div>
                                )}

                                <div className="flex gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={submitting || !selectedReason}
                                        className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {submitting ? (
                                            <span className="flex items-center justify-center gap-2">
                                                <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                                </svg>
                                                Submitting...
                                            </span>
                                        ) : (
                                            'Submit Report'
                                        )}
                                    </button>
                                </div>

                                <p className="text-xs text-gray-500 text-center mt-4">
                                    Reports are anonymous and reviewed by our moderation team
                                </p>
                            </form>
                        ) : (
                            <div className="p-8 text-center">
                                <div className="text-5xl mb-3">✅</div>
                                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                                    Report Submitted
                                </h4>
                                <p className="text-sm text-gray-600">
                                    Thank you for helping keep our community safe. We&apos;ll review this shortly.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            )}

            <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scale-in {
          from { 
            opacity: 0;
            transform: scale(0.95);
          }
          to { 
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }
        .animate-scale-in {
          animation: scale-in 0.2s ease-out;
        }
      `}</style>
        </>
    );
}