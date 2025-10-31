'use client';

import { useState } from 'react';
import { ChevronsLeft } from '@/components/common/icons';
import { WorkspaceDropdown } from '@/components/layout/LeftSidebar/WorkspaceDropdown';
import { NavigationMenu } from '@/components/layout/LeftSidebar/NavigationMenu';
import { CategoryGroup } from '@/components/layout/LeftSidebar/CategoryGroup';
import { DMList } from '@/components/layout/LeftSidebar/DMList';
import { SidebarFooter } from '@/components/layout/LeftSidebar/SidebarFooter';
import './LeftSidebar.module.css';

import useStrings from '@/hooks/useStrings';

export const LeftSidebar = ({
  currentWorkspace,
  workspaces,
  categories,
  dms,
  users,
  currentUser,
  currentChannelId,
  currentView,
  isDarkMode,
  onSelectChannel,
  onSelectView,
  onSwitchWorkspace,
  onOpenProfileModal,
  onNavigateToSettings,
  onNavigateToUserSettings,
  onNavigateToCreateWorkspace,
  onOpenModal,
  onCollapse,
  onToggleDarkMode
}) => {
  const [isWorkspaceDropdownOpen, setIsWorkspaceDropdownOpen] = useState(false);
  const s = useStrings();
  const categoryList = Array.isArray(categories) ? categories : [];
  const channelCategories = categoryList.filter(
    (category) => category.section !== 'appConnect',
  );
  const appConnectCategories = categoryList.filter(
    (category) => category.section === 'appConnect',
  );

  return (
    <aside className="left-sidebar">
      <header
        className="sidebar-header"
        onClick={() => setIsWorkspaceDropdownOpen(!isWorkspaceDropdownOpen)}
      >
        <h1 className="sidebar-header__title">{currentWorkspace.name}</h1>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onCollapse();
          }}
          className="sidebar-header__collapse-button"
        >
          <ChevronsLeft size={18} />
        </button>
      </header>

      <WorkspaceDropdown
        currentWorkspace={currentWorkspace}
        workspaces={workspaces}
        isOpen={isWorkspaceDropdownOpen}
        onClose={() => setIsWorkspaceDropdownOpen(false)}
        onNavigateToSettings={onNavigateToSettings}
        onSwitchWorkspace={onSwitchWorkspace}
        onNavigateToCreateWorkspace={onNavigateToCreateWorkspace}
        onOpenModal={onOpenModal}
      />

      <NavigationMenu currentView={currentView} onSelectView={onSelectView} />

      <nav className="sidebar-nav">
        <CategoryGroup
          title={s.channels}
          categories={channelCategories}
          currentChannelId={currentChannelId}
          currentView={currentView}
          onSelectChannel={onSelectChannel}
        />

        <DMList
          dms={dms}
          users={users}
          currentChannelId={currentChannelId}
          currentView={currentView}
          onSelectChannel={onSelectChannel}
        />

        <CategoryGroup
          title={s.appConnect}
          categories={appConnectCategories}
          currentChannelId={currentChannelId}
          currentView={currentView}
          onSelectChannel={onSelectChannel}
        />
      </nav>

      <SidebarFooter
        currentUser={currentUser}
        isDarkMode={isDarkMode}
        onOpenProfileModal={onOpenProfileModal}
        onNavigateToUserSettings={onNavigateToUserSettings}
        onOpenModal={onOpenModal}
        onToggleDarkMode={onToggleDarkMode}
      />
    </aside>
  );
};
