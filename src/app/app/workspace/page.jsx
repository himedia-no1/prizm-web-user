'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function WorkspaceRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/workspace/ws1/dashboard');
  }, [router]);

  return null;
}