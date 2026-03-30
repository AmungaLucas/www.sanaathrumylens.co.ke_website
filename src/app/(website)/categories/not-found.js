import Link from 'next/link';

export default function CategoryNotFound() {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="text-center max-w-md mx-auto px-4">
                <div className="text-6xl mb-4">🔍</div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    Category Not Found
                </h1>
                <p className="text-gray-600 mb-6">
                    The category you&apos;re looking for doesn&apos;t exist.
                </p>
                <div className="flex gap-4 justify-center">
                    <Link
                        href="/categories"
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                        Browse Categories
                    </Link>
                    <Link
                        href="/"
                        className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
                    >
                        Go Home
                    </Link>
                </div>
            </div>
        </div>
    );
}