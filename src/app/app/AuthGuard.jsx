'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';

// This is a placeholder for fetching user workspaces
const fetchWorkspaces = async () => {
  // In a real app, you would fetch this from an API
  return Promise.resolve([{ id: 'ws1', name: 'Prizm Dev', icon: 'P' }]); // Simulating one workspace
};

const AuthGuard = ({ children }) => {
  const router = useRouter();
  const { isAuthenticated, loading } = useAuthStore();

  useEffect(() => {
    if (loading) return;

    if (isAuthenticated) {
      fetchWorkspaces().then((workspaces) => {
        if (workspaces.length > 0) {
          // For now, just redirect to the first workspace.
          // In a real app, you would get the last visited workspace.
          router.push(`/app/workspace/${workspaces[0].id}/dashboard`);
        } else {
          router.push('/app/create-workspace');
        }
      });
    } else {
      router.push('/app/auth');
    }
  }, [isAuthenticated, loading, router]);

  // You can show a loading spinner here
  return <>{children}</>;
};

export default AuthGuard;
