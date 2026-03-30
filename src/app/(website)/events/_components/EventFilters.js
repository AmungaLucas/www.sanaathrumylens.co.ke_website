'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function EventFilters({ locations, months, currentType, currentLocation, currentMonth }) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [showFilters, setShowFilters] = useState(false);

    const handleFilter = (type, value) => {
        const params = new URLSearchParams(searchParams);

        if (type === 'type') {
            if (value === currentType) {
                params.delete('type');
            } else {
                params.set('type', value);
            }
            params.delete('page');
        } else if (type === 'location') {
            if (value === currentLocation) {
                params.delete('location');
            } else {
                params.set('location', value);
            }
            params.delete('page');
        } else if (type === 'month') {
            if (value === currentMonth) {
                params.delete('month');
            } else {
                params.set('month', value);
            }
            params.delete('page');
        }

        router.push(`/events?${params.toString()}`);
    };

    const clearFilters = () => {
        router.push('/events');
    };

    const hasActiveFilters = currentType || currentLocation || currentMonth;

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 mb-8">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <h3 className="font-semibold text-gray-900">Filter Events</h3>
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="text-sm text-blue-600 hover:text-blue-800 lg:hidden"
                    >
                        {showFilters ? 'Hide' : 'Show'} filters
                    </button>
                </div>
                {hasActiveFilters && (
                    <button
                        onClick={clearFilters}
                        className="text-sm text-blue-600 hover:text-blue-800"
                    >
                        Clear all
                    </button>
                )}
            </div>

            <div className={`space-y-4 ${showFilters ? 'block' : 'hidden lg:block'}`}>
                {/* Event Type Filter */}
                <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Event Type</h4>
                    <div className="flex gap-2">
                        <button
                            onClick={() => handleFilter('type', 'online')}
                            className={`px-3 py-1.5 rounded-full text-sm transition ${currentType === 'online'
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            Online
                        </button>
                        <button
                            onClick={() => handleFilter('type', 'inperson')}
                            className={`px-3 py-1.5 rounded-full text-sm transition ${currentType === 'inperson'
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            In-Person
                        </button>
                    </div>
                </div>

                {/* Location Filter */}
                {locations && locations.length > 0 && (
                    <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Location</h4>
                        <div className="flex flex-wrap gap-2">
                            {locations.slice(0, 8).map((loc) => (
                                <button
                                    key={loc.location}
                                    onClick={() => handleFilter('location', loc.location)}
                                    className={`px-3 py-1.5 rounded-full text-sm transition ${currentLocation === loc.location
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                >
                                    {loc.location}
                                    <span className="ml-1 text-xs opacity-75">({loc.event_count})</span>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Month Filter */}
                {months && months.length > 0 && (
                    <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Month</h4>
                        <div className="flex flex-wrap gap-2">
                            {months.map((month) => (
                                <button
                                    key={`${month.year}-${month.month}`}
                                    onClick={() => handleFilter('month', month.month)}
                                    className={`px-3 py-1.5 rounded-full text-sm transition ${currentMonth === month.month
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                >
                                    {month.label}
                                    <span className="ml-1 text-xs opacity-75">({month.event_count})</span>
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Active Filters Display */}
            {hasActiveFilters && (
                <div className="mt-4 pt-3 border-t border-gray-100">
                    <p className="text-sm text-gray-500 mb-2">Active filters:</p>
                    <div className="flex flex-wrap gap-2">
                        {currentType && (
                            <span className="px-2 py-1 bg-blue-100 text-blue-700 text-sm rounded">
                                {currentType === 'online' ? 'Online' : 'In-Person'}
                                <button
                                    onClick={() => handleFilter('type', currentType)}
                                    className="ml-2 text-blue-500 hover:text-blue-700"
                                >
                                    ×
                                </button>
                            </span>
                        )}
                        {currentLocation && (
                            <span className="px-2 py-1 bg-blue-100 text-blue-700 text-sm rounded">
                                {currentLocation}
                                <button
                                    onClick={() => handleFilter('location', currentLocation)}
                                    className="ml-2 text-blue-500 hover:text-blue-700"
                                >
                                    ×
                                </button>
                            </span>
                        )}
                        {currentMonth && months.find(m => m.month === currentMonth) && (
                            <span className="px-2 py-1 bg-blue-100 text-blue-700 text-sm rounded">
                                {months.find(m => m.month === currentMonth).label}
                                <button
                                    onClick={() => handleFilter('month', currentMonth)}
                                    className="ml-2 text-blue-500 hover:text-blue-700"
                                >
                                    ×
                                </button>
                            </span>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}