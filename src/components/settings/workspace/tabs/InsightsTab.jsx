'use client';

import Image from 'next/image';
import { useMessages } from 'next-intl';
import styles from './InsightsTab.module.css';
import { getPlaceholderImage } from '@/shared/utils/imagePlaceholder';

export const InsightsTab = ({ stats, activities }) => {
  const messages = useMessages();
  const s = { ...(messages?.common ?? {}), ...messages };

  return (
    <div>
      <h2 className="settings-content__header">{s.workspaceAdmin.dashboardTitle}</h2>
      <p className={styles.description}>
        {s.workspaceAdmin.dashboardSubtitle}
      </p>
      <div className={styles.statsGrid}>
        {stats.map((stat) => (
          <div
            key={stat.id}
            className={styles.statCard}
          >
            <div className={styles.statValue}>{stat.value}</div>
            <div className={styles.statLabel}>{stat.label}</div>
            <div className={styles.statTrend}>{stat.trend}</div>
          </div>
        ))}
      </div>

      <div className={styles.sectionsGrid}>
        <div>
          <h3 className={styles.sectionTitle}>
            {s.workspaceAdmin.workspaceOverviewTitle}
          </h3>
          <p className={styles.sectionDescription}>
            {s.workspaceAdmin.workspaceOverviewDescription}
          </p>
          <div className="settings-form-group">
            <label htmlFor="ws-name">{s.workspaceAdmin.workspaceNameLabel}</label>
            <input id="ws-name" type="text" defaultValue="Prizm Dev" />
          </div>
          <div className="settings-form-group">
            <label htmlFor="ws-desc">{s.workspaceAdmin.workspaceDescriptionLabel}</label>
            <textarea
              id="ws-desc"
              rows={3}
              defaultValue="프리즘 팀이 협업하고 작업물을 공유하는 공식 워크스페이스입니다."
            />
          </div>
          <button className="profile-modal__save-button">{s.workspaceAdmin.saveChanges}</button>
        </div>

        <div>
          <h3 className={styles.sectionTitle}>
            {s.workspaceAdmin.recentActivity}
          </h3>
          <div className="channel-modal__list">
            {activities.map((activity) => {
              const avatarSrc =
                activity.user.avatar ||
                getPlaceholderImage(32, activity.user?.name?.[0] ?? '?');
              return (
                <div key={activity.id} className={`channel-modal__list-item member ${styles.activityItem}`}>
                  <Image
                    src={avatarSrc}
                    alt={activity.user.name}
                    width={32}
                    height={32}
                    className={styles.activityAvatar}
                  />
                  <span className={styles.activityDetails}>
                    <span>{activity.action}</span>
                    <span className={styles.activityInfo}>{activity.details}</span>
                  </span>
                  <span className={styles.activityTime}>{activity.time}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
