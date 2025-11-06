import { mockRecentActivities } from '@/__mocks__/users';
import { mockWorkspaceMembers } from '@/__mocks__/workspaces';
import { mockCategories } from '@/__mocks__/categories';
import { mockMessages } from '@/__mocks__/messages';
import styles from '../WorkspaceSettings.module.css';

export const OverviewTab = ({ strings }) => {
  const workspaceId = 'ws1';
  const membersCount = Object.keys(mockWorkspaceMembers[workspaceId] ?? {}).length;
  const channelCount = mockCategories
    .filter((category) => category.section === 'channels')
    .reduce((total, category) => total + (category.channels?.length ?? 0), 0);
  const messageCount = mockMessages.filter((msg) => msg.channelId && msg.channelId.startsWith('c')).length;
  const activeToday = mockRecentActivities.length;

  const computedStats = [
    {
      id: 'members',
      label: strings.overview?.totalMembers ?? '멤버',
      value: membersCount,
    },
    {
      id: 'channels',
      label: strings.overview?.totalChannels ?? '채널',
      value: channelCount,
    },
    {
      id: 'messages',
      label: strings.overview?.totalMessages ?? '메시지',
      value: messageCount,
    },
    {
      id: 'active',
      label: strings.overview?.activeToday ?? '오늘 활동',
      value: activeToday,
    },
  ];

  return (
    <div className={styles.tabContent}>
      <section className={styles.section}>
        <h2>{strings.overview?.statsTitle ?? '워크스페이스 통계'}</h2>
        <div className={styles.statsGrid}>
          {computedStats.map((stat) => (
            <div key={stat.id} className={styles.statCard}>
              <span className={styles.statLabel}>{stat.label}</span>
              <span className={styles.statValue}>{stat.value}</span>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2>{strings.overview?.recentActivity ?? '최근 활동'}</h2>
        <ul className={styles.activityList}>
          {mockRecentActivities.length > 0 ? (
            mockRecentActivities.map((activity) => (
              <li key={activity.id}>
                <img
                  src={activity.user.avatar}
                  alt={activity.user.name}
                  className={styles.activityAvatar}
                />
                <div className={styles.activityDetails}>
                  <span className={styles.activityUser}>{activity.user.name}</span>
                  <span className={styles.activityAction}>
                    {activity.action}
                    {activity.details ? ` • ${activity.details}` : ''}
                  </span>
                </div>
                <span className={styles.activityTime}>{activity.time}</span>
              </li>
            ))
          ) : (
            <li className={styles.activityEmpty}>
              {strings.overview?.noActivity ?? '최근 활동이 없습니다.'}
            </li>
          )}
        </ul>
      </section>
    </div>
  );
};
