'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LinkAccountPage() {
    const router = useRouter();
    const [googleInfo, setGoogleInfo] = useState(null);
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);

    useEffect(() => {
        fetch('/api/auth/link-google')
            .then(res => {
                if (!res.ok) throw new Error('No pending link');
                return res.json();
            })
            .then(data => setGoogleInfo(data))
            .catch(() => {
                router.push('/login');
            })
            .finally(() => setFetching(false));
    }, [router]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const res = await fetch('/api/auth/link-google', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password }),
            });

            const data = await res.json();

            if (res.ok) {
                // Account linked — redirect to home
                router.push('/');
            } else {
                setError(data.error || 'Failed to link account');
            }
        } catch (err) {
            setError('Network error. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleSkip = () => {
        // Clear the link token and go to login
        document.cookie = 'link_token=; max-age=0; path=/';
        router.push('/login');
    };

    if (fetching) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-spin h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full" />
            </div>
        );
    }

    if (!googleInfo) return null;

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="w-full max-w-md">
                <div className="bg-white rounded-2xl shadow-lg p-8">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                    d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                            </svg>
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">Link Your Account</h1>
                        <p className="text-gray-500">
                            You signed in with Google, but an account with this email already exists.
                        </p>
                    </div>

                    {/* Google info card */}
                    <div className="bg-gray-50 rounded-xl p-4 mb-6">
                        <div className="flex items-center gap-3">
                            {googleInfo.googleAvatar ? (
                                <img
                                    src={googleInfo.googleAvatar}
                                    alt="Google avatar"
                                    className="w-12 h-12 rounded-full"
                                />
                            ) : (
                                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                                    <span className="text-red-600 font-bold">G</span>
                                </div>
                            )}
                            <div>
                                <p className="font-medium text-gray-900">{googleInfo.googleName}</p>
                                <p className="text-sm text-gray-500">{googleInfo.googleEmail}</p>
                            </div>
                            <span className="ml-auto text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                                Google
                            </span>
                        </div>
                    </div>

                    {/* Instruction */}
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
                        <p className="text-sm text-amber-800">
                            <strong>Enter your password</strong> to verify you own this account and link it with Google.
                            After linking, you can sign in with either method.
                        </p>
                    </div>

                    {/* Password form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Account Password
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your existing account password"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                            disabled={loading || !password}
                            className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                    Linking Account...
                                </span>
                            ) : (
                                'Link Accounts'
                            )}
                        </button>
                    </form>

                    {/* Skip option */}
                    <div className="mt-6 text-center">
                        <button
                            onClick={handleSkip}
                            className="text-sm text-gray-500 hover:text-gray-700 transition"
                        >
                            Don&apos;t link accounts — sign in with password instead
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
