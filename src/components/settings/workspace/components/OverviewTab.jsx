import { mockUsers, mockRecentActivities } from '@/__mocks__/users';
import { mockWorkspaceStats } from '@/__mocks__/workspaces';
import styles from '../WorkspaceSettings.module.css';

export const OverviewTab = ({ strings }) => {
  const stats = mockWorkspaceStats['ws1'] || {};

  return (
    <div className={styles.tabContent}>
      <section className={styles.section}>
        <h2>{strings.overview?.statsTitle ?? '워크스페이스 통계'}</h2>
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <span className={styles.statLabel}>{strings.overview?.totalMembers ?? '멤버'}</span>
            <span className={styles.statValue}>{stats.totalMembers ?? 0}</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statLabel}>{strings.overview?.totalChannels ?? '채널'}</span>
            <span className={styles.statValue}>{stats.totalChannels ?? 0}</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statLabel}>{strings.overview?.totalMessages ?? '메시지'}</span>
            <span className={styles.statValue}>{stats.totalMessages ?? 0}</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statLabel}>{strings.overview?.activeToday ?? '오늘 활동'}</span>
            <span className={styles.statValue}>{stats.activeToday ?? 0}</span>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <h2>{strings.overview?.recentActivity ?? '최근 활동'}</h2>
        <ul className={styles.activityList}>
          {mockRecentActivities.map((activity) => (
            <li key={activity.id}>
              <span className={styles.activityUser}>{activity.user}</span>
              <span className={styles.activityAction}>{activity.action}</span>
              <span className={styles.activityTime}>{activity.timestamp}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};
