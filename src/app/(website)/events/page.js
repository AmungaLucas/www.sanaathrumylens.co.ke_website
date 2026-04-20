import { Suspense } from 'react';
import {
  getAllEvents,
  countAllEvents,
  getEventLocations,
  getEventMonths
} from '@/lib/queries';
import EventFilters from './_components/EventFilters';
import EventCard from './_components/EventCard';
import EventPagination from './_components/EventPagination';
import GoogleAd from '@/components/ui/GoogleAd';


// Import widgets
import FeaturedEventsWidget from './_components/FeaturedEventsWidget';
import UpcomingEventsWidget from './_components/UpcomingEventsWidget';
import NewsletterWidget from '@/app/(website)/(homepage)/_components/widgets/NewsletterWidget';

// SEO Metadata
export const metadata = {
  title: "Events - Sanaa Thru My Lens",
  description: "Discover creative events, workshops, exhibitions, and gatherings in Kenya's creative ecosystem",
  keywords: "kenya events, creative workshops, architecture events, design exhibitions, nairobi events",
  alternates: {
    canonical: 'https://www.sanaathrumylens.co.ke/events',
  },
};

export default async function EventsPage({ searchParams }) {
  const page = parseInt(searchParams.page) || 1;
  const eventType = searchParams.type || null;
  const location = searchParams.location || null;
  const month = searchParams.month ? parseInt(searchParams.month) : null;
  const limit = 12;
  const offset = (page - 1) * limit;

  const filters = { eventType, location, month };

  // Fetch data in parallel
  const [events, totalEvents, locations, months] = await Promise.all([
    getAllEvents(limit, offset, filters),
    countAllEvents(filters),
    getEventLocations(),
    getEventMonths()
  ]);

  const totalPages = Math.ceil(totalEvents / limit);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-linear-to-r from-green-600 to-blue-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">
            Events & Gatherings
          </h1>
          <p className="text-lg text-green-100 max-w-2xl">
            Discover creative events, workshops, exhibitions, and networking opportunities in Kenya
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Filters */}
            <EventFilters
              locations={locations}
              months={months}
              currentType={eventType}
              currentLocation={location}
              currentMonth={month}
            />

            {/* Events Grid */}
            {events.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {events.map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <EventPagination
                    currentPage={page}
                    totalPages={totalPages}
                    filters={{ eventType, location, month }}
                  />
                )}
              </>
            ) : (
              <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="text-6xl mb-4">📅</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No events found
                </h3>
                <p className="text-gray-500">
                  Try adjusting your filters or check back later for upcoming events.
                </p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="w-full lg:w-80 space-y-6">
            {/* Ad Position 1: Sidebar Top */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-3 bg-gray-50 border-b border-gray-100">
                <p className="text-xs text-gray-400 text-center">Sponsored</p>
              </div>
              <div className="p-4">
                <GoogleAd slot="events-sidebar-top" format="rectangle" style={{ minHeight: '250px' }} />
              </div>
            </div>

            {/* Featured Events Widget */}
            <FeaturedEventsWidget />

            {/* Upcoming Events Widget */}
            <UpcomingEventsWidget />

            {/* Ad Position 2: Sidebar Middle */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-3 bg-gray-50 border-b border-gray-100">
                <p className="text-xs text-gray-400 text-center">Advertisement</p>
              </div>
              <div className="p-4">
                <GoogleAd slot="events-sidebar-middle" format="rectangle" style={{ minHeight: '250px' }} />
              </div>
            </div>

            {/* Newsletter */}
            <div className="bg-linear-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
              <h3 className="text-lg font-semibold mb-2">Never Miss an Event</h3>
              <p className="text-sm text-blue-100 mb-4">
                Subscribe to get event notifications
              </p>
              <NewsletterWidget />
            </div>

            {/* Ad Position 3: Sidebar Bottom */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden sticky top-6">
              <div className="p-3 bg-gray-50 border-b border-gray-100">
                <p className="text-xs text-gray-400 text-center">Advertisement</p>
              </div>
              <div className="p-4">
                <GoogleAd slot="events-sidebar-bottom" format="rectangle" style={{ minHeight: '250px' }} />
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

