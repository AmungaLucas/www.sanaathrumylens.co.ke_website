'use client';

import { useState, useEffect } from 'react';

export default function CookieSettingsButton() {
    const [showBanner, setShowBanner] = useState(false);

    const openSettings = () => {
        // Trigger cookie consent banner
        const event = new CustomEvent('openCookieSettings');
        window.dispatchEvent(event);
    };

    useEffect(() => {
        const handleOpenSettings = () => {
            // Find and open cookie consent banner
            const banner = document.querySelector('[data-cookie-consent]');
            if (banner) {
                // Trigger the banner's preference panel
                const customizeButton = banner.querySelector('button:contains("Customize")');
                if (customizeButton) customizeButton.click();
            }
        };

        window.addEventListener('openCookieSettings', handleOpenSettings);
        return () => window.removeEventListener('openCookieSettings', handleOpenSettings);
    }, []);

    return (
        <button
            onClick={openSettings}
            className="fixed bottom-4 left-4 z-40 p-2 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-200"
            aria-label="Cookie Settings"
        >
            <span className="text-xl">🍪</span>
        </button>
    );
}