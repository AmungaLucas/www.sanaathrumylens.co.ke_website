import { getFeaturedEvents } from '@/lib/queries';

export default async function FeaturedEventsWidget() {
    const events = await getFeaturedEvents(3);

    if (!events || events.length === 0) return null;

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <div className="flex items-center gap-2 mb-4">
                <span className="text-xl">⭐</span>
                <h3 className="text-lg font-semibold text-gray-900">
                    Featured Events
                </h3>
            </div>

            <div className="space-y-4">
                {events.map((event) => (
                    <a
                        key={event.id}
                        href={`/events/${event.slug}`}
                        className="block group"
                    >
                        <div className="flex gap-3">
                            {event.featured_image && (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img
                                    src={event.featured_image}
                                    alt={event.title}
                                    className="w-16 h-16 object-cover rounded-lg"
                                />
                            )}
                            <div className="flex-1">
                                <h4 className="text-sm font-medium text-gray-900 group-hover:text-blue-600 line-clamp-2">
                                    {event.title}
                                </h4>
                                <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                                    <span>{new Date(event.start_date).toLocaleDateString()}</span>
                                    <span>•</span>
                                    <span>{event.attendees_count || 0} attending</span>
                                </div>
                            </div>
                        </div>
                    </a>
                ))}
            </div>

            <div className="mt-4 pt-3 border-t border-gray-100">
                <a href="/events" className="text-sm text-blue-600 hover:text-blue-800">
                    View all events →
                </a>
            </div>
        </div>
    );
}