import { create } from 'zustand';
import { authService } from '@/core/api/services';

/**
 * 인증 상태 관리
 * - accessToken만 Zustand에 저장
 * - refreshToken은 HttpOnly 쿠키로 관리
 */
export const useAuthStore = create((set) => ({
    accessToken: null,
    user: null,
    isAuthenticated: false,

    setAccessToken: (accessToken) => {
        set({
            accessToken: accessToken ?? null,
            isAuthenticated: Boolean(accessToken),
        });
    },

    setAuthState: ({ accessToken = null, user = null } = {}) => {
        set((state) => ({
            accessToken: accessToken ?? state.accessToken ?? null,
            user: user ?? state.user ?? null,
            isAuthenticated: Boolean(accessToken ?? state.accessToken ?? user ?? state.user),
        }));
    },

    setUser: (user) => {
        set((state) => ({
            user: user ?? null,
            isAuthenticated: Boolean(state.accessToken || user),
        }));
    },

    clearAccessToken: () => {
        set({ accessToken: null, isAuthenticated: false });
    },

    clearAuthState: () => {
        set({ accessToken: null, user: null, isAuthenticated: false });
    },

    logout: async () => {
        try {
            await authService.logout();
        } catch (error) {
            console.warn('[AuthStore] logout failed:', error);
        } finally {
            set({ accessToken: null, user: null, isAuthenticated: false });
        }
    },
}));
