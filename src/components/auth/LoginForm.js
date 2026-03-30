'use client';

import { useState } from 'react';
import SocialAuth from './SocialAuth';
import { useAuth } from '../providers/AuthProvider';

export default function LoginForm({ onSuccess }) {
    // ✅ Get everything from hook at top level
    const { login, setAuthModalTab } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const result = await login(email, password);

        if (result.success) {
            onSuccess();
        } else {
            setError(result.error || 'Invalid email or password');
        }

        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
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

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                </label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
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
                {loading ? 'Signing in...' : 'Sign In'}
            </button>

            <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">
                        Or continue with
                    </span>
                </div>
            </div>

            <SocialAuth mode="login" />

            <div className="text-center mt-4">
                <button
                    type="button"
                    onClick={() => setAuthModalTab('reset')}
                    className="text-sm text-blue-600 hover:text-blue-800"
                >
                    Forgot password?
                </button>
            </div>
        </form>
    );
}