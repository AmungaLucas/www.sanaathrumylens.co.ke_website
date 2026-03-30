/* eslint-disable @next/next/no-img-element */
'use client';

import Link from 'next/link';
import { useAuth } from '../providers/AuthProvider';
import SearchBar from '../interactive/SearchBar';

export default function Navbar() {
    const { user, logout, openAuthModal } = useAuth();

    return (
        <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link href="/" className="text-xl font-bold text-gray-900">
                        Sanaa Thru My Lens
                    </Link>

                    {/* Search Bar */}
                    <div className="hidden md:block w-96">
                        <SearchBar />
                    </div>

                    {/* Navigation Links */}
                    <div className="flex items-center gap-4">
                        <Link href="/blogs" className="text-gray-700 hover:text-blue-600">
                            Articles
                        </Link>
                        <Link href="/events" className="text-gray-700 hover:text-blue-600">
                            Events
                        </Link>

                        {/* Auth Section */}
                        {user ? (
                            <div className="relative group">
                                <button className="flex items-center gap-2">
                                    <img
                                        src={user.avatar_url || '/default-avatar.png'}
                                        alt={user.name}
                                        className="w-8 h-8 rounded-full object-cover"
                                    />
                                    <span className="text-sm font-medium">{user.name}</span>
                                </button>

                                {/* Dropdown */}
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                                    <Link
                                        href="/profile"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                    >
                                        Profile
                                    </Link>
                                    <Link
                                        href="/bookmarks"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                    >
                                        Bookmarks
                                    </Link>
                                    <button
                                        onClick={logout}
                                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
                                    >
                                        Sign Out
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <button
                                onClick={() => openAuthModal('login')}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                            >
                                Sign In
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}