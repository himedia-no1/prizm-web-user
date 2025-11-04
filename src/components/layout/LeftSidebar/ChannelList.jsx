'use client';

import React from 'react';
import { mockCategories } from '@/__mocks__';
import { CategorySection } from './CategorySection';
import { DMList } from './DMList';
import styles from './LeftSidebar.module.css';

export const ChannelList = ({
  currentChannelId,
  currentView,
  onSelectChannel,
}) => {
  return (
    <nav className={styles.sidebarNav}>
      <div className={styles.navGroup}>
        <div className={styles.navGroupHeader}>
          <span>Channels</span>
        </div>
        {mockCategories.map((category) => (
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
        currentChannelId={currentChannelId}
        currentView={currentView}
        onSelectChannel={onSelectChannel}
      />
    </nav>
  );
};
