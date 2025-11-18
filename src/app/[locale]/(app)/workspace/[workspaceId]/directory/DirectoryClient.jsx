'use client';

import { useEffect, useState } from 'react';
import { useUIStore } from '@/core/store/shared';
import { DirectoryView } from '@/components/user/components/DirectoryView';
import { workspaceService } from '@/core/api/services';

export default function DirectoryClient({ workspaceId }) {
  const openModal = useUIStore((state) => state.openModal);
  const [users, setUsers] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        const data = await workspaceService.getWorkspaceUsers(workspaceId);
        if (cancelled) {
          return;
        }
        const list = Array.isArray(data?.users)
          ? data.users
          : Array.isArray(data)
            ? data
            : [];
        const map = list.reduce((acc, user) => {
          if (user?.id) {
            acc[user.id] = user;
          }
          return acc;
        }, {});
        setUsers(map);
      } catch (error) {
        if (!cancelled) {
          setUsers({});
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    if (workspaceId) {
      fetchUsers();
    } else {
      setIsLoading(false);
      setUsers({});
    }

    return () => {
      cancelled = true;
    };
  }, [workspaceId]);

  const handleOpenUserProfile = (userId) => {
    openModal('userProfile', { userId });
  };

  if (isLoading) {
    return (
      <main className="main-view">
        <div className="view-content">
          <p>Loading directory...</p>
        </div>
      </main>
    );
  }

  return <DirectoryView users={users} onOpenUserProfile={handleOpenUserProfile} />;
}
