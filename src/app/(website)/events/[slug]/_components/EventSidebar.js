import GoogleAd from '@/components/ui/GoogleAd';
import UpcomingEventsWidget from '../../_components/UpcomingEventsWidget';
import NewsletterWidget from '@/app/(website)/(homepage)/_components/widgets/NewsletterWidget';

export default function EventSidebar({ event, relatedEvents }) {
    const isPast = new Date(event.event_date) < new Date();

    return (
        <aside className="w-full lg:w-80 space-y-6">
            {/* Ad Position 1: Sidebar Top */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-3 bg-gray-50 border-b border-gray-100">
                    <p className="text-xs text-gray-400 text-center">Sponsored</p>
                </div>
                <div className="p-4">
                    <GoogleAd slot="event-sidebar-top" format="rectangle" style={{ minHeight: '250px' }} />
                </div>
            </div>

            {/* Event Details Quick Info */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                <h3 className="font-semibold text-gray-900 mb-4">Event Details</h3>
                <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Date</span>
                        <span className="text-gray-900">
                            {new Date(event.event_date).toLocaleDateString('en-US', {
                                month: 'long',
                                day: 'numeric',
                                year: 'numeric',
                            })}
                        </span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Time</span>
                        <span className="text-gray-900">
                            {new Date(event.event_date).toLocaleTimeString('en-US', {
                                hour: 'numeric',
                                minute: '2-digit',
                                hour12: true,
                            })}
                        </span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Format</span>
                        <span className="text-gray-900">
                            {event.is_online ? 'Online' : 'In-Person'}
                        </span>
                    </div>
                    {!event.is_online && event.location_name && (
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Location</span>
                            <span className="text-gray-900 text-right">{event.location_name}</span>
                        </div>
                    )}
                    {event.capacity && (
                        <div className="mt-2">
                            <div className="flex justify-between text-sm mb-1">
                                <span className="text-gray-500">Capacity</span>
                                <span className="text-gray-900">
                                    {event.attendees_count || 0} / {event.capacity}
                                </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                    className="bg-blue-600 rounded-full h-2"
                                    style={{
                                        width: `${((event.attendees_count || 0) / event.capacity) * 100}%`,
                                    }}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Upcoming Events Widget */}
            {!isPast && (
                <UpcomingEventsWidget />
            )}

            {/* Ad Position 2: Sidebar Middle */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-3 bg-gray-50 border-b border-gray-100">
                    <p className="text-xs text-gray-400 text-center">Advertisement</p>
                </div>
                <div className="p-4">
                    <GoogleAd slot="event-sidebar-middle" format="rectangle" style={{ minHeight: '250px' }} />
                </div>
            </div>

            {/* Newsletter */}
            <div className="bg-linear-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
                <h3 className="text-lg font-semibold mb-2">Never Miss an Event</h3>
                <p className="text-sm text-blue-100 mb-4">
                    Subscribe to get notified about upcoming events
                </p>
                <NewsletterWidget />
            </div>

            {/* Ad Position 3: Sidebar Bottom - Sticky */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden sticky top-6">
                <div className="p-3 bg-gray-50 border-b border-gray-100">
                    <p className="text-xs text-gray-400 text-center">Sponsored</p>
                </div>
                <div className="p-4">
                    <GoogleAd slot="event-sidebar-bottom" format="rectangle" style={{ minHeight: '250px' }} />
                </div>
            </div>
        </aside>
    );
}