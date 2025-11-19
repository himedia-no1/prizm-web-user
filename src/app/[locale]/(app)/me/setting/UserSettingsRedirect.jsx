'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function UserSettingsRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/me/setting/profile');
  }, [router]);

  return null;
}
