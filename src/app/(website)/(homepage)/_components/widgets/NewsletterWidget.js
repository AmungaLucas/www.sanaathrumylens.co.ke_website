'use client';

import { useState } from 'react';

export default function NewsletterWidget() {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email) return;

        setLoading(true);
        const res = await fetch('/api/newsletter', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
        });

        const data = await res.json();

        if (res.ok) {
            setStatus({ type: 'success', message: 'Subscribed successfully!' });
            setEmail('');
        } else {
            setStatus({ type: 'error', message: data.message || 'Something went wrong' });
        }

        setLoading(false);
        setTimeout(() => setStatus(null), 5000);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-3">
            <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
                required
            />
            <button
                type="submit"
                disabled={loading}
                className="w-full px-4 py-2 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition disabled:opacity-50"
            >
                {loading ? 'Subscribing...' : 'Subscribe'}
            </button>

            {status && (
                <div className={`p-2 rounded-lg text-xs text-center ${status.type === 'success'
                    ? 'bg-green-500/20 text-green-200'
                    : 'bg-red-500/20 text-red-200'
                    }`}>
                    {status.message}
                </div>
            )}
        </form>
    );
}