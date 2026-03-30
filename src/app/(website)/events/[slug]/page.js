/* eslint-disable @next/next/no-img-element */
import { notFound } from 'next/navigation';
import { getEventBySlug, getUpcomingEvents, checkUserRSVP } from '@/lib/queries';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth';
import EventHeader from './_components/EventHeader';
import EventDetails from './_components/EventDetails';
import EventMap from './_components/EventMap';
import RSVPForm from './_components/RSVPForm';
import EventSidebar from './_components/EventSidebar';
import RelatedEvents from './_components/RelatedEvents';
import ShareEvent from './_components/ShareEvent';
import GoogleAd from '@/components/ui/GoogleAd';

// Generate SEO metadata dynamically
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);

  if (!event) {
    return {
      title: 'Event Not Found',
      description: 'The requested event could not be found.',
    };
  }

  return {
    title: `${event.title} - Sanaa Thru My Lens`,
    description: event.excerpt || event.description?.substring(0, 160),
    openGraph: {
      title: event.title,
      description: event.excerpt,
      url: `https://sanaathrumylens.co.ke/events/${event.slug}`,
      type: 'event',
      images: event.featured_image ? [event.featured_image] : [],
      event: {
        startDate: event.event_date,
        endDate: event.event_end_date,
        location: {
          name: event.location_name,
          address: event.location_address,
        },
      },
    },
    twitter: {
      card: 'summary_large_image',
      title: event.title,
      description: event.excerpt,
      images: event.featured_image ? [event.featured_image] : [],
    },
  };
}

export default async function EventDetailPage({ params }) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);

  if (!event) {
    notFound();
  }

  // Check if user is logged in and has RSVP'd
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value;
  let userId = null;
  let hasRSVP = false;

  if (token) {
    const decoded = verifyToken(token);
    if (decoded) {
      userId = decoded.userId;
      hasRSVP = await checkUserRSVP(event.id, userId);
    }
  }

  // Get related events
  const relatedEvents = await getUpcomingEvents(3);

  // Structured Data for SEO
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.title,
    description: event.excerpt,
    startDate: event.event_date,
    endDate: event.event_end_date,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: event.is_online
      ? 'https://schema.org/OnlineEventAttendanceMode'
      : 'https://schema.org/OfflineEventAttendanceMode',
    location: event.is_online ? {
      '@type': 'VirtualLocation',
      url: event.online_url || null,
    } : {
      '@type': 'Place',
      name: event.location_name,
      address: event.location_address,
    },
    image: event.featured_image,
    organizer: {
      '@type': 'Organization',
      name: event.organizer_name || 'Sanaa Thru My Lens',
      email: event.organizer_email,
    },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'KES',
      availability: 'https://schema.org/InStock',
      validFrom: event.event_date,
    },
  };

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="flex flex-col lg:flex-row gap-8">

            {/* Main Content */}
            <article className="flex-1 min-w-0">
              {/* Event Header */}
              <EventHeader event={event} />

              {/* Featured Image */}
              {event.featured_image && (
                <div className="mb-8">
                  <img
                    src={event.featured_image}
                    alt={event.title}
                    className="w-full h-auto rounded-xl shadow-lg"
                  />
                </div>
              )}

              {/* Event Details */}
              <EventDetails event={event} />

              {/* Map (if in-person event with location) */}
              {!event.is_online && event.location_name && (
                <EventMap location={event.location_name} />
              )}

              {/* RSVP Form */}
              {new Date(event.event_date) > new Date() && (
                <div className="mt-8 bg-linear-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-100">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Register for this Event
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Secure your spot for this exciting creative gathering.
                  </p>
                  <RSVPForm
                    eventId={event.id}
                    eventTitle={event.title}
                    userId={userId}
                    hasRSVP={hasRSVP}
                  />
                </div>
              )}

              {/* Share Event */}
              <ShareEvent
                url={`https://sanaathrumylens.co.ke/events/${event.slug}`}
                title={event.title}
              />

              {/* Ad Between Content and Related */}
              <div className="my-8">
                <GoogleAd slot="event-between-content" format="auto" style={{ minHeight: '90px' }} />
              </div>
            </article>

            {/* Sidebar */}
            <EventSidebar
              event={event}
              relatedEvents={relatedEvents}
            />
          </div>

          {/* Related Events */}
          {relatedEvents.length > 0 && (
            <RelatedEvents events={relatedEvents} currentEventId={event.id} />
          )}
        </div>
      </div>
    </>
  );
}