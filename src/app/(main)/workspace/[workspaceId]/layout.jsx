'use client';

import { useState, createContext } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { LeftSidebar } from '@/components/layout/LeftSidebar';
import { ChevronsRight } from '@/components/common/icons';
import { mockWorkspaces, mockCategories, mockDMs, mockUsers } from '@/mocks';
import './workspace-layout.css';

export const WorkspaceContext = createContext(null);

export default function WorkspaceLayout({ children, params }) {
  const router = useRouter();
  const pathname = usePathname();

  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLeftSidebarCollapsed, setIsLeftSidebarCollapsed] = useState(false);
  const [currentChannelId, setCurrentChannelId] = useState('c1');
  const [currentView, setCurrentView] = useState('dashboard');

  const currentWorkspace = mockWorkspaces.find(ws => ws.id === params.workspaceId) || mockWorkspaces[0];
  const currentUser = mockUsers['u1'];

  const handleSelectChannel = (channelId) => {
    setCurrentChannelId(channelId);
    setCurrentView('channel');
    router.push(`/workspace/${params.workspaceId}/channel/${channelId}`);
  };

  const handleSelectView = (view) => {
    setCurrentView(view);
    router.push(`/workspace/${params.workspaceId}/${view}`);
  };

  const handleSwitchWorkspace = (workspaceId) => {
    router.push(`/workspace/${workspaceId}/dashboard`);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.dataset.theme = !isDarkMode ? 'dark' : 'light';
  };

  const contextValue = {
    isDarkMode,
    toggleDarkMode,
    currentWorkspace,
    currentUser,
  };

  return (
    <WorkspaceContext.Provider value={contextValue}>
      <div className={`workspace-page ${isLeftSidebarCollapsed ? 'left-sidebar-collapsed' : ''}`}>
        {isLeftSidebarCollapsed && (
          <button
            className="sidebar-open-button"
            onClick={() => setIsLeftSidebarCollapsed(false)}
          >
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
          onOpenProfileModal={() => console.log('Open profile modal')}
          onNavigateToSettings={() => router.push('/settings/workspace/' + params.workspaceId)}
          onNavigateToUserSettings={() => router.push('/settings/user')}
          onNavigateToCreateWorkspace={() => router.push('/create-workspace')}
          onOpenModal={(type) => console.log('Open modal:', type)}
          onCollapse={() => setIsLeftSidebarCollapsed(true)}
          onToggleDarkMode={toggleDarkMode}
        />

        {children}
      </div>
    </WorkspaceContext.Provider>
  );
}
