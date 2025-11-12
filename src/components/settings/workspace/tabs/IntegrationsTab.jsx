'use client';

import { useMessages } from 'next-intl';
import styles from './IntegrationsTab.module.css';

export const IntegrationsTab = () => {
  const messages = useMessages();
  const t = messages?.workspaceManagement?.integrations;

  if (!t) {
    return null;
  }

  return (
    <div>
      <h2 className="settings-content__header">{t.title}</h2>
      <p className={styles.description}>
        {t.description}
      </p>
      <div className="channel-modal__list">
        <div className={`channel-modal__list-item ${styles.integrationItem}`}>
          <div>
            <strong>{t.slack.title}</strong>
            <div className={styles.integrationDetails}>
              {t.slack.description}
            </div>
          </div>
          <span className={`${styles.status} ${styles.activeStatus}`}>
            {t.statusActive}
          </span>
        </div>
        <div className={`channel-modal__list-item ${styles.integrationItem}`}>
          <div>
            <strong>{t.jira.title}</strong>
            <div className={styles.integrationDetails}>
              {t.jira.description}
            </div>
          </div>
          <span className={`${styles.status} ${styles.pausedStatus}`}>
            {t.statusPaused}
          </span>
        </div>
        <div className={`channel-modal__list-item ${styles.integrationItem}`}>
          <div>
            <strong>{t.notion.title}</strong>
            <div className={styles.integrationDetails}>
              {t.notion.description}
            </div>
          </div>
          <span className={`${styles.status} ${styles.requestStatus}`}>
            {t.statusRequest}
          </span>
        </div>
      </div>
    </div>
  );
};
