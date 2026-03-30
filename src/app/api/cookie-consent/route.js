import { cookies } from 'next/headers';
import { query } from '@/lib/db';

// Get current consent status
export async function GET(request) {
    const cookieStore = request.cookies;
    const consentId = cookieStore.get('cookie_consent_id')?.value;
    const visitorId = getVisitorId(request);

    if (!consentId) {
        return Response.json({ hasConsent: false });
    }

    try {
        // Get consent from database
        const consent = await query(`
      SELECT preferences, consent_version 
      FROM cookie_consents 
      WHERE id = ? OR visitor_id = ?
      ORDER BY consent_date DESC 
      LIMIT 1
    `, [consentId, visitorId]);

        if (consent.length === 0) {
            return Response.json({ hasConsent: false });
        }

        return Response.json({
            hasConsent: true,
            preferences: consent[0].preferences,
            version: consent[0].consent_version,
        });
    } catch (error) {
        console.error('Error fetching consent:', error);
        return Response.json({ hasConsent: false });
    }
}

// Save consent preferences
export async function POST(request) {
    try {
        const { preferences, version } = await request.json();
        const cookieStore = request.cookies;

        // Get or create visitor ID
        let visitorId = cookieStore.get('visitor_id')?.value;
        if (!visitorId) {
            visitorId = generateVisitorId();
            cookieStore.set('visitor_id', visitorId, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 365 * 24 * 60 * 60, // 1 year
                path: '/',
            });
        }

        // Get user ID if logged in
        let userId = null;
        const token = cookieStore.get('token')?.value;
        if (token) {
            try {
                const { verifyToken } = await import('@/lib/auth');
                const decoded = verifyToken(token);
                if (decoded) {
                    userId = decoded.userId;
                }
            } catch (error) {
                // Ignore token errors
            }
        }

        // Save consent to database
        const result = await query(`
      INSERT INTO cookie_consents 
      (user_id, visitor_id, consent_version, necessary, functional, analytics, marketing, ip_address, user_agent)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
            userId,
            visitorId,
            version,
            preferences.necessary ? 1 : 0,
            preferences.functional ? 1 : 0,
            preferences.analytics ? 1 : 0,
            preferences.marketing ? 1 : 0,
            request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown',
            request.headers.get('user-agent') || 'unknown',
        ]);

        // Fetch the UUID back (insertId is 0 for UUID primary keys)
        const inserted = await query(
            'SELECT id FROM cookie_consents WHERE visitor_id = ? ORDER BY consent_date DESC LIMIT 1',
            [visitorId]
        );
        const consentUuid = inserted[0]?.id || visitorId;

        // Set cookie with consent UUID
        cookieStore.set('cookie_consent_id', consentUuid, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 365 * 24 * 60 * 60, // 1 year
            path: '/',
        });

        return Response.json({ success: true });
    } catch (error) {
        console.error('Error saving consent:', error);
        return Response.json({ error: 'Internal server error' }, { status: 500 });
    }
}

// Update consent preferences
export async function PUT(request) {
    try {
        const { preferences, version } = await request.json();
        const cookieStore = request.cookies;
        const consentId = cookieStore.get('cookie_consent_id')?.value;

        if (!consentId) {
            return Response.json({ error: 'No consent found' }, { status: 404 });
        }

        // Update existing consent
        await query(`
      UPDATE cookie_consents 
      SET functional = ?, analytics = ?, marketing = ?, consent_version = ?
      WHERE id = ?
    `, [
            preferences.functional ? 1 : 0,
            preferences.analytics ? 1 : 0,
            preferences.marketing ? 1 : 0,
            version,
            consentId,
        ]);

        return Response.json({ success: true });
    } catch (error) {
        console.error('Error updating consent:', error);
        return Response.json({ error: 'Internal server error' }, { status: 500 });
    }
}

// Helper functions
function generateVisitorId() {
    return 'vis_' + Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);
}

function getVisitorId(request) {
    const cookieStore = request.cookies;
    return cookieStore.get('visitor_id')?.value || null;
}