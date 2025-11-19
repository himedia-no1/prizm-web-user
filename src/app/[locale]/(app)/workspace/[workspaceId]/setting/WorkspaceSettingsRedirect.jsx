'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function WorkspaceSettingsRedirect({ workspaceId }) {
  const router = useRouter();

  useEffect(() => {
    if (!workspaceId) {
      router.replace('/workspace/new');
    } else {
      router.replace(`/workspace/${workspaceId}/setting/overview`);
    }
  }, [workspaceId, router]);

  return null;
}
