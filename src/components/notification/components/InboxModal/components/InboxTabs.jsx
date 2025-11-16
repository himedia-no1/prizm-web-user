import styles from '../../InboxModal.module.css';

export const InboxTabs = ({ activeTab, onTabChange, strings }) => (
  <div className={styles.tabs}>
    <button
      className={`${styles.tab} ${activeTab === 'all' ? styles.tabActive : ''}`}
      onClick={() => onTabChange('all')}
    >
      {strings.tabs?.all ?? 'All'}
    </button>
    <button
      className={`${styles.tab} ${activeTab === 'important' ? styles.tabActive : ''}`}
      onClick={() => onTabChange('important')}
    >
      {strings.tabs?.important ?? 'Important'}
    </button>
    <button
      className={`${styles.tab} ${activeTab === 'byWorkspace' ? styles.tabActive : ''}`}
      onClick={() => onTabChange('byWorkspace')}
    >
      {strings.tabs?.byWorkspace ?? 'By Workspace'}
    </button>
  </div>
);
