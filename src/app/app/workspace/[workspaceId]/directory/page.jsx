'use client';

import { DirectoryView } from '@/components/user/components/DirectoryView';
import { mockUsers } from '@/__mocks__';
import useStore from '@/store/useStore';

export default function DirectoryPage() {
  const openModal = useStore((state) => state.openModal);

  const handleOpenUserProfile = (userId) => {
    openModal('userProfile', { userId });
  };

  return <DirectoryView users={mockUsers} onOpenUserProfile={handleOpenUserProfile} />;
}
