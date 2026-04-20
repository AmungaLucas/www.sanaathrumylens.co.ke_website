export default function Loading() {
    return (
        <div className="bg-gray-50 min-h-screen animate-pulse">
            {/* Category Header Skeleton */}
            <div className="bg-linear-to-r from-blue-600 to-purple-600 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    {/* Breadcrumb skeleton */}
                    <div className="flex items-center gap-2 text-sm mb-4">
                        <div className="h-3 bg-white/20 rounded w-12" />
                        <div className="h-3 bg-white/20 rounded w-3" />
                        <div className="h-3 bg-white/20 rounded-16" />
                        <div className="h-3 bg-white/20 rounded w-3" />
                        <div className="h-3 bg-white/20 rounded w-20" />
                    </div>
                    <div className="flex items-start justify-between flex-wrap gap-4">
                        <div className="space-y-3">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-white/20 rounded" />
                                <div className="h-10 bg-white/20 rounded w-64" />
                            </div>
                            <div className="h-6 bg-white/20 rounded w-96 max-w-full" />
                            <div className="h-5 bg-white/20 rounded w-32" />
                        </div>
                        <div className="h-10 w-28 bg-white/20 rounded-lg" />
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Main Content Skeleton */}
                    <div className="flex-1 min-w-0">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                                <div key={i} className="space-y-3">
                                    <div className="h-48 bg-gray-200 rounded-xl" />
                                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                                    <div className="h-3 bg-gray-200 rounded w-full" />
                                    <div className="h-3 bg-gray-200 rounded w-2/3" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Sidebar Skeleton */}
                    <aside className="w-full lg:w-80 space-y-6">
                        {/* Ad skeleton */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="h-8 bg-gray-100 border-b border-gray-100" />
                            <div className="h-64 bg-gray-200" />
                        </div>
                        {/* Newsletter skeleton */}
                        <div className="h-44 bg-gray-200 rounded-xl" />
                        {/* Recent stories skeleton */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 space-y-3">
                            <div className="h-5 bg-gray-200 rounded w-32" />
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex gap-3">
                                    <div className="w-16 h-16 bg-gray-200 rounded-lg flex-shrink-0" />
                                    <div className="flex-1 space-y-2">
                                        <div className="h-3 bg-gray-200 rounded w-full" />
                                        <div className="h-3 bg-gray-200 rounded w-2/3" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
}
