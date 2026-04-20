export default function EventHeader({ event }) {
    const formatDateRange = () => {
        const start = new Date(event.start_date);
        const end = event.end_date ? new Date(event.end_date) : null;

        const options = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };

        if (end && end.toDateString() !== start.toDateString()) {
            return `${start.toLocaleDateString('en-US', options)} - ${end.toLocaleDateString('en-US', options)}`;
        }

        return start.toLocaleDateString('en-US', options);
    };

    const formatTime = () => {
        const start = new Date(event.start_date);
        const end = event.end_date ? new Date(event.end_date) : null;

        const timeOptions = { hour: 'numeric', minute: '2-digit', hour12: true };

        if (end && end.toDateString() === start.toDateString()) {
            return `${start.toLocaleTimeString('en-US', timeOptions)} - ${end.toLocaleTimeString('en-US', timeOptions)}`;
        }

        return start.toLocaleTimeString('en-US', timeOptions);
    };

    const getStatusBadge = () => {
        const eventDate = new Date(event.start_date);
        const now = new Date();

        if (eventDate < now) {
            return { text: 'Past Event', color: 'bg-gray-500' };
        }
        if (eventDate.toDateString() === now.toDateString()) {
            return { text: 'Today', color: 'bg-red-500 animate-pulse' };
        }
        return { text: 'Upcoming', color: 'bg-green-500' };
    };

    const status = getStatusBadge();

    return (
        <header className="mb-8">
            {/* Status Badge */}
            <div className="mb-4">
                <span className={`px-3 py-1 ${status.color} text-white text-sm rounded-full`}>
                    {status.text}
                </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                {event.title}
            </h1>

            {/* Event Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6 pb-6 border-b border-gray-200">
                {/* Date */}
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <div>
                        <p className="text-xs text-gray-500">Date</p>
                        <p className="text-sm font-medium text-gray-900">{formatDateRange()}</p>
                        <p className="text-xs text-gray-500">{formatTime()}</p>
                    </div>
                </div>

                {/* Location */}
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    </div>
                    <div>
                        <p className="text-xs text-gray-500">Location</p>
                        <p className="text-sm font-medium text-gray-900">
                            {event.is_online ? 'Online Event' : event.location || 'TBD'}
                        </p>
                        {event.is_online && event.online_url && (
                            <a
                                href={event.online_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs text-blue-600 hover:text-blue-800"
                            >
                                Join link →
                            </a>
                        )}
                    </div>
                </div>

                {/* Capacity */}
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                    </div>
                    <div>
                        <p className="text-xs text-gray-500">Attendees</p>
                        <p className="text-sm font-medium text-gray-900">
                            {event.attendees_count || 0} / {event.capacity || 'Unlimited'}
                        </p>
                        {event.capacity && event.attendees_count >= event.capacity * 0.8 && (
                            <p className="text-xs text-orange-600">Limited spots remaining!</p>
                        )}
                    </div>
                </div>

                {/* Organizer */}
                {event.organizer_name && (
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                            <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-xs text-gray-500">Organizer</p>
                            <p className="text-sm font-medium text-gray-900">{event.organizer_name}</p>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
}