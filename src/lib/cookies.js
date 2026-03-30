'use server';

import { cookies } from 'next/headers';

export async function getCookieConsent() {
    const cookieStore = cookies();
    const consentId = cookieStore.get('cookie_consent_id')?.value;

    if (!consentId) {
        return { hasConsent: false };
    }

    // In a real implementation, you'd fetch from database
    // For now, we'll return default
    return { hasConsent: true, preferences: { analytics: true, marketing: false } };
}

export async function setAnalyticsConsent(consent) {
    // Update Google Analytics consent
    if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('consent', 'update', {
            analytics_storage: consent ? 'granted' : 'denied',
        });
    }
}

export async function setMarketingConsent(consent) {
    // Update Google Ads consent
    if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('consent', 'update', {
            ad_storage: consent ? 'granted' : 'denied',
            ad_user_data: consent ? 'granted' : 'denied',
            ad_personalization: consent ? 'granted' : 'denied',
        });
    }
}