import { X, Check, Trash2, CheckCheck } from 'lucide-react';
import styles from '../InboxModal.module.css';

export const InboxTabs = ({ activeTab, onTabChange, strings }) => {
  return (
    <div className={styles['inbox-tabs']}>
      <button
        className={activeTab === 'all' ? `${styles['inbox-tab']} ${styles.active}` : styles['inbox-tab']}
        onClick={() => onTabChange('all')}
      >
        {strings.tabs?.all ?? 'All'}
      </button>
      <button
        className={activeTab === 'important' ? `${styles['inbox-tab']} ${styles.active}` : styles['inbox-tab']}
        onClick={() => onTabChange('important')}
      >
        {strings.tabs?.important ?? 'Important'}
      </button>
      <button
        className={activeTab === 'byWorkspace' ? `${styles['inbox-tab']} ${styles.active}` : styles['inbox-tab']}
        onClick={() => onTabChange('byWorkspace')}
      >
        {strings.tabs?.byWorkspace ?? 'By Workspace'}
      </button>
    </div>
  );
};
