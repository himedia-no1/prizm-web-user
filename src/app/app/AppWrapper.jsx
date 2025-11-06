'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';
import ModalManager from '@/components/modals/ModalManager';

const useAuthBootstrap = () => {
  const setAuthState = useAuthStore((state) => state.setAuthState);
  const clearAuthState = useAuthStore((state) => state.clearAuthState);
  const initialized = useAuthStore((state) => state.initialized);

  useEffect(() => {
    if (initialized) {
      return;
    }

    let cancelled = false;

    const bootstrap = async () => {
      try {
        const response = await fetch('/api/auth/refresh', {
          method: 'POST',
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error(`Refresh failed with status ${response.status}`);
        }

        const data = await response.json();

        if (!cancelled) {
          setAuthState(data);
        }
      } catch (error) {
        if (!cancelled) {
          clearAuthState();
        }
      }
    };

    bootstrap();

    return () => {
      cancelled = true;
    };
  }, [initialized, setAuthState, clearAuthState]);
};

export default function AppWrapper({ children }) {
  useAuthBootstrap();

  return (
    <>
      {children}
      <ModalManager />
    </>
  );
}
