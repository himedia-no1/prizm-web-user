import Image from 'next/image';
import styles from '../WorkspaceSettings.module.css';
import { getPlaceholderImage } from '@/shared/utils/imagePlaceholder';

export const OverviewTab = ({ strings, membersCount = 0, channelCount = 0, messageCount = 0, activities = [] }) => {
  const activeToday = activities.length;

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
          {activities.length > 0 ? (
            activities.map((activity) => {
              const avatarSrc =
                activity.user.avatar ||
                getPlaceholderImage(32, activity.user?.name?.[0] ?? '?');
              return (
              <li key={activity.id}>
                <Image
                  src={avatarSrc}
                  alt={activity.user.name}
                  width={32}
                  height={32}
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
              );
            })
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
