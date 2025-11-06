'use client';

import useStrings from '@/hooks/useStrings';
import styles from './IntegrationsTab.module.css';

export const IntegrationsTab = () => {
  const s = useStrings();

  return (
    <div>
      <h2 className="settings-content__header">{s.workspaceAdmin.integrationsTitle}</h2>
      <p className={styles.description}>
        {s.workspaceAdmin.integrationsDescription}
      </p>
      <div className="channel-modal__list">
        <div className={`channel-modal__list-item ${styles.integrationItem}`}>
          <div>
            <strong>Slack Sync</strong>
            <div className={styles.integrationDetails}>
              채널 메시지 양방향 동기화
            </div>
          </div>
          <span className={`${styles.status} ${styles.activeStatus}`}>
            {s.workspaceAdmin.integrationsStatusActive}
          </span>
        </div>
        <div className={`channel-modal__list-item ${styles.integrationItem}`}>
          <div>
            <strong>Jira</strong>
            <div className={styles.integrationDetails}>
              이슈 상태와 알림 연동
            </div>
          </div>
          <span className={`${styles.status} ${styles.pausedStatus}`}>
            {s.workspaceAdmin.integrationsStatusPaused}
          </span>
        </div>
        <div className={`channel-modal__list-item ${styles.integrationItem}`}>
          <div>
            <strong>Notion</strong>
            <div className={styles.integrationDetails}>
              페이지 댓글을 채널로 공유
            </div>
          </div>
          <span className={`${styles.status} ${styles.requestStatus}`}>
            {s.workspaceAdmin.integrationsStatusRequest}
          </span>
        </div>
      </div>
    </div>
  );
};
