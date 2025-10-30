import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { loginWithProvider, fetchUserProfile, logoutUser } from '../api/authAPI';

export const useAuthStore = create(
    persist(
        (set, get) => ({
            user: null,
            accessToken: null,
            isAuthenticated: false,
            loading: false,
            error: null,

            // ✅ 소셜 로그인 (OAuth)
            login: async (provider, code) => {
                set({ loading: true, error: null });
                try {
                    const { accessToken } = await loginWithProvider(provider, code);
                    localStorage.setItem('access_token', accessToken);

                    const user = await fetchUserProfile(accessToken);
                    set({ user, accessToken, isAuthenticated: true, loading: false });
                } catch (err) {
                    console.error('[AuthStore] login failed:', err);
                    set({ error: err.message, loading: false });
                }
            },

            // ✅ 사용자 정보 새로고침
            refreshUser: async () => {
                const token = get().accessToken;
                if (!token) return;
                try {
                    const user = await fetchUserProfile(token);
                    set({ user, isAuthenticated: true });
                } catch (err) {
                    console.error('[AuthStore] refresh failed:', err);
                    set({ isAuthenticated: false, user: null });
                }
            },

            // ✅ 로그아웃
            logout: async () => {
                try {
                    await logoutUser();
                } catch (_) {
                    /* 서버 오류 무시 */
                } finally {
                    localStorage.removeItem('access_token');
                    set({ user: null, accessToken: null, isAuthenticated: false });
                }
            },
        }),
        {
            name: 'auth-storage', // localStorage key
            partialize: (state) => ({
                accessToken: state.accessToken,
                user: state.user,
                isAuthenticated: state.isAuthenticated,
            }),
        }
    )
);
