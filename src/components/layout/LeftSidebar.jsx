'use client';

import { useMemo, useState } from 'react';
import { ChevronsLeft, Plus } from '@/components/common/icons';
import { WorkspaceDropdown } from '@/components/layout/LeftSidebar/WorkspaceDropdown';
import { NavigationMenu } from '@/components/layout/LeftSidebar/NavigationMenu';
import { CategorySection } from '@/components/layout/LeftSidebar/CategorySection';
import { DMList } from '@/components/layout/LeftSidebar/DMList';
import { AppConnectList } from '@/components/layout/LeftSidebar/AppConnectList';
import { SidebarFooter } from '@/components/layout/LeftSidebar/SidebarFooter';
import { FavoritesList } from '@/components/layout/LeftSidebar/FavoritesList';
import './LeftSidebar.module.css';

import { useMessages } from 'next-intl';
import { useChatStore } from '@/core/store/chat';

export const LeftSidebar = ({
  currentWorkspace,
  workspaces,
  categories,
  dms,
  users,
  currentUser,
  currentChannelId,
  currentView,
  permissions = {},
  currentMembership = {},
  onSelectChannel,
  onSelectView,
  onSwitchWorkspace,
  onOpenProfileModal,
  onNavigateToSettings,
  onNavigateToUserSettings,
  onNavigateToCreateWorkspace,
  onOpenModal,
  onCollapse,
}) => {
  const [isWorkspaceDropdownOpen, setIsWorkspaceDropdownOpen] = useState(false);
  const messages = useMessages();
  const s = { ...(messages?.common ?? {}), ...messages };
  const favoriteChannels = useChatStore((state) => state.favoriteChannels);
  const toggleFavoriteChannel = useChatStore((state) => state.toggleFavoriteChannel);
  const {
    canManageWorkspace = false,
    canInviteMembers = false,
    canManageCategories = false,
    canManageAppConnect = false,
  } = permissions;
  const categoryList = Array.isArray(categories) ? categories : [];
  const channelCategories = categoryList.filter(
    (category) => category.section !== 'appConnect',
  );
  const channelsIndex = useMemo(() => {
    const map = {};
    channelCategories.forEach((category) => {
      category.channels.forEach((channel) => {
        map[channel.id] = {
          ...channel,
          categoryId: category.id,
          categoryName: category.name,
        };
      });
    });
    return map;
  }, [channelCategories]);

  // 워크스페이스 데이터가 없으면 로딩 상태 표시
  if (!currentWorkspace) {
    return (
      <aside className="left-sidebar">
        <header className="sidebar-header">
          <h1 className="sidebar-header__title">{'\u00A0'}</h1>
          <button onClick={onCollapse} className="sidebar-header__collapse-button">
            <ChevronsLeft size={18} />
          </button>
        </header>
      </aside>
    );
  }

  return (
    <aside className="left-sidebar">
      <header
        className="sidebar-header"
        onClick={() => setIsWorkspaceDropdownOpen(!isWorkspaceDropdownOpen)}
      >
        <h1 className="sidebar-header__title">{currentWorkspace?.name || '\u00A0'}</h1>
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
        permissions={{ canManageWorkspace, canInviteMembers }}
        currentMembership={currentMembership}
      />

      <NavigationMenu currentView={currentView} onSelectView={onSelectView} />

      <nav className="sidebar-nav">
        <FavoritesList
          label={s.favorites?.title ?? 'Favorites'}
          emptyLabel={s.favorites?.empty ?? 'No favourite channels yet.'}
          channelsIndex={channelsIndex}
          favoriteChannels={favoriteChannels}
          currentChannelId={currentChannelId}
          currentView={currentView}
          onSelectChannel={onSelectChannel}
          onToggleFavorite={toggleFavoriteChannel}
        />

        <div className="nav-group">
          <div className="nav-group__header">
            <span>{s.categories ?? s.channels}</span>
            {canManageCategories && (
              <button
                className="nav-category__add-button"
                onClick={() => onOpenModal('createCategory')}
              >
                <Plus size={14} />
              </button>
            )}
          </div>
          {channelCategories.map(category => (
            <CategorySection
              key={category.id}
              category={category}
              currentChannelId={currentChannelId}
              currentView={currentView}
              onSelectChannel={onSelectChannel}
              onOpenModal={onOpenModal}
              favoriteChannels={favoriteChannels}
              onToggleFavorite={toggleFavoriteChannel}
              canManage={canManageCategories}
            />
          ))}
        </div>

        <DMList
          dms={dms}
          users={users}
          currentUser={currentUser}
          currentChannelId={currentChannelId}
          currentView={currentView}
          onSelectChannel={onSelectChannel}
          onOpenModal={onOpenModal}
        />

        <AppConnectList onOpenModal={onOpenModal} canManage={canManageAppConnect} />
      </nav>

      <SidebarFooter
        currentUser={currentUser}
        onOpenProfileModal={onOpenProfileModal}
        onNavigateToUserSettings={onNavigateToUserSettings}
        onOpenModal={onOpenModal}
      />
    </aside>
  );
};
