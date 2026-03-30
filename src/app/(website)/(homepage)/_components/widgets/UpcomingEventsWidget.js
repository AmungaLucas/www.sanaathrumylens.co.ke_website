/* eslint-disable @next/next/no-img-element */
export default function UpcomingEventsWidget({ events }) {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <div className="flex items-center gap-2 mb-4">
                <span className="text-xl">📅</span>
                <h3 className="text-lg font-semibold text-gray-900">
                    Upcoming Events
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
                                <div className="flex items-center gap-1 mt-1 text-xs text-gray-500">
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    <span>{new Date(event.event_date).toLocaleDateString()}</span>
                                </div>
                                {event.location_name && (
                                    <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        {event.location_name}
                                    </p>
                                )}
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