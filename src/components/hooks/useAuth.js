'use client';

import { useAuth } from '../providers/AuthProvider';

export function useRequireAuth() {
    const { requireAuth } = useAuth();
    return requireAuth;
}

export { useAuth };