'use client';

import { useState } from 'react';
import { ChevronsLeft } from '@/components/common/icons';
import { WorkspaceDropdown } from './WorkspaceDropdown';
import { NavigationMenu } from './NavigationMenu';
import { CategorySection } from './CategorySection';
import { DMList } from './DMList';
import { SidebarFooter } from './SidebarFooter';
import './LeftSidebar.module.css';

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
        <div className="nav-group">
          <div className="nav-group__header">
            <span>Channels</span>
          </div>
          {categories.map(category => (
            <CategorySection
              key={category.id}
              category={category}
              currentChannelId={currentChannelId}
              currentView={currentView}
              onSelectChannel={onSelectChannel}
            />
          ))}
        </div>

        <DMList
          dms={dms}
          users={users}
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
