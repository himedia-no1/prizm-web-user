import React from 'react';
import styles from './SearchTabs.module.css';

const SearchTabs = ({ tabs, activeTab, onTabClick }) => {
  return (
    <div className={styles.tabGroup}>
      {tabs.map((tab) => {
        const Icon = tab.icon;
        return (
          <button
            key={tab.id}
            type="button"
            className={`${styles.filterChip} ${activeTab === tab.id ? styles.filterChipActive : ''}`}
            onClick={() => onTabClick(tab.id)}
          >
            <Icon size={14} />
            <span>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default SearchTabs;
