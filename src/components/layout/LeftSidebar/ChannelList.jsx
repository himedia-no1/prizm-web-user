'use client';

import React, { useEffect } from 'react';
import { CategorySection } from './CategorySection';
import { DMList } from './DMList';
import styles from './LeftSidebar.module.css';
import { useWorkspaceStore } from '@/core/store/workspace';
import useDataStore from '@/core/store/dataStore';

export const ChannelList = ({
  currentChannelId,
  currentView,
  onSelectChannel,
  onOpenModal,
  favoriteChannels,
  onToggleFavorite,
}) => {
  const categories = useWorkspaceStore((state) => state.categories);
  const currentWorkspaceRole = useWorkspaceStore((state) => state.currentWorkspaceRole);
  const loadInitialData = useDataStore((state) => state.loadInitialData);
  const initialized = useDataStore((state) => state.initialized);

  useEffect(() => {
    if (!initialized) {
      loadInitialData().catch((error) => {
        console.error('Failed to load categories:', error);
      });
    }
  }, [initialized, loadInitialData]);

  const categoryList = categories ?? [];
  const canManage = currentWorkspaceRole === 'OWNER' || currentWorkspaceRole === 'MANAGER';

  return (
    <nav className={styles.sidebarNav}>
      <div className={styles.navGroup}>
        <div className={styles.navGroupHeader}>
          <span>Channels</span>
        </div>
        {categoryList.map((category) => (
          <CategorySection
            key={category.id}
            category={category}
            currentChannelId={currentChannelId}
            currentView={currentView}
            onSelectChannel={onSelectChannel}
            onOpenModal={onOpenModal}
            favoriteChannels={favoriteChannels}
            onToggleFavorite={onToggleFavorite}
            canManage={canManage}
          />
        ))}
      </div>

      <DMList
        currentChannelId={currentChannelId}
        currentView={currentView}
        onSelectChannel={onSelectChannel}
      />
    </nav>
  );
};
