'use client';

import { useUIStore } from '@/core/store/shared';
import { useLastWorkspacePath } from '@/shared/hooks/useLastWorkspacePath';
import { DirectoryView } from '@/components/user/components/DirectoryView';

export default function DirectoryClient({ users }) {
  useLastWorkspacePath();
  const openModal = useUIStore((state) => state.openModal);

  const handleOpenUserProfile = (userId) => {
    openModal('userProfile', { userId });
  };

  return <DirectoryView users={users} onOpenUserProfile={handleOpenUserProfile} />;
}
