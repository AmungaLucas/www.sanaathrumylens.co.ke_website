'use client';

import { useState } from 'react';

export default function NewsletterForm() {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [status, setStatus] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email) return;

        setLoading(true);

        const res = await fetch('/api/newsletter', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, name: name || null })
        });

        const data = await res.json();

        if (res.ok) {
            setStatus({ type: 'success', message: data.message });
            setEmail('');
            setName('');
        } else {
            setStatus({ type: 'error', message: data.message || 'Something went wrong' });
        }

        setLoading(false);

        setTimeout(() => setStatus(null), 5000);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-3">
            <div>
                <input
                    type="text"
                    placeholder="Your name (optional)"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
            </div>
            <div>
                <input
                    type="email"
                    placeholder="Your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                />
            </div>
            <button
                type="submit"
                disabled={loading}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
            >
                {loading ? 'Subscribing...' : 'Subscribe'}
            </button>

            {status && (
                <div className={`p-3 rounded-lg text-sm ${status.type === 'success'
                    ? 'bg-green-50 text-green-700'
                    : 'bg-red-50 text-red-700'
                    }`}>
                    {status.message}
                </div>
            )}
        </form>
    );
}