import Image from 'next/image';
export default function RelatedEvents({ events, currentEventId }) {
    const filteredEvents = events.filter(e => e.id !== currentEventId);

    if (filteredEvents.length === 0) return null;

    return (
        <div className="mt-12 pt-8 border-t border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
                More Events You Might Like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEvents.slice(0, 3).map((event) => (
                    <a
                        key={event.id}
                        href={`/events/${event.slug}`}
                        className="group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition"
                    >
                        {event.featured_image && (
                            <div className="relative h-40 overflow-hidden">
                                <Image
                                    src={event.featured_image}
                                    alt={event.title}
                                    fill
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                        )}
                        <div className="p-4">
                            <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                                <span>{new Date(event.start_date).toLocaleDateString()}</span>
                                <span>•</span>
                                <span>{event.is_online ? 'Online' : event.location}</span>
                            </div>
                            <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 line-clamp-2">
                                {event.title}
                            </h3>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
}
