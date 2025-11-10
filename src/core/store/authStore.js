import { create } from 'zustand';
import axiosInstance from '@/core/api/axiosInstance';

export const useAuthStore = create((set) => ({
    user: null,
    workspaceId: null,
    accessToken: null,
    isAuthenticated: false,
    loading: false,
    error: null,
    initialized: false,

    setLoading: (loading) => set({ loading }),

    setAuthState: ({ user, accessToken, workspaceId }) => {
        set({
            user: user ?? null,
            accessToken: accessToken ?? null,
            workspaceId: workspaceId ?? null,
            isAuthenticated: Boolean(user && accessToken),
            loading: false,
            error: null,
            initialized: true,
        });
    },

    setAccessToken: (accessToken) => {
        set((state) => ({
            accessToken: accessToken ?? null,
            isAuthenticated: Boolean(accessToken && state.user),
        }));
    },

    setUser: (user) => {
        set((state) => ({
            user: user ?? null,
            isAuthenticated: Boolean(user && state.accessToken),
        }));
    },

    setWorkspaceId: (workspaceId) => set({ workspaceId }),

    setError: (error) => {
        set({
            error,
            loading: false,
            initialized: true,
        });
    },

    clearAuthState: () => {
        set({
            user: null,
            accessToken: null,
            workspaceId: null,
            isAuthenticated: false,
            loading: false,
            error: null,
            initialized: true,
        });
    },

    markInitialized: () => {
        set((state) => (state.initialized ? state : { initialized: true }));
    },

    logout: async () => {
        set({ loading: true });
        try {
            await axiosInstance.post('/mock/auth/logout');
        } catch (error) {
            console.warn('[AuthStore] logout failed:', error);
        } finally {
            set({
                user: null,
                accessToken: null,
                workspaceId: null,
                isAuthenticated: false,
                loading: false,
                error: null,
                initialized: true,
            });
        }
    },
}));
