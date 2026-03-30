'use client';

import { useEffect, useRef, useState } from 'react';

export default function GoogleAd({
    slot,
    format = 'auto',
    style = {},
    className = '',
    responsive = true
}) {
    const adRef = useRef(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        let mounted = true;

        const loadAd = () => {
            try {
                if (!adRef.current) return;

                // Prevent duplicate initialization
                if (adRef.current.getAttribute('data-adsbygoogle-status') === 'done') {
                    return;
                }

                (window.adsbygoogle = window.adsbygoogle || []).push({});
            } catch (err) {
                console.error('AdSense error:', err);
                if (mounted) setError(true);
            }
        };

        // Delay slightly to ensure DOM is ready
        const timer = setTimeout(loadAd, 300);

        return () => {
            mounted = false;
            clearTimeout(timer);
        };
    }, []);

    const adStyle = {
        display: 'block',
        ...style,
        ...(responsive && {
            width: '100%',
            height: 'auto',
        }),
    };

    return (
        <div className={`relative ${className}`}>
            {!error ? (
                <ins
                    ref={adRef}
                    className="adsbygoogle"
                    style={adStyle}
                    data-ad-client="ca-pub-8031704055036556"
                    data-ad-slot={slot}
                    data-ad-format={format}
                    data-full-width-responsive={responsive ? 'true' : 'false'}
                />
            ) : (
                <div className="bg-gray-100 rounded-lg p-4 text-center border">
                    <p className="text-xs text-gray-400">Advertisement</p>
                </div>
            )}
        </div>
    );
}

