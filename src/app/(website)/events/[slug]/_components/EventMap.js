'use client';

import { useEffect, useRef } from 'react';

export default function EventMap({ location }) {
    const mapRef = useRef(null);

    useEffect(() => {
        // Load Google Maps script
        if (typeof window !== 'undefined' && !window.google) {
            const script = document.createElement('script');
            script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`;
            script.async = true;
            script.defer = true;
            script.onload = initMap;
            document.head.appendChild(script);
        } else if (window.google) {
            initMap();
        }

        function initMap() {
            if (!mapRef.current) return;

            const geocoder = new window.google.maps.Geocoder();
            geocoder.geocode({ address: location }, (results, status) => {
                if (status === 'OK') {
                    const map = new window.google.maps.Map(mapRef.current, {
                        center: results[0].geometry.location,
                        zoom: 15,
                        styles: [
                            {
                                featureType: 'poi',
                                elementType: 'labels',
                                stylers: [{ visibility: 'off' }],
                            },
                        ],
                    });

                    new window.google.maps.Marker({
                        map,
                        position: results[0].geometry.location,
                        title: location,
                    });
                }
            });
        }
    }, [location]);

    return (
        <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Location</h2>
            <div
                ref={mapRef}
                className="w-full h-96 rounded-xl overflow-hidden shadow-md"
                style={{ backgroundColor: '#e5e7eb' }}
            />
            <p className="text-sm text-gray-500 mt-2">
                {location}
            </p>
        </div>
    );
}