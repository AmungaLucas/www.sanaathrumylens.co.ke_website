'use client';

import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [authModalTab, setAuthModalTab] = useState('login'); // 'login' or 'signup'
    const [authCallback, setAuthCallback] = useState(null);

    // Check if user is logged in on mount
    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try {
            const res = await fetch('/api/auth/me');
            if (res.ok) {
                const userData = await res.json();
                setUser(userData);
            } else if (res.status === 401) {
                // User not authenticated, that's fine
                setUser(null);
            }
        } catch (error) {
            // Silently handle network errors or other issues
            console.error('Auth check error:', error);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, password) => {
        const res = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        if (res.ok) {
            const data = await res.json();
            setUser(data.user);
            closeAuthModal();
            return { success: true };
        }

        const data = await res.json();
        return { success: false, error: data.error || 'Login failed. Please try again.' };
    };

    const signup = async (email, password, name) => {
        const res = await fetch('/api/auth/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, name }),
        });

        if (res.ok) {
            const data = await res.json();
            setUser(data.user);
            closeAuthModal();
            return { success: true };
        }

        const data = await res.json();
        return { success: false, error: data.error || 'Signup failed. Please try again.' };
    };

    const logout = async () => {
        await fetch('/api/auth/logout', { method: 'POST' });
        setUser(null);
    };

    const requireAuth = (callback, tab = 'login') => {
        if (user) {
            callback();
        } else {
            setAuthModalTab(tab);
            setAuthCallback(() => callback);
            setShowAuthModal(true);
        }
    };

    const openAuthModal = (tab = 'login') => {
        setAuthModalTab(tab);
        setShowAuthModal(true);
    };

    const closeAuthModal = () => {
        setShowAuthModal(false);
        setAuthCallback(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                login,
                signup,
                logout,
                requireAuth,
                openAuthModal,
                closeAuthModal,
                showAuthModal,
                authModalTab,
                setAuthModalTab,
                authCallback,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
}