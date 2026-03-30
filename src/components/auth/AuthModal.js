'use client';

import { useEffect } from 'react';
import { useAuth } from '../providers/AuthProvider';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import ResetPasswordForm from './ResetPasswordForm';

export default function AuthModal() {
    const { showAuthModal, closeAuthModal, authModalTab, setAuthModalTab, executeAuthCallback } = useAuth();

    // Close on escape key
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') closeAuthModal();
        };
        if (showAuthModal) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [showAuthModal, closeAuthModal]);

    // Close on outside click
    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) closeAuthModal();
    };

    if (!showAuthModal) return null;

    const handleSuccess = () => {
        // Execute pending callback (e.g., post comment) then close modal
        executeAuthCallback();
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            onClick={handleBackdropClick}
        >
            <div className="relative w-full max-w-md mx-4 bg-white rounded-2xl shadow-xl animate-in fade-in zoom-in duration-200">
                {/* Close Button */}
                <button
                    onClick={closeAuthModal}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* Tabs */}
                <div className="flex border-b border-gray-200">
                    <button
                        onClick={() => setAuthModalTab('login')}
                        className={`flex-1 py-4 text-center font-medium transition ${authModalTab === 'login'
                            ? 'text-blue-600 border-b-2 border-blue-600'
                            : 'text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        Sign In
                    </button>
                    <button
                        onClick={() => setAuthModalTab('signup')}
                        className={`flex-1 py-4 text-center font-medium transition ${authModalTab === 'signup'
                            ? 'text-blue-600 border-b-2 border-blue-600'
                            : 'text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        Create Account
                    </button>
                </div>

                {/* Content */}
                <div className="p-6">
                    {authModalTab === 'login' && <LoginForm onSuccess={handleSuccess} />}
                    {authModalTab === 'signup' && <SignupForm onSuccess={handleSuccess} />}
                    {authModalTab === 'reset' && (
                        <ResetPasswordForm onBack={() => setAuthModalTab('login')} />
                    )}
                </div>
            </div>
        </div>
    );
}
