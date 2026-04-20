/* eslint-disable @next/next/no-img-element */
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import GoogleAd from '@/components/ui/GoogleAd';

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ bookmarks: 0, likes: 0, comments: 0 });

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch('/api/auth/session');
        if (!res.ok) {
          router.push('/api/auth/signin');
          return;
        }
        const data = await res.json();
        if (!data.user) {
          router.push('/api/auth/signin');
          return;
        }
        setUser(data.user);

        // Fetch user stats
        const statsRes = await fetch('/api/user/stats');
        if (statsRes.ok) {
          const statsData = await statsRes.json();
          setStats({
            bookmarks: statsData.bookmarks || 0,
            likes: statsData.likes || 0,
            comments: statsData.comments || 0,
          });
        }
      } catch (error) {
        console.error('Error fetching user:', error);
        router.push('/api/auth/signin');
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, [router]);

  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="text-gray-500 text-sm">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-linear-to-r from-blue-600 to-purple-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">
            My Profile
          </h1>
          <p className="text-lg text-blue-100">
            Manage your account and preferences
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Main Content */}
          <div className="flex-1">
            {/* Profile Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                {/* Avatar */}
                <div className="relative">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-3xl font-bold overflow-hidden">
                    {user.image ? (
                      <img
                        src={user.image}
                        alt={user.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span>{user.name ? user.name.charAt(0).toUpperCase() : 'U'}</span>
                    )}
                  </div>
                </div>

                {/* User Info */}
                <div className="flex-1 text-center sm:text-left">
                  <h2 className="text-2xl font-bold text-gray-900 mb-1">
                    {user.name || 'Unnamed User'}
                  </h2>
                  <p className="text-gray-600 mb-2">{user.email}</p>
                  {user.bio ? (
                    <p className="text-gray-700 leading-relaxed">{user.bio}</p>
                  ) : (
                    <p className="text-gray-400 italic">
                      No bio yet.{' '}
                      <button className="text-blue-600 hover:text-blue-800 font-medium">
                        Add a bio
                      </button>
                    </p>
                  )}
                  <div className="mt-4 flex flex-wrap gap-2 justify-center sm:justify-start">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full">
                      Reader
                    </span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                      Member since 2024
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <Link href="/bookmarks" className="block">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center hover:border-blue-300 hover:shadow-md transition">
                  <div className="text-3xl mb-2">🔖</div>
                  <div className="text-3xl font-bold text-blue-600 mb-1">{stats.bookmarks}</div>
                  <div className="text-sm text-gray-600">Bookmarked Articles</div>
                </div>
              </Link>
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
                <div className="text-3xl mb-2">❤️</div>
                <div className="text-3xl font-bold text-blue-600 mb-1">{stats.likes}</div>
                <div className="text-sm text-gray-600">Liked Articles</div>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
                <div className="text-3xl mb-2">💬</div>
                <div className="text-3xl font-bold text-blue-600 mb-1">{stats.comments}</div>
                <div className="text-sm text-gray-600">Comments</div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h3>
              <div className="text-center py-8">
                <div className="text-4xl mb-3">📋</div>
                <p className="text-gray-600 mb-2">No recent activity yet</p>
                <p className="text-sm text-gray-500 mb-4">
                  Start exploring articles and engaging with the community
                </p>
                <Link
                  href="/blogs"
                  className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-medium"
                >
                  Browse Articles
                </Link>
              </div>
            </div>

            {/* Account Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Account Settings</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 transition border border-gray-100">
                  <div className="flex items-center gap-3">
                    <span className="text-lg">✏️</span>
                    <div className="text-left">
                      <span className="font-medium text-gray-900 block">Edit Profile</span>
                      <span className="text-xs text-gray-500">Update your name, bio, and avatar</span>
                    </div>
                  </div>
                  <span className="text-gray-400">→</span>
                </button>
                <button className="w-full flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 transition border border-gray-100">
                  <div className="flex items-center gap-3">
                    <span className="text-lg">📧</span>
                    <div className="text-left">
                      <span className="font-medium text-gray-900 block">Email Notifications</span>
                      <span className="text-xs text-gray-500">Manage your notification preferences</span>
                    </div>
                  </div>
                  <span className="text-gray-400">→</span>
                </button>
                <button className="w-full flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 transition border border-gray-100">
                  <div className="flex items-center gap-3">
                    <span className="text-lg">🔒</span>
                    <div className="text-left">
                      <span className="font-medium text-gray-900 block">Change Password</span>
                      <span className="text-xs text-gray-500">Update your account password</span>
                    </div>
                  </div>
                  <span className="text-gray-400">→</span>
                </button>
                <Link
                  href="/bookmarks"
                  className="w-full flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 transition border border-gray-100"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">🔖</span>
                    <div className="text-left">
                      <span className="font-medium text-gray-900 block">My Bookmarks</span>
                      <span className="text-xs text-gray-500">View your saved articles</span>
                    </div>
                  </div>
                  <span className="text-gray-400">→</span>
                </Link>
                <button className="w-full flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 transition border border-gray-100 text-red-600">
                  <div className="flex items-center gap-3">
                    <span className="text-lg">🚪</span>
                    <div className="text-left">
                      <span className="font-medium block">Sign Out</span>
                      <span className="text-xs text-gray-400">Log out of your account</span>
                    </div>
                  </div>
                  <span className="text-red-300">→</span>
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="w-full lg:w-80 space-y-6">
            {/* Ad */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden sticky top-24">
              <div className="p-3 bg-gray-50 border-b border-gray-100">
                <p className="text-xs text-gray-400 text-center">Sponsored</p>
              </div>
              <div className="p-4">
                <GoogleAd slot="profile-sidebar" format="rectangle" style={{ minHeight: '250px' }} />
              </div>
            </div>

            {/* Become an Author CTA */}
            <div className="bg-linear-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white text-center">
              <div className="text-3xl mb-3">✍️</div>
              <h3 className="text-lg font-semibold mb-2">Become a Contributor</h3>
              <p className="text-sm text-blue-100 mb-4">
                Share your expertise with our community
              </p>
              <Link
                href="/become-author"
                className="inline-block px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition text-sm font-medium"
              >
                Apply Now →
              </Link>
            </div>

            {/* Quick Links */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <h3 className="font-semibold text-gray-900 mb-4">Quick Links</h3>
              <div className="space-y-2">
                <Link href="/bookmarks" className="block p-3 rounded-lg hover:bg-gray-50 text-gray-700 hover:text-blue-600 transition">
                  <span className="font-medium">My Bookmarks</span>
                  <p className="text-xs text-gray-500 mt-0.5">View saved articles</p>
                </Link>
                <Link href="/blogs" className="block p-3 rounded-lg hover:bg-gray-50 text-gray-700 hover:text-blue-600 transition">
                  <span className="font-medium">Browse Articles</span>
                  <p className="text-xs text-gray-500 mt-0.5">Discover new content</p>
                </Link>
                <Link href="/events" className="block p-3 rounded-lg hover:bg-gray-50 text-gray-700 hover:text-blue-600 transition">
                  <span className="font-medium">Upcoming Events</span>
                  <p className="text-xs text-gray-500 mt-0.5">See what&apos;s happening</p>
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
