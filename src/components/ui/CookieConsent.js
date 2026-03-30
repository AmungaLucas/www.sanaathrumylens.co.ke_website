'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const COOKIE_CATEGORIES = {
    necessary: {
        name: 'Necessary',
        description: 'Essential for the website to function properly. Cannot be disabled.',
        required: true,
        default: true,
    },
    functional: {
        name: 'Functional',
        description: 'Enhance functionality and personalization (e.g., language preferences).',
        required: false,
        default: false,
    },
    analytics: {
        name: 'Analytics',
        description: 'Help us understand how visitors interact with the website (e.g., Google Analytics).',
        required: false,
        default: false,
    },
    marketing: {
        name: 'Marketing',
        description: 'Used to deliver relevant advertisements (e.g., Google Ads).',
        required: false,
        default: false,
    },
};

const COOKIE_VERSION = '1.0';

export default function CookieConsent() {
    const [showBanner, setShowBanner] = useState(false);
    const [showPreferences, setShowPreferences] = useState(false);
    const [preferences, setPreferences] = useState({
        necessary: true,
        functional: false,
        analytics: false,
        marketing: false,
    });
    const [saving, setSaving] = useState(false);
    const [isVisible, setIsVisible] = useState(true);

    // Check consent on mount
    useEffect(() => {
        checkConsent();

        // Listen for custom event to open settings
        const handleOpenSettings = () => {
            setShowBanner(true);
            setShowPreferences(true);
        };

        window.addEventListener('openCookieSettings', handleOpenSettings);
        return () => window.removeEventListener('openCookieSettings', handleOpenSettings);
    }, []);

    const checkConsent = async () => {
        try {
            const res = await fetch('/api/cookie-consent');
            const data = await res.json();

            if (!data.hasConsent) {
                setShowBanner(true);
            } else {
                setPreferences(data.preferences);
                applyCookiePreferences(data.preferences);
                setIsVisible(false);
            }
        } catch (error) {
            console.error('Error checking consent:', error);
            setShowBanner(true);
        }
    };

    const applyCookiePreferences = (prefs) => {
        // Apply analytics consent
        if (prefs.analytics && typeof window !== 'undefined') {
            if (window.gtag) {
                window.gtag('consent', 'update', {
                    analytics_storage: 'granted',
                });
            }
            // Also update dataLayer for Google Tag Manager
            if (window.dataLayer) {
                window.dataLayer.push({
                    event: 'consent_updated',
                    analytics_consent: 'granted',
                });
            }
        } else if (typeof window !== 'undefined' && window.gtag) {
            window.gtag('consent', 'update', {
                analytics_storage: 'denied',
            });
        }

        // Apply marketing consent
        if (prefs.marketing && typeof window !== 'undefined') {
            if (window.gtag) {
                window.gtag('consent', 'update', {
                    ad_storage: 'granted',
                    ad_user_data: 'granted',
                    ad_personalization: 'granted',
                });
            }
        } else if (typeof window !== 'undefined' && window.gtag) {
            window.gtag('consent', 'update', {
                ad_storage: 'denied',
                ad_user_data: 'denied',
                ad_personalization: 'denied',
            });
        }

        // Set cookie for client-side checking
        document.cookie = `cookie_preferences=${JSON.stringify(prefs)}; path=/; max-age=${365 * 24 * 60 * 60}`;
    };

    const saveConsent = async (newPreferences, acceptAll = false) => {
        setSaving(true);

        const consentData = acceptAll
            ? {
                necessary: true,
                functional: true,
                analytics: true,
                marketing: true,
            }
            : newPreferences;

        try {
            const res = await fetch('/api/cookie-consent', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    preferences: consentData,
                    version: COOKIE_VERSION,
                }),
            });

            if (res.ok) {
                setPreferences(consentData);
                setShowBanner(false);
                setShowPreferences(false);
                setIsVisible(false);
                applyCookiePreferences(consentData);

                // Dispatch event for other components
                window.dispatchEvent(new CustomEvent('cookieConsentUpdated', { detail: consentData }));
            }
        } catch (error) {
            console.error('Error saving consent:', error);
        } finally {
            setSaving(false);
        }
    };

    const handleAcceptAll = () => {
        saveConsent(null, true);
    };

    const handleAcceptNecessary = () => {
        saveConsent({ necessary: true, functional: false, analytics: false, marketing: false });
    };

    const handleSavePreferences = () => {
        saveConsent(preferences);
    };

    const updatePreference = (category, value) => {
        if (COOKIE_CATEGORIES[category].required) return;
        setPreferences({ ...preferences, [category]: value });
    };

    if (!showBanner) return null;

    return (
        <div
            data-cookie-consent
            className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 animate-slide-up"
        >
            <div className="max-w-7xl mx-auto">
                <div className="bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden">

                    {/* Simple Banner (Default View) */}
                    {!showPreferences && (
                        <div className="p-5 md:p-6">
                            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-2xl">🍪</span>
                                        <h3 className="text-lg font-semibold text-gray-900">
                                            We value your privacy
                                        </h3>
                                    </div>
                                    <p className="text-sm text-gray-600">
                                        We use cookies to enhance your browsing experience, serve personalized content,
                                        and analyze our traffic. By clicking &quot;Accept All&quot;, you consent to our use of cookies.
                                    </p>
                                    <div className="flex flex-wrap gap-4 mt-3">
                                        <button
                                            onClick={() => setShowPreferences(true)}
                                            className="text-sm text-blue-600 hover:text-blue-800 font-medium transition"
                                        >
                                            Customize preferences
                                        </button>
                                        <Link
                                            href="/privacy-policy"
                                            className="text-sm text-gray-500 hover:text-gray-700 transition"
                                        >
                                            Privacy Policy
                                        </Link>
                                        <Link
                                            href="/cookie-policy"
                                            className="text-sm text-gray-500 hover:text-gray-700 transition"
                                        >
                                            Cookie Policy
                                        </Link>
                                    </div>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                                    <button
                                        onClick={handleAcceptNecessary}
                                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
                                    >
                                        Accept Necessary
                                    </button>
                                    <button
                                        onClick={handleAcceptAll}
                                        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
                                    >
                                        Accept All
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Preferences Panel */}
                    {showPreferences && (
                        <div className="p-5 md:p-6">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2">
                                    <span className="text-2xl">⚙️</span>
                                    <h3 className="text-lg font-semibold text-gray-900">
                                        Cookie Preferences
                                    </h3>
                                </div>
                                <button
                                    onClick={() => setShowPreferences(false)}
                                    className="text-gray-400 hover:text-gray-600 transition p-1"
                                    aria-label="Close preferences"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            <p className="text-sm text-gray-600 mb-5">
                                Select which cookies you want to accept. Your preferences will be saved for future visits.
                                You can change them at any time by clicking the cookie icon at the bottom left corner.
                            </p>

                            <div className="space-y-4 mb-6">
                                {Object.entries(COOKIE_CATEGORIES).map(([key, category]) => (
                                    <div
                                        key={key}
                                        className="flex flex-col sm:flex-row sm:items-start justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
                                    >
                                        <div className="flex-1 mb-3 sm:mb-0">
                                            <div className="flex items-center gap-2 flex-wrap">
                                                <span className="font-medium text-gray-900">{category.name}</span>
                                                {category.required && (
                                                    <span className="text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded">
                                                        Required
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-sm text-gray-500 mt-1">{category.description}</p>
                                        </div>
                                        <div className="ml-0 sm:ml-4">
                                            {category.required ? (
                                                <span className="text-sm text-gray-400 bg-white px-3 py-1.5 rounded-lg">
                                                    Always Active
                                                </span>
                                            ) : (
                                                <label className="relative inline-flex items-center cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        checked={preferences[key]}
                                                        onChange={(e) => updatePreference(key, e.target.checked)}
                                                        className="sr-only peer"
                                                    />
                                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                                    <span className="ml-3 text-sm text-gray-600">
                                                        {preferences[key] ? 'Enabled' : 'Disabled'}
                                                    </span>
                                                </label>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="flex flex-col sm:flex-row gap-3 justify-end">
                                <button
                                    onClick={() => setShowPreferences(false)}
                                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSavePreferences}
                                    disabled={saving}
                                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {saving ? (
                                        <>
                                            <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                            </svg>
                                            Saving...
                                        </>
                                    ) : (
                                        'Save Preferences'
                                    )}
                                </button>
                            </div>

                            <div className="mt-5 pt-4 border-t border-gray-200">
                                <p className="text-xs text-gray-500 text-center">
                                    You can change your cookie preferences at any time by clicking the cookie icon at the bottom left corner.
                                    For more information, see our{' '}
                                    <Link href="/privacy-policy" className="text-blue-600 hover:underline">
                                        Privacy Policy
                                    </Link>
                                    {' '}and{' '}
                                    <Link href="/cookie-policy" className="text-blue-600 hover:underline">
                                        Cookie Policy
                                    </Link>
                                    .
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <style jsx>{`
        @keyframes slide-up {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
        </div>
    );
}