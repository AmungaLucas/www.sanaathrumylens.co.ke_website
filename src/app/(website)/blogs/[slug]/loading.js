export default function Loading() {
  return (
    <div className="bg-gray-50 min-h-screen animate-pulse">
      {/* Hero skeleton */}
      <div className="w-full h-[70vh] min-h-[480px] max-h-[700px] bg-gradient-to-br from-gray-200 to-gray-300" />

      {/* Main content with sidebar skeleton */}
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-10 md:py-14">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-12">

          {/* Main Content Skeleton */}
          <div className="flex-1 min-w-0">
            {/* Content lines */}
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-4 bg-gray-200 rounded w-full" />
              ))}
              <div className="h-4 bg-gray-200 rounded w-3/4" />
            </div>

            {/* Author skeleton */}
            <div className="flex items-center gap-3 mt-10 pt-10 border-t border-gray-200">
              <div className="w-16 h-16 bg-gray-200 rounded-full" />
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded w-32 mb-2" />
                <div className="space-y-2">
                  <div className="h-3 bg-gray-200 rounded w-full" />
                  <div className="h-3 bg-gray-200 rounded w-2/3" />
                </div>
              </div>
            </div>

            {/* Comments skeleton */}
            <div className="mt-10 pt-10 border-t border-gray-200 space-y-6">
              <div className="h-6 bg-gray-200 rounded w-24 mb-6" />
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex gap-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex-shrink-0" />
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="h-4 bg-gray-200 rounded w-24" />
                      <div className="h-3 bg-gray-200 rounded w-16" />
                    </div>
                    <div className="space-y-1.5">
                      <div className="h-3 bg-gray-200 rounded w-full" />
                      <div className="h-3 bg-gray-200 rounded w-5/6" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Related articles skeleton */}
            <div className="mt-10 pt-10 border-t border-gray-200">
              <div className="h-6 bg-gray-200 rounded w-40 mb-6" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <div key={i}>
                    <div className="h-40 bg-gray-200 rounded-xl mb-3" />
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                    <div className="h-3 bg-gray-200 rounded w-full" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Skeleton (desktop only) */}
          <div className="hidden lg:block w-80 xl:w-96 flex-shrink-0">
            <div className="sticky top-24 space-y-6">
              {/* Newsletter skeleton */}
              <div className="h-44 bg-gray-200 rounded-2xl" />
              {/* Recent stories skeleton */}
              <div className="bg-white rounded-2xl border border-gray-100 p-5 space-y-4">
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
              {/* Categories skeleton */}
              <div className="bg-white rounded-2xl border border-gray-100 p-5">
                <div className="h-4 bg-gray-200 rounded w-24 mb-4" />
                <div className="flex flex-wrap gap-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-7 w-16 bg-gray-200 rounded-full" />
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
