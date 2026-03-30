'use client';

import { useState } from 'react';

export default function EventDetails({ event }) {
    const [isExpanded, setIsExpanded] = useState(false);

    const description = event.description || event.excerpt;
    const shouldTruncate = description?.length > 800;
    const truncatedDescription = shouldTruncate
        ? description.substring(0, 800) + '...'
        : description;

    return (
        <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Event</h2>

            <div className="text-gray-700 leading-relaxed">
                <div dangerouslySetInnerHTML={{
                    __html: isExpanded ? description : truncatedDescription
                }} />

                {shouldTruncate && (
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="text-blue-600 hover:text-blue-800 font-medium mt-2"
                    >
                        {isExpanded ? 'Show less' : 'Read more'}
                    </button>
                )}
            </div>

            {/* Additional Info */}
            {(event.online_url || event.organizer_email) && (
                <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <h3 className="font-semibold text-gray-900 mb-2">Additional Information</h3>
                    {event.online_url && (
                        <p className="text-sm mb-2">
                            <strong>Join Link:</strong>{' '}
                            <a
                                href={event.online_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:text-blue-800"
                            >
                                {event.online_url}
                            </a>
                        </p>
                    )}
                    {event.organizer_email && (
                        <p className="text-sm">
                            <strong>Contact:</strong>{' '}
                            <a
                                href={`mailto:${event.organizer_email}`}
                                className="text-blue-600 hover:text-blue-800"
                            >
                                {event.organizer_email}
                            </a>
                        </p>
                    )}
                </div>
            )}
        </div>
    );
}