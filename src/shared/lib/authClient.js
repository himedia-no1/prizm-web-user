import axiosInstance from '@/core/api/axiosInstance';
import { useAuthStore } from '@/core/store/authStore';

/**
 * Access Token 갱신
 * POST /api/auth/refresh
 */
export const refreshSession = async () => {
  try {
    const { data } = await axiosInstance.post('/api/auth/refresh');
    useAuthStore.getState().setAccessToken(data?.accessToken ?? null);
    return data;
  } catch (error) {
    useAuthStore.getState().clearAccessToken();
    throw error;
  }
};
