'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function WorkspaceRedirect({ workspaceId }) {
  const router = useRouter();

  useEffect(() => {
    router.replace(`/workspace/${workspaceId}/dashboard`);
  }, [workspaceId, router]);

  return null;
}
