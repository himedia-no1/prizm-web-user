import axiosInstance from '@/core/api/axiosInstance';
import { useAuthStore } from '@/core/store/authStore';

/**
 * Access Token 갱신
 * POST /api/auth/refresh
 */
export const refreshSession = async () => {
  try {
    const { data } = await axiosInstance.post('/api/auth/refresh');
    useAuthStore.getState().setAuthState({
      accessToken: data?.accessToken ?? null,
      user: data?.user ?? null,
    });
    return data;
  } catch (error) {
    if (error?.response?.status === 401) {
      useAuthStore.getState().clearAuthState();
    }
    throw error;
  }
};
