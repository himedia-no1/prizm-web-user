import { useAuthStore } from '@/store/authStore';

export const refreshSession = async () => {
  const response = await fetch('/api/auth/refresh', {
    method: 'POST',
    credentials: 'include',
  });

  if (!response.ok) {
    useAuthStore.getState().clearAuthState();
    throw new Error(`Refresh failed with status ${response.status}`);
  }

  const data = await response.json();
  useAuthStore.getState().setAuthState(data);
  return data;
};
