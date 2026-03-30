/* eslint-disable @next/next/no-img-element */
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '../providers/AuthProvider';
import SearchBar from '../interactive/SearchBar';

export default function Header() {
    const { user, logout, openAuthModal } = useAuth();
    const pathname = usePathname();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navigation = [
        { name: 'Home', href: '/' },
        { name: 'Articles', href: '/blogs' },
        { name: 'Events', href: '/events' },
        { name: 'About', href: '/about' },
        { name: 'Contact', href: '/contacts' },
    ];

    const isActive = (href) => {
        if (href === '/') return pathname === href;
        return pathname.startsWith(href);
    };

    return (
        <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-200'
            : 'bg-white border-b border-gray-100'
            }`}>
            <nav className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        <span className="text-2xl">📸</span>
                        <span className="text-xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            Sanaa Thru My Lens
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-6">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`text-sm font-medium transition ${isActive(item.href)
                                    ? 'text-blue-600'
                                    : 'text-gray-700 hover:text-blue-600'
                                    }`}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>

                    {/* Search Bar - Desktop */}
                    <div className="hidden md:block w-80">
                        <SearchBar />
                    </div>

                    {/* Auth Section */}
                    <div className="hidden md:flex items-center gap-4">
                        {user ? (
                            <div className="relative group">
                                <button className="flex items-center gap-2 focus:outline-none">
                                    <img
                                        src={user.avatar_url || '/default-avatar.png'}
                                        alt={user.name}
                                        className="w-8 h-8 rounded-full object-cover border-2 border-gray-200"
                                    />
                                    <span className="text-sm font-medium text-gray-700">{user.name?.split(' ')[0]}</span>
                                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>

                                {/* Dropdown Menu */}
                                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                                    <div className="p-3 border-b border-gray-100">
                                        <p className="text-sm font-medium text-gray-900">{user.name}</p>
                                        <p className="text-xs text-gray-500">{user.email}</p>
                                    </div>
                                    <div className="py-2">
                                        <Link
                                            href="/profile"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                        >
                                            <span className="flex items-center gap-2">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                </svg>
                                                Profile
                                            </span>
                                        </Link>
                                        <Link
                                            href="/bookmarks"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                        >
                                            <span className="flex items-center gap-2">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                                                </svg>
                                                Bookmarks
                                            </span>
                                        </Link>
                                        {user.role === 'AUTHOR' && (
                                            <Link
                                                href="/dashboard"
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                            >
                                                <span className="flex items-center gap-2">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                                    </svg>
                                                    Dashboard
                                                </span>
                                            </Link>
                                        )}
                                        <button
                                            onClick={logout}
                                            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
                                        >
                                            <span className="flex items-center gap-2">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                                </svg>
                                                Sign Out
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => openAuthModal('login')}
                                    className="text-sm text-gray-700 hover:text-blue-600 transition"
                                >
                                    Sign In
                                </button>
                                <button
                                    onClick={() => openAuthModal('signup')}
                                    className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition"
                                >
                                    Get Started
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden p-2 rounded-lg hover:bg-gray-100"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {isMobileMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden py-4 border-t border-gray-100">
                        {/* Mobile Navigation */}
                        <div className="flex flex-col space-y-3 mb-4">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={`text-sm font-medium transition ${isActive(item.href)
                                        ? 'text-blue-600'
                                        : 'text-gray-700 hover:text-blue-600'
                                        }`}
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>

                        {/* Mobile Search */}
                        <div className="mb-4">
                            <SearchBar />
                        </div>

                        {/* Mobile Auth */}
                        {user ? (
                            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                                <div className="flex items-center gap-3">
                                    <img
                                        src={user.avatar_url || '/default-avatar.png'}
                                        alt={user.name}
                                        className="w-8 h-8 rounded-full"
                                    />
                                    <span className="text-sm font-medium">{user.name}</span>
                                </div>
                                <button
                                    onClick={() => {
                                        logout();
                                        setIsMobileMenuOpen(false);
                                    }}
                                    className="text-sm text-red-600"
                                >
                                    Sign Out
                                </button>
                            </div>
                        ) : (
                            <div className="flex gap-3 pt-3 border-t border-gray-100">
                                <button
                                    onClick={() => {
                                        openAuthModal('login');
                                        setIsMobileMenuOpen(false);
                                    }}
                                    className="flex-1 px-4 py-2 text-center text-sm text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
                                >
                                    Sign In
                                </button>
                                <button
                                    onClick={() => {
                                        openAuthModal('signup');
                                        setIsMobileMenuOpen(false);
                                    }}
                                    className="flex-1 px-4 py-2 text-center text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                >
                                    Sign Up
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </nav>
        </header>
    );
}