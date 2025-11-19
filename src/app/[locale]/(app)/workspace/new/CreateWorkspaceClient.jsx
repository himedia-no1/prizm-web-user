'use client';

import { useEffect, useState } from 'react';
import { CreateWorkspacePage } from '@/components/workspace/components/CreateWorkspacePage';
import ModalManager from '@/components/modals/ModalManager';
import { workspaceService } from '@/core/api/services';
import { useWorkspaceStore } from '@/core/store/workspace';

export default function CreateWorkspaceClient({ initialMode }) {
  const [hasExistingWorkspace, setHasExistingWorkspace] = useState(false);
  const setWorkspaces = useWorkspaceStore((state) => state.setWorkspaces);

  useEffect(() => {
    let cancelled = false;

    const fetchWorkspaces = async () => {
      try {
        const workspaces = await workspaceService.getWorkspaces();
        if (!cancelled) {
          // Store에 저장
          setWorkspaces(workspaces);
          setHasExistingWorkspace(Array.isArray(workspaces) && workspaces.length > 0);
        }
      } catch (error) {
        console.warn('Failed to load workspaces:', error);
        if (!cancelled) {
          setHasExistingWorkspace(false);
        }
      }
    };

    fetchWorkspaces();
    return () => {
      cancelled = true;
    };
  }, [setWorkspaces]);

  return (
    <>
      <CreateWorkspacePage
        initialMode={initialMode}
        hasExistingWorkspace={hasExistingWorkspace}
      />
      <ModalManager />
    </>
  );
}
