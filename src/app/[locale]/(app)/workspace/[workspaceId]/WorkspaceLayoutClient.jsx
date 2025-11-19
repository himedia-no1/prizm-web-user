'use client';

import { createContext } from 'react';
import { LeftSidebar } from '@/components/layout/LeftSidebar';
import { ChevronsRight } from '@/components/common/icons';
import ModalManager from '@/components/modals/ModalManager';
import { useLastPathSaver } from '@/shared/hooks/useLastPathSaver';
import styles from './workspace-layout.module.css';

export const WorkspaceContext = createContext(null);

import { useWorkspaceLayoutState } from './useWorkspaceLayoutState';

const WorkspaceLayoutClient = ({ children, workspaceId, initialWorkspace, userId }) => {
  // 마지막 경로 자동 저장
  useLastPathSaver();
  const {
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
  } = useWorkspaceLayoutState({ workspaceId, initialWorkspace, userId });

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
          currentMembership={currentMembership}
          onSelectChannel={handleSelectChannel}
          onSelectView={handleSelectView}
          onSwitchWorkspace={handleSwitchWorkspace}
          onOpenProfileModal={handleOpenProfileModal}
          onNavigateToSettings={handleNavigateToSettings}
          onNavigateToUserSettings={handleNavigateToUserSettings}
          onNavigateToCreateWorkspace={handleNavigateToCreateWorkspace}
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
