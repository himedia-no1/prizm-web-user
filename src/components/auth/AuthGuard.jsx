'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export const AuthGuard = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    // TODO: Implement actual auth check
    const isAuthenticated = false;

    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [router]);

  return <>{children}</>;
};
