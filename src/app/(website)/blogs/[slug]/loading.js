export default function Loading() {
  return (
    <div className="bg-gray-50 min-h-screen animate-pulse">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Main Content Skeleton */}
          <div className="flex-1">
            {/* Categories Skeleton */}
            <div className="flex gap-2 mb-4">
              {[1, 2].map((i) => (
                <div key={i} className="h-6 w-16 bg-gray-200 rounded" />
              ))}
            </div>

            {/* Title Skeleton */}
            <div className="h-12 bg-gray-200 rounded w-3/4 mb-4" />

            {/* Author Skeleton */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gray-200 rounded-full" />
              <div>
                <div className="h-4 bg-gray-200 rounded w-32 mb-2" />
                <div className="h-3 bg-gray-200 rounded w-48" />
              </div>
            </div>

            {/* Featured Image Skeleton */}
            <div className="h-96 bg-gray-200 rounded-xl mb-8" />

            {/* Content Skeleton */}
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-4 bg-gray-200 rounded w-full" />
              ))}
              <div className="h-4 bg-gray-200 rounded w-3/4" />
            </div>
          </div>

          {/* Sidebar Skeleton */}
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