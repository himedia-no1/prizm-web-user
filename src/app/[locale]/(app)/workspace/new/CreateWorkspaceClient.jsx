'use client';

import { CreateWorkspacePage } from '@/components/workspace/components/CreateWorkspacePage';
import ModalManager from '@/components/modals/ModalManager';

export default function CreateWorkspaceClient({ initialMode, hasExistingWorkspace }) {
  return (
    <>
      <CreateWorkspacePage initialMode={initialMode} hasExistingWorkspace={hasExistingWorkspace} />
      <ModalManager />
    </>
  );
}
