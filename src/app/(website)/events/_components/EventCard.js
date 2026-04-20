/* eslint-disable @next/next/no-img-element */
export default function EventCard({ event }) {
    const isPast = new Date(event.start_date) < new Date();
    const isToday = new Date(event.start_date).toDateString() === new Date().toDateString();

    const formatEventDate = (dateString) => {
        const date = new Date(dateString);
        const options = { month: 'short', day: 'numeric', year: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    };

    const getEventBadge = () => {
        if (isToday) {
            return { text: 'Today', color: 'bg-red-500' };
        }
        if (event.is_online) {
            return { text: 'Online', color: 'bg-blue-500' };
        }
        return { text: 'In-Person', color: 'bg-green-500' };
    };

    const badge = getEventBadge();

    return (
        <article className="group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300">
            {/* Featured Image */}
            {event.featured_image ? (
                <div className="relative h-48 overflow-hidden">
                    <img
                        src={event.featured_image}
                        alt={event.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3 flex gap-2">
                        <span className={`px-2 py-1 ${badge.color} text-white text-xs rounded-md`}>
                            {badge.text}
                        </span>
                        {event.attendees_count >= event.capacity * 0.8 && (
                            <span className="px-2 py-1 bg-orange-500 text-white text-xs rounded-md">
                                Almost Full
                            </span>
                        )}
                    </div>
                </div>
            ) : (
                <div className="h-48 bg-linear-to-br from-gray-700 to-gray-900 flex items-center justify-center">
                    <span className="text-4xl">📅</span>
                </div>
            )}

            <div className="p-5">
                {/* Date & Location */}
                <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
                    <div className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>{formatEventDate(event.start_date)}</span>
                    </div>
                    {event.location && !event.is_online && (
                        <div className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span className="truncate max-w-30">{event.location}</span>
                        </div>
                    )}
                    {event.is_online && (
                        <div className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                    d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.66 0 3-4 3-9s-1.34-9-3-9m0 18c-1.66 0-3-4-3-9s1.34-9 3-9m-9 9a9 9 0 019-9" />
                            </svg>
                            <span>Virtual</span>
                        </div>
                    )}
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                    <a href={`/events/${event.slug}`} className="hover:text-blue-600 transition">
                        {event.title}
                    </a>
                </h3>

                {/* Excerpt */}
                <p className="text-gray-600 mb-4 line-clamp-2">
                    {event.excerpt || 'Join us for this exciting creative event...'}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <span>{event.attendees_count || 0} attending</span>
                    </div>
                    <a
                        href={`/events/${event.slug}`}
                        className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
                    >
                        View Details
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </a>
                </div>
            </div>
        </article>
    );
}