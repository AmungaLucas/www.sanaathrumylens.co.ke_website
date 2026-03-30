'use client';

import { useState } from 'react';

export default function ResetPasswordForm({ onBack }) {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const res = await fetch('/api/auth/reset-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            if (res.ok) {
                setSubmitted(true);
            } else {
                const data = await res.json();
                setError(data.error || 'Something went wrong');
            }
        } catch (error) {
            setError('Network error. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (submitted) {
        return (
            <div className="text-center space-y-4">
                <div className="text-4xl mb-2">📧</div>
                <h3 className="text-lg font-semibold text-gray-900">
                    Check your email
                </h3>
                <p className="text-gray-600 text-sm">
                    We&apos;ve sent password reset instructions to {email}
                </p>
                <button
                    onClick={onBack}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                    Back to sign in
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <p className="text-sm text-gray-600 mb-4">
                Enter your email address and we&apos;ll send you a link to reset your password.
            </p>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                </label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                    autoFocus
                />
            </div>

            {error && (
                <div className="p-3 bg-red-50 text-red-700 text-sm rounded-lg">
                    {error}
                </div>
            )}

            <button
                type="submit"
                disabled={loading}
                className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
            >
                {loading ? 'Sending...' : 'Send Reset Link'}
            </button>

            <button
                type="button"
                onClick={onBack}
                className="w-full text-center text-sm text-gray-500 hover:text-gray-700"
            >
                Back to sign in
            </button>
        </form>
    );
}