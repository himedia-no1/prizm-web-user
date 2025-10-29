'use client';

import { DirectoryView } from '@/components/directory/DirectoryView';
import { mockUsers } from '@/mocks';

export default function DirectoryPage() {
  const handleOpenUserProfile = (userId) => {
    console.log('Open user profile:', userId);
  };

  return <DirectoryView users={mockUsers} onOpenUserProfile={handleOpenUserProfile} />;
}
