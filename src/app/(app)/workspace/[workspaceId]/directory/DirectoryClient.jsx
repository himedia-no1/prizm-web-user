'use client';

import useStore from '@/core/store/useStore';
import { useLastWorkspacePath } from '@/shared/hooks/useLastWorkspacePath';
import { DirectoryView } from '@/components/user/components/DirectoryView';

export default function DirectoryClient({ users }) {
  useLastWorkspacePath();
  const openModal = useStore((state) => state.openModal);

  const handleOpenUserProfile = (userId) => {
    openModal('userProfile', { userId });
  };

  return <DirectoryView users={users} onOpenUserProfile={handleOpenUserProfile} />;
}
