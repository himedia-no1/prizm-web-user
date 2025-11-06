'use client';

import { createContext, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import useStore from '@/store/useStore';
import { LeftSidebar } from '@/components/layout/LeftSidebar';
import { ChevronsRight } from '@/components/common/icons';
import { mockWorkspaces, mockWorkspaceMembers, mockCategories, mockDMs, mockUsers } from '@/__mocks__';
import './workspace-layout.css';

export const WorkspaceContext = createContext(null);

const resolveWorkspaceId = (workspaceId) => {
  if (Array.isArray(workspaceId)) {
    return workspaceId[0];
  }
  return workspaceId ?? mockWorkspaces[0]?.id;
};

const WorkspaceLayoutClient = ({ children, workspaceId: workspaceParam }) => {
  const router = useRouter();
  const openModal = useStore((state) => state.openModal);
  const isDarkMode = useStore((state) => state.isDarkMode);
  const setCurrentWorkspace = useStore((state) => state.setCurrentWorkspace);
  const setWorkspaceMemberships = useStore((state) => state.setWorkspaceMemberships);
  const setCurrentWorkspaceRole = useStore((state) => state.setCurrentWorkspaceRole);

  const workspaceId = resolveWorkspaceId(workspaceParam);
  const [isLeftSidebarCollapsed, setIsLeftSidebarCollapsed] = useState(false);
  const [currentChannelId, setCurrentChannelId] = useState('c1');
  const [currentView, setCurrentView] = useState('dashboard');

  const currentWorkspace = useMemo(
    () => mockWorkspaces.find((ws) => ws.id === workspaceId) ?? mockWorkspaces[0],
    [workspaceId],
  );
  const currentUser = mockUsers['u1'];
  const workspaceMembers = mockWorkspaceMembers[workspaceId] ?? {};
  const currentMembership = workspaceMembers[currentUser.id] ?? { role: 'member' };
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
    if (currentWorkspace) {
      setCurrentWorkspace(currentWorkspace);
    }
  }, [currentWorkspace, setCurrentWorkspace]);

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
    router.push(`/workspace/${workspaceId}/channel/${channelId}`);
  };

  const handleSelectView = (view) => {
    setCurrentView(view);
    router.push(`/workspace/${workspaceId}/${view}`);
  };

  const handleSwitchWorkspace = (nextWorkspaceId) => {
    router.push(`/workspace/${nextWorkspaceId}/dashboard`);
  };

  const handleOpenProfileModal = () => {
    openModal('profileSettings', { user: currentUser });
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
      'notifications',
      'createCategory',
      'fileUpload',
      'channelFiles',
      'mention',
      'addChannel',
      'addDM',
      'addApp',
      'addFavorite',
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
      currentWorkspace,
      currentUser,
      currentMembership,
      permissions: permissionFlags,
      workspaceMembers,
    }),
    [currentWorkspace, currentUser, currentMembership, permissionFlags, workspaceMembers],
  );

  return (
    <WorkspaceContext.Provider value={contextValue}>
      <div className={`workspace-page ${isLeftSidebarCollapsed ? 'left-sidebar-collapsed' : ''}`}>
        {isLeftSidebarCollapsed && (
          <button className="sidebar-open-button" onClick={() => setIsLeftSidebarCollapsed(false)}>
            <ChevronsRight size={18} />
          </button>
        )}

        <LeftSidebar
          currentWorkspace={currentWorkspace}
          workspaces={mockWorkspaces}
          categories={mockCategories}
          dms={mockDMs}
          users={mockUsers}
          currentUser={currentUser}
          currentChannelId={currentChannelId}
          currentView={currentView}
          permissions={permissionFlags}
          onSelectChannel={handleSelectChannel}
          onSelectView={handleSelectView}
          onSwitchWorkspace={handleSwitchWorkspace}
          onOpenProfileModal={handleOpenProfileModal}
          onNavigateToSettings={() => router.push(`/settings/workspace/${workspaceId}`)}
          onNavigateToUserSettings={() => router.push('/settings')}
          onNavigateToCreateWorkspace={() => router.push('/create-workspace')}
          onOpenModal={handleOpenModal}
          onCollapse={() => setIsLeftSidebarCollapsed(true)}
        />

        {children}
      </div>
    </WorkspaceContext.Provider>
  );
};

export default WorkspaceLayoutClient;
