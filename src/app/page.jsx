'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Spinner } from '@/components/common/Spinner';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to login or workspace based on auth status
    // TODO: Check actual auth status
    const isAuthenticated = false;

    if (isAuthenticated) {
      router.push('/workspace');
    } else {
      router.push('/login');
    }
  }, [router]);

  return <Spinner />;
}
