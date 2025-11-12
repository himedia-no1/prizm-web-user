'use client';

import { useMessages } from 'next-intl';
import styles from './IntegrationsTab.module.css';

export const IntegrationsTab = () => {
  const messages = useMessages();
  const t = messages?.workspaceManagement?.integrations ?? {};

  return (
    <div>
      <h2 className="settings-content__header">{t.title ?? 'Integrations'}</h2>
      <p className={styles.description}>
        {t.description ?? 'Manage integrations with external services'}
      </p>
      <div className="channel-modal__list">
        <div className={`channel-modal__list-item ${styles.integrationItem}`}>
          <div>
            <strong>Slack Sync</strong>
            <div className={styles.integrationDetails}>
              {t.slackDescription ?? '채널 메시지 양방향 동기화'}
            </div>
          </div>
          <span className={`${styles.status} ${styles.activeStatus}`}>
            {t.statusActive ?? 'Active'}
          </span>
        </div>
        <div className={`channel-modal__list-item ${styles.integrationItem}`}>
          <div>
            <strong>Jira</strong>
            <div className={styles.integrationDetails}>
              {t.jiraDescription ?? '이슈 상태와 알림 연동'}
            </div>
          </div>
          <span className={`${styles.status} ${styles.pausedStatus}`}>
            {t.statusPaused ?? 'Paused'}
          </span>
        </div>
        <div className={`channel-modal__list-item ${styles.integrationItem}`}>
          <div>
            <strong>Notion</strong>
            <div className={styles.integrationDetails}>
              {t.notionDescription ?? '페이지 댓글을 채널로 공유'}
            </div>
          </div>
          <span className={`${styles.status} ${styles.requestStatus}`}>
            {t.statusRequest ?? 'Request'}
          </span>
        </div>
      </div>
    </div>
  );
};
