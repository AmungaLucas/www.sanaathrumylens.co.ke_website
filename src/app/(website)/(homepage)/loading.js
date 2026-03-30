export default function Loading() {
    return (
        <div className="animate-pulse">
            {/* Hero Skeleton */}
            <div className="h-[70vh] bg-gray-200" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
                {/* Trending Skeleton */}
                <div className="mb-12">
                    <div className="h-8 w-48 bg-gray-200 rounded mb-6" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="space-y-2">
                                <div className="h-32 bg-gray-200 rounded" />
                                <div className="h-4 bg-gray-200 rounded w-3/4" />
                                <div className="h-3 bg-gray-200 rounded w-1/2" />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Main Content Skeleton */}
                    <div className="flex-1">
                        <div className="h-8 w-64 bg-gray-200 rounded mb-6" />
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[...Array(6)].map((_, i) => (
                                <div key={i} className="space-y-3">
                                    <div className="h-48 bg-gray-200 rounded" />
                                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                                    <div className="h-3 bg-gray-200 rounded w-full" />
                                    <div className="h-3 bg-gray-200 rounded w-2/3" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Sidebar Skeleton */}
                    <div className="w-full lg:w-80 space-y-6">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="bg-white rounded-xl border border-gray-100 p-5 space-y-3">
                                <div className="h-6 w-32 bg-gray-200 rounded" />
                                <div className="h-10 bg-gray-200 rounded" />
                                <div className="h-4 bg-gray-200 rounded w-full" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}