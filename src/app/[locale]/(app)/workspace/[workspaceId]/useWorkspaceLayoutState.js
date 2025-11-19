'use client';

import { useEffect, useMemo, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useMessages } from 'next-intl';
import { useWorkspaceStore } from '@/core/store/workspace';
import { useUIStore } from '@/core/store/shared';
import useDataStore from '@/core/store/dataStore';
import { SUPPORTED_LOCALES } from '@/i18n/config';
import { useWorkspaceResolvedData } from './hooks/useWorkspaceResolvedData';

export const useWorkspaceLayoutState = ({ workspaceId, initialWorkspace, userId }) => {
  const router = useRouter();
  const pathname = usePathname();
  const messages = useMessages();
  const openModal = useUIStore((state) => state.openModal);
  const isDarkMode = useUIStore((state) => state.isDarkMode);
  const {
    workspacesList,
    categories,
    dms,
    users,
    safeWorkspace,
    safeCurrentUser,
    workspaceMembers,
    permissionFlags,
    currentMembership,
  } = useWorkspaceResolvedData({
    workspaceId,
    initialWorkspace,
    userId,
    defaultUserName: messages?.common?.defaultUser,
  });

  // Workspace Store
  const setCurrentWorkspace = useWorkspaceStore((state) => state.setCurrentWorkspace);
  const setWorkspaceMemberships = useWorkspaceStore((state) => state.setWorkspaceMemberships);
  const setCurrentWorkspaceRole = useWorkspaceStore((state) => state.setCurrentWorkspaceRole);

  // Bootstrap
  const loadInitialData = useDataStore((state) => state.loadInitialData);
  const initialized = useDataStore((state) => state.initialized);

  const [isLeftSidebarCollapsed, setIsLeftSidebarCollapsed] = useState(false);

  const { currentView, currentChannelId } = useMemo(() => {
    if (!pathname) {
      return { currentView: 'dashboard', currentChannelId: null };
    }

    const segments = pathname.split('/').filter(Boolean);
    const normalizedSegments =
      segments.length > 0 && SUPPORTED_LOCALES.includes(segments[0])
        ? segments.slice(1)
        : segments;

    if (normalizedSegments[0] !== 'workspace') {
      return { currentView: 'dashboard', currentChannelId: null };
    }

    const viewSegment = normalizedSegments[2];

    if (viewSegment === 'channel' && normalizedSegments[3]) {
      return { currentView: 'channel', currentChannelId: normalizedSegments[3] };
    }

    return { currentView: viewSegment ?? 'dashboard', currentChannelId: null };
  }, [pathname]);

  useEffect(() => {
    if (!initialized) {
      loadInitialData().catch((error) => {
        console.error('Failed to load workspace bootstrap data:', error);
      });
    }
  }, [initialized, loadInitialData]);

  useEffect(() => {
    document.documentElement.dataset.theme = isDarkMode ? 'dark' : 'light';
  }, [isDarkMode]);

  useEffect(() => {
    if (safeWorkspace) {
      setCurrentWorkspace(safeWorkspace);
    }
  }, [safeWorkspace, setCurrentWorkspace]);

  useEffect(() => {
    setWorkspaceMemberships(workspaceId, workspaceMembers);
    setCurrentWorkspaceRole(currentMembership.role ?? null);
  }, [
    workspaceId,
    workspaceMembers,
    currentMembership.role,
    setWorkspaceMemberships,
    setCurrentWorkspaceRole,
  ]);

  const handleSelectChannel = (channelId) => {
    router.push(`/workspace/${workspaceId}/channel/${channelId}`);
  };

  const handleSelectView = (view) => {
    router.push(`/workspace/${workspaceId}/${view}`);
  };

  const handleSwitchWorkspace = (nextWorkspaceId) => {
    router.push(`/workspace/${nextWorkspaceId}/dashboard`);
  };

  const handleOpenProfileModal = () => {
    openModal('profileSettings', { user: safeCurrentUser });
  };

  const handleOpenModal = (type, props = {}) => {
    // 워크스페이스 탈퇴 처리
    if (type === '__LEAVE_WORKSPACE__') {
      handleLeaveWorkspace(props.workspaceId);
      return;
    }

    const enhancedProps = { ...props };
    if ((type === 'inviteMember' || type === 'inviteGuest') && !enhancedProps.workspaceId) {
      enhancedProps.workspaceId = workspaceId;
    }
    const genericModalTypes = new Set([
      'search',
      'members',
      'pinned',
      'threads',
      'info',
      'createCategory',
      'fileUpload',
      'channelFiles',
      'mention',
      'addChannel',
      'inviteMember',
      'inviteGuest',
    ]);

    if (genericModalTypes.has(type)) {
      openModal('generic', { type, ...enhancedProps });
      return;
    }

    openModal(type, enhancedProps);
  };

  const contextValue = useMemo(
    () => ({
      currentWorkspace: safeWorkspace,
      currentUser: safeCurrentUser,
      currentMembership,
      permissions: permissionFlags,
      workspaceMembers,
    }),
    [safeWorkspace, safeCurrentUser, currentMembership, permissionFlags, workspaceMembers],
  );

  const isSettingsRoute = pathname?.includes(`/workspace/${workspaceId}/setting`);
  const handleNavigateToSettings = () => {
    router.push(`/workspace/${workspaceId}/setting/overview`);
  };
  const handleNavigateToUserSettings = () => {
    router.push('/me/setting/profile');
  };
  const handleNavigateToCreateWorkspace = () => {
    router.push('/workspace/new');
  };

  const handleLeaveWorkspace = async (workspaceIdToLeave) => {
    try {
      const { workspaceService } = await import('@/core/api/services');
      await workspaceService.leaveWorkspace(workspaceIdToLeave);

      // 탈퇴 후 서버에서 새로운 워크스페이스 목록 조회
      const remainingWorkspaces = await workspaceService.getWorkspaces();
      
      if (remainingWorkspaces.length > 0) {
        router.push(`/workspace/${remainingWorkspaces[0].id}/dashboard`);
      } else {
        router.push('/workspace/new');
      }
    } catch (error) {
      console.error('Failed to leave workspace:', error);
    }
  };

  return {
    isLeftSidebarCollapsed,
    setIsLeftSidebarCollapsed,
    currentView,
    currentChannelId,
    safeWorkspace,
    workspacesList,
    categories,
    dms,
    users,
    safeCurrentUser,
    permissionFlags,
    currentMembership,
    handleSelectChannel,
    handleSelectView,
    handleSwitchWorkspace,
    handleOpenProfileModal,
    handleOpenModal,
    handleNavigateToSettings,
    handleNavigateToUserSettings,
    handleNavigateToCreateWorkspace,
    handleLeaveWorkspace,
    contextValue,
    isSettingsRoute,
  };
};

export default useWorkspaceLayoutState;
