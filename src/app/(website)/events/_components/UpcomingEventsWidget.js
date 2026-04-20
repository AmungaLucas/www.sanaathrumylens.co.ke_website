import { getUpcomingEvents } from '@/lib/queries';

export default async function UpcomingEventsWidget() {
    const events = await getUpcomingEvents(5);

    if (!events || events.length === 0) return null;

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <div className="flex items-center gap-2 mb-4">
                <span className="text-xl">📅</span>
                <h3 className="text-lg font-semibold text-gray-900">
                    Upcoming Events
                </h3>
            </div>

            <div className="space-y-3">
                {events.map((event) => (
                    <a
                        key={event.id}
                        href={`/events/${event.slug}`}
                        className="block group"
                    >
                        <div className="flex items-start gap-3">
                            <div className="shrink-0 text-center w-12">
                                <div className="bg-blue-50 rounded-lg p-1">
                                    <div className="text-xs font-bold text-blue-600">
                                        {new Date(event.start_date).toLocaleDateString('en-US', { month: 'short' })}
                                    </div>
                                    <div className="text-lg font-bold text-blue-600">
                                        {new Date(event.start_date).getDate()}
                                    </div>
                                </div>
                            </div>
                            <div className="flex-1">
                                <h4 className="text-sm font-medium text-gray-900 group-hover:text-blue-600 line-clamp-2">
                                    {event.title}
                                </h4>
                                <p className="text-xs text-gray-500 mt-1">
                                    {event.is_online ? 'Online' : event.location}
                                </p>
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