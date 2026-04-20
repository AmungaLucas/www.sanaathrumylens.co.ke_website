export default function Loading() {
    return (
        <div className="bg-gray-50 min-h-screen animate-pulse">
            {/* Author Header Skeleton */}
            <div className="bg-linear-to-r from-blue-600 to-purple-600 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                        {/* Avatar skeleton */}
                        <div className="w-32 h-32 bg-white/20 rounded-full flex-shrink-0" />
                        {/* Info skeleton */}
                        <div className="text-center md:text-left flex-1 space-y-3">
                            <div className="h-8 bg-white/20 rounded w-48 mx-auto md:mx-0" />
                            <div className="h-6 bg-white/20 rounded w-64 mx-auto md:mx-0" />
                            <div className="h-5 bg-white/20 rounded w-40 mx-auto md:mx-0" />
                            <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 mt-4">
                                <div className="h-4 bg-white/20 rounded w-24" />
                                <div className="h-4 bg-white/20 rounded w-24" />
                                <div className="h-4 bg-white/20 rounded w-24" />
                                <div className="h-4 bg-white/20 rounded w-24" />
                            </div>
                            <div className="h-10 w-32 bg-white/20 rounded-lg mx-auto md:mx-0 mt-2" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Main Content Skeleton */}
                    <div className="flex-1 space-y-6">
                        {/* About skeleton */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-3">
                            <div className="h-6 bg-gray-200 rounded w-24" />
                            <div className="h-4 bg-gray-200 rounded w-full" />
                            <div className="h-4 bg-gray-200 rounded w-full" />
                            <div className="h-4 bg-gray-200 rounded w-2/3" />
                        </div>

                        {/* Expertise skeleton */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-3">
                            <div className="h-6 bg-gray-200 rounded w-24" />
                            <div className="flex flex-wrap gap-2">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="h-8 w-24 bg-gray-200 rounded-full" />
                                ))}
                            </div>
                        </div>

                        {/* Articles skeleton */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-4">
                            <div className="h-6 bg-gray-200 rounded w-40" />
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {[1, 2, 3, 4, 5, 6].map((i) => (
                                    <div key={i} className="space-y-3">
                                        <div className="h-40 bg-gray-200 rounded-xl" />
                                        <div className="h-4 bg-gray-200 rounded w-3/4" />
                                        <div className="h-3 bg-gray-200 rounded w-full" />
                                        <div className="h-3 bg-gray-200 rounded w-1/2" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar Skeleton */}
                    <aside className="w-full lg:w-80 space-y-6">
                        {/* Ad skeleton */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="h-8 bg-gray-100 border-b border-gray-100" />
                            <div className="h-64 bg-gray-200" />
                        </div>
                        {/* Social links skeleton */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 space-y-3">
                            <div className="h-5 bg-gray-200 rounded w-20" />
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="h-4 bg-gray-200 rounded w-full" />
                            ))}
                        </div>
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
