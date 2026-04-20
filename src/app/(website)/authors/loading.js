export default function Loading() {
    return (
        <div className="bg-gray-50 min-h-screen animate-pulse">
            {/* Hero Skeleton */}
            <div className="bg-linear-to-r from-blue-600 to-purple-600 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
                    <div className="h-10 bg-white/20 rounded w-64 mx-auto mb-3" />
                    <div className="h-6 bg-white/20 rounded w-96 mx-auto" />
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Main Content Skeleton */}
                    <div className="flex-1">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                                <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                                    {/* Cover image skeleton */}
                                    <div className="h-32 bg-gray-200" />
                                    <div className="p-6 pt-12 space-y-3">
                                        {/* Avatar skeleton */}
                                        <div className="w-16 h-16 bg-gray-200 rounded-full -mt-10 border-4 border-white" />
                                        {/* Name skeleton */}
                                        <div className="h-5 bg-gray-200 rounded w-3/4" />
                                        {/* Title skeleton */}
                                        <div className="h-4 bg-gray-200 rounded w-1/2" />
                                        {/* Bio skeleton */}
                                        <div className="h-3 bg-gray-200 rounded w-full" />
                                        <div className="h-3 bg-gray-200 rounded w-2/3" />
                                        {/* Stats skeleton */}
                                        <div className="flex items-center gap-4 pt-3 border-t border-gray-100">
                                            <div className="h-3 bg-gray-200 rounded w-16" />
                                            <div className="h-3 bg-gray-200 rounded w-16" />
                                        </div>
                                    </div>
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
                        {/* CTA skeleton */}
                        <div className="h-48 bg-gray-200 rounded-xl" />
                    </aside>
                </div>
            </div>
        </div>
    );
}
