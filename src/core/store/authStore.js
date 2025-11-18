import { create } from 'zustand';
import { authService } from '@/core/api/services';

/**
 * 인증 상태 관리
 * - accessToken만 Zustand에 저장
 * - refreshToken은 HttpOnly 쿠키로 관리
 */
export const useAuthStore = create((set) => ({
    accessToken: null,

    setAccessToken: (accessToken) => {
        set({ accessToken: accessToken ?? null });
    },

    clearAccessToken: () => {
        set({ accessToken: null });
    },

    logout: async () => {
        try {
            await authService.logout();
        } catch (error) {
            console.warn('[AuthStore] logout failed:', error);
        } finally {
            set({ accessToken: null });
        }
    },
}));
