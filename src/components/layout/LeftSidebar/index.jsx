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

import useStrings from '@/hooks/useStrings';
import useStore from '@/store/useStore';

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
  const favoriteChannels = useStore((state) => state.favoriteChannels);
  const toggleFavoriteChannel = useStore((state) => state.toggleFavoriteChannel);
  const categoryList = Array.isArray(categories) ? categories : [];
  const channelCategories = categoryList.filter(
    (category) => category.section !== 'appConnect',
  );
  const appConnectCategories = categoryList.filter(
    (category) => category.section === 'appConnect',
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

  const handleOpenFavoriteModal = () => {
    const channelOptions = Object.values(channelsIndex).map((channel) => ({
      id: channel.id,
      name: channel.name,
      categoryName: channel.categoryName,
    }));
    onOpenModal('addFavorite', { channels: channelOptions });
  };

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
        <FavoritesList
          label={s.favorites ?? 'Favorites'}
          emptyLabel={s.favoritesEmpty ?? 'No favourite channels yet.'}
          channelsIndex={channelsIndex}
          favoriteChannels={favoriteChannels}
          currentChannelId={currentChannelId}
          currentView={currentView}
          onSelectChannel={onSelectChannel}
          onToggleFavorite={toggleFavoriteChannel}
          onOpenFavoriteModal={handleOpenFavoriteModal}
        />

        <div className="nav-group">
          <div className="nav-group__header">
            <span>{s.categories ?? s.channels}</span>
            <button className="nav-category__add-button" onClick={() => onOpenModal('createCategory')}>
              <Plus size={14} />
            </button>
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

        <AppConnectList onOpenModal={onOpenModal} />
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
