'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      {/* Hero Section */}
      <div className="bg-linear-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-8xl sm:text-9xl font-bold mb-4 opacity-80">500</h1>
          <p className="text-2xl sm:text-3xl font-semibold mb-2">
            Something went wrong
          </p>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto">
            An unexpected error occurred. Our team has been notified.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 flex-1 flex flex-col justify-center">
        {/* Error Details */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            Error Details
          </h2>
          {error?.message && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
              <p className="text-sm text-red-700 font-mono break-words">
                {error.message}
              </p>
            </div>
          )}
          <p className="text-gray-600 mb-6">
            This is an internal error. Please try again or navigate back to the homepage.
          </p>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={reset}
              className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
            >
              Try Again
            </button>
            <Link
              href="/"
              className="px-6 py-2.5 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-medium"
            >
              Go Home
            </Link>
          </div>
        </div>

        {/* Help Links */}
        <div className="bg-linear-to-r from-blue-50 to-purple-50 rounded-xl p-6 text-center">
          <p className="text-sm text-gray-600">
            If this problem persists, please{' '}
            <Link href="/contacts" className="text-blue-600 hover:text-blue-800 font-medium">
              contact us
            </Link>{' '}
            or visit our{' '}
            <Link href="/faq" className="text-blue-600 hover:text-blue-800 font-medium">
              FAQ page
            </Link>{' '}
            for help.
          </p>
        </div>
      </div>
    </div>
  );
}
