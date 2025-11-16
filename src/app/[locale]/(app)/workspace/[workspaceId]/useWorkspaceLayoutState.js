'use client';

import { useEffect, useMemo, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useMessages } from 'next-intl';
import { useWorkspaceStore } from '@/core/store/workspace';
import { useChatStore } from '@/core/store/chat';
import { useUIStore } from '@/core/store/shared';
import useDataStore from '@/core/store/dataStore';
import { SUPPORTED_LOCALES } from '@/i18n/config';

export const useWorkspaceLayoutState = ({ workspaceId, initialWorkspace, userId }) => {
  const router = useRouter();
  const pathname = usePathname();
  const messages = useMessages();
  const openModal = useUIStore((state) => state.openModal);
  const isDarkMode = useUIStore((state) => state.isDarkMode);

  // Workspace Store
  const setCurrentWorkspace = useWorkspaceStore((state) => state.setCurrentWorkspace);
  const setWorkspaceMemberships = useWorkspaceStore((state) => state.setWorkspaceMemberships);
  const setCurrentWorkspaceRole = useWorkspaceStore((state) => state.setCurrentWorkspaceRole);
  const workspaces = useWorkspaceStore((state) => state.workspaces);
  const categories = useWorkspaceStore((state) => state.categories);
  const users = useWorkspaceStore((state) => state.users);
  const workspaceMembersMap = useWorkspaceStore((state) => state.workspaceMembers);

  // Chat Store
  const dms = useChatStore((state) => state.dms);

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

  const workspacesList = useMemo(() => {
    if (workspaces && workspaces.length > 0) {
      return workspaces;
    }
    if (initialWorkspace) {
      return [initialWorkspace];
    }
    return [];
  }, [workspaces, initialWorkspace]);

  const currentWorkspace = useMemo(() => {
    if (initialWorkspace) {
      return initialWorkspace;
    }
    return workspacesList.find((ws) => ws.id === workspaceId) ?? workspacesList[0] ?? null;
  }, [initialWorkspace, workspacesList, workspaceId]);

  const currentUser = useMemo(() => {
    if (userId && users[userId]) {
      return users[userId];
    }
    const fallback = Object.values(users ?? {})[0];
    return fallback ?? null;
  }, [users, userId]);

  const workspaceMembers = useMemo(
    () => workspaceMembersMap?.[workspaceId] ?? {},
    [workspaceId, workspaceMembersMap],
  );

  const safeWorkspace = useMemo(
    () => currentWorkspace ?? { id: workspaceId ?? 'workspace', name: 'Workspace' },
    [currentWorkspace, workspaceId],
  );

  const safeCurrentUser = useMemo(
    () => currentUser ?? { id: userId ?? 'user', name: messages?.common?.defaultUser, status: 'offline' },
    [currentUser, userId, messages?.common?.defaultUser],
  );

  const currentMembership = useMemo(
    () => workspaceMembers[userId] ?? { role: 'member' },
    [workspaceMembers, userId],
  );

  const permissionFlags = useMemo(() => {
    const role = currentMembership.role ?? 'member';
    const isPrivileged = role === 'owner' || role === 'manager';
    return {
      role,
      canManageWorkspace: isPrivileged,
      canInviteMembers: isPrivileged,
      canManageCategories: isPrivileged,
      canManageAppConnect: isPrivileged,
    };
  }, [currentMembership]);

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
      // TODO: API 호출하여 워크스페이스 탈퇴 처리
      console.log('Leaving workspace:', workspaceIdToLeave);
      // 탈퇴 후 다른 워크스페이스로 이동
      const remainingWorkspaces = workspacesList.filter(ws => ws.id !== workspaceIdToLeave);
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
