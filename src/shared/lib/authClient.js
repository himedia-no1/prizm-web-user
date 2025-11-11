import axiosInstance from '@/core/api/axiosInstance';
import { useAuthStore } from '@/core/store/authStore';

export const refreshSession = async () => {
  try {
    const { data } = await axiosInstance.post('/mock/auth/refresh');
    useAuthStore.getState().setAuthState({
      user: data?.user ?? null,
      accessToken: data?.accessToken ?? null,
      workspaceId: data?.workspaceId ?? null,
    });
    return data;
  } catch (error) {
    useAuthStore.getState().clearAuthState();
    throw error;
  }
};
