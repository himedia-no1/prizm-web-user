'use client';

import { createContext, useEffect, useMemo, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import useStore from '@/core/store/useStore';
import useDataStore from '@/core/store/dataStore';
import { LeftSidebar } from '@/components/layout/LeftSidebar';
import { ChevronsRight } from '@/components/common/icons';
import ModalManager from '@/components/modals/ModalManager';
import styles from './workspace-layout.module.css';

export const WorkspaceContext = createContext(null);

const WorkspaceLayoutClient = ({ children, workspaceId, initialWorkspace, userId }) => {
  const router = useRouter();
  const pathname = usePathname();
  const openModal = useStore((state) => state.openModal);
  const isDarkMode = useStore((state) => state.isDarkMode);
  const setCurrentWorkspace = useStore((state) => state.setCurrentWorkspace);
  const setWorkspaceMemberships = useStore((state) => state.setWorkspaceMemberships);
  const setCurrentWorkspaceRole = useStore((state) => state.setCurrentWorkspaceRole);
  const workspaces = useDataStore((state) => state.workspaces);
  const categories = useDataStore((state) => state.categories);
  const dms = useDataStore((state) => state.dms);
  const users = useDataStore((state) => state.users);
  const workspaceMembersMap = useDataStore((state) => state.workspaceMembers);
  const loadInitialData = useDataStore((state) => state.loadInitialData);
  const initialized = useDataStore((state) => state.initialized);

  const [isLeftSidebarCollapsed, setIsLeftSidebarCollapsed] = useState(false);
  const [currentChannelId, setCurrentChannelId] = useState('c1');
  const [currentView, setCurrentView] = useState('dashboard');

  useEffect(() => {
    if (!initialized) {
      loadInitialData().catch((error) => {
        console.error('Failed to load workspace bootstrap data:', error);
      });
    }
  }, [initialized, loadInitialData]);

  const workspacesList = useMemo(() => {
    if (workspaces.length > 0) {
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

  const safeWorkspace = useMemo(() => currentWorkspace ?? { id: workspaceId ?? 'workspace', name: 'Workspace' }, [currentWorkspace, workspaceId]);
  const safeCurrentUser = useMemo(
    () => currentUser ?? { id: userId ?? 'user', name: '사용자', status: 'offline' },
    [currentUser, userId],
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
    setCurrentChannelId(channelId);
    setCurrentView('channel');
    router.push(`/app/workspace/${workspaceId}/channel/${channelId}`);
  };

  const handleSelectView = (view) => {
    setCurrentView(view);
    router.push(`/app/workspace/${workspaceId}/${view}`);
  };

  const handleSwitchWorkspace = (nextWorkspaceId) => {
    router.push(`/app/workspace/${nextWorkspaceId}/dashboard`);
  };

  const handleOpenProfileModal = () => {
    openModal('profileSettings', { user: safeCurrentUser });
  };

  const handleOpenModal = (type, props = {}) => {
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

  const isSettingsRoute = pathname?.includes(`/app/workspace/${workspaceId}/setting`);

  const content = (
        <WorkspaceContext.Provider value={contextValue}>
          <div className={`workspace-page ${isLeftSidebarCollapsed ? 'left-sidebar-collapsed' : ''}`}>
        {isLeftSidebarCollapsed && (
          <button className="sidebar-open-button" onClick={() => setIsLeftSidebarCollapsed(false)}>
            <ChevronsRight size={18} />
          </button>
        )}

        <LeftSidebar
          currentWorkspace={safeWorkspace}
          workspaces={workspacesList}
          categories={categories}
          dms={dms}
          users={users}
          currentUser={safeCurrentUser}
          currentChannelId={currentChannelId}
          currentView={currentView}
          permissions={permissionFlags}
          onSelectChannel={handleSelectChannel}
          onSelectView={handleSelectView}
          onSwitchWorkspace={handleSwitchWorkspace}
          onOpenProfileModal={handleOpenProfileModal}
          onNavigateToSettings={() => router.push(`/app/workspace/${workspaceId}/setting/overview`)}
          onNavigateToUserSettings={() => router.push('/app/me/setting/profile')}
          onNavigateToCreateWorkspace={() => router.push('/app/workspace/new')}
          onOpenModal={handleOpenModal}
          onCollapse={() => setIsLeftSidebarCollapsed(true)}
        />

        {children}
      </div>
      <ModalManager />
    </WorkspaceContext.Provider>
  );

  if (isSettingsRoute) {
    return (
      <WorkspaceContext.Provider value={contextValue}>
        {children}
        <ModalManager />
      </WorkspaceContext.Provider>
    );
  }

  return content;
};

export default WorkspaceLayoutClient;
