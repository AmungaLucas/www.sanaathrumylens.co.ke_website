'use client';

import { createContext, useContext, useEffect, useState, useRef } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [authModalTab, setAuthModalTab] = useState('login');
    const [authCallback, setAuthCallback] = useState(null);

    // Ref always holds the freshest user — prevents stale closures in deferred callbacks
    const userRef = useRef(null);

    // Keep ref in sync with state
    useEffect(() => {
        userRef.current = user;
    }, [user]);

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try {
            const res = await fetch('/api/auth/me');
            if (res.ok) {
                const userData = await res.json();
                if (userData && userData.id) {
                    setUser(userData);
                } else {
                    setUser(null);
                }
            } else {
                setUser(null);
            }
        } catch (error) {
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
            return { success: true };
        }

        const data = await res.json();
        return { success: false, error: data.error || 'Signup failed. Please try again.' };
    };

    const logout = async () => {
        await fetch('/api/auth/logout', { method: 'POST' });
        setUser(null);
    };

    // Pass the fresh user to the callback to avoid stale closures
    const requireAuth = (callback, tab = 'login') => {
        if (user) {
            callback(user);
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
    };

    // Execute pending callback with the FRESH user from ref (not the stale closure)
    const executeAuthCallback = () => {
        const cb = authCallback;
        const freshUser = userRef.current;
        closeAuthModal();
        if (cb && freshUser) {
            cb(freshUser);
        }
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
                executeAuthCallback,
                showAuthModal,
                authModalTab,
                setAuthModalTab,
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
