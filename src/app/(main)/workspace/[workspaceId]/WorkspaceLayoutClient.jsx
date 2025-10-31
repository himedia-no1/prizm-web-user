'use client';

import { createContext, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import useStore from '@/store/useStore';
import { LeftSidebar } from '@/components/layout/LeftSidebar';
import { ChevronsRight } from '@/components/common/icons';
import { mockWorkspaces, mockCategories, mockDMs, mockUsers } from '@/__mocks__';
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
  const toggleDarkMode = useStore((state) => state.toggleDarkMode);
  const setCurrentWorkspace = useStore((state) => state.setCurrentWorkspace);

  const workspaceId = resolveWorkspaceId(workspaceParam);
  const [isLeftSidebarCollapsed, setIsLeftSidebarCollapsed] = useState(false);
  const [currentChannelId, setCurrentChannelId] = useState('c1');
  const [currentView, setCurrentView] = useState('dashboard');

  const currentWorkspace = useMemo(
    () => mockWorkspaces.find((ws) => ws.id === workspaceId) ?? mockWorkspaces[0],
    [workspaceId],
  );
  const currentUser = mockUsers['u1'];

  useEffect(() => {
    document.documentElement.dataset.theme = isDarkMode ? 'dark' : 'light';
  }, [isDarkMode]);

  useEffect(() => {
    if (currentWorkspace) {
      setCurrentWorkspace(currentWorkspace);
    }
  }, [currentWorkspace, setCurrentWorkspace]);

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

  const handleOpenGenericModal = (type) => {
    openModal('generic', { type });
  };

  const contextValue = useMemo(
    () => ({
      currentWorkspace,
      currentUser,
    }),
    [currentWorkspace, currentUser],
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
          isDarkMode={isDarkMode}
          onSelectChannel={handleSelectChannel}
          onSelectView={handleSelectView}
          onSwitchWorkspace={handleSwitchWorkspace}
          onOpenProfileModal={handleOpenProfileModal}
          onNavigateToSettings={() => router.push(`/workspace/${workspaceId}/settings`)}
          onNavigateToUserSettings={() => router.push('/settings')}
          onNavigateToCreateWorkspace={() => router.push('/create-workspace')}
          onOpenModal={handleOpenGenericModal}
          onCollapse={() => setIsLeftSidebarCollapsed(true)}
          onToggleDarkMode={toggleDarkMode}
        />

        {children}
      </div>
    </WorkspaceContext.Provider>
  );
};

export default WorkspaceLayoutClient;
