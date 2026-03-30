export default function Loading() {
    return (
        <div className="bg-gray-50 min-h-screen animate-pulse">
            <div className="bg-linear-to-r from-green-600 to-blue-600 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="h-10 bg-white/20 rounded w-64 mb-3" />
                    <div className="h-6 bg-white/20 rounded w-96" />
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    <div className="flex-1">
                        <div className="bg-white rounded-xl p-5 mb-8">
                            <div className="h-6 bg-gray-200 rounded w-32 mb-4" />
                            <div className="flex gap-2">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="h-8 bg-gray-200 rounded-full w-20" />
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                                <div key={i} className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                                    <div className="h-48 bg-gray-200" />
                                    <div className="p-5 space-y-3">
                                        <div className="h-4 bg-gray-200 rounded w-3/4" />
                                        <div className="h-6 bg-gray-200 rounded w-full" />
                                        <div className="h-4 bg-gray-200 rounded w-full" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="w-full lg:w-80 space-y-6">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="bg-white rounded-xl border border-gray-100 p-5">
                                <div className="h-6 bg-gray-200 rounded w-32 mb-4" />
                                {[1, 2, 3].map((j) => (
                                    <div key={j} className="h-4 bg-gray-200 rounded w-full mb-3" />
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}