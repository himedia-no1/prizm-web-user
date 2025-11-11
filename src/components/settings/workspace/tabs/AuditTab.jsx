'use client';

import { useMessages } from 'next-intl';
import styles from './AuditTab.module.css';

export const AuditTab = ({ activities }) => {
  const messages = useMessages();
  const s = { ...(messages?.common ?? {}), ...messages };

  return (
    <div>
      <h2 className="settings-content__header">{s.workspaceAdmin.auditLogTitle}</h2>
      <p className={styles.description}>
        {s.workspaceAdmin.auditLogDescription}
      </p>
      <div className="channel-modal__list">
        {activities.map((log) => (
          <div key={log.id} className={`channel-modal__list-item ${styles.logItem}`}>
            <span>
              <strong>{log.action}</strong>
              <div className={styles.logDetails}>{log.details}</div>
            </span>
            <span className={styles.logTime}>
              {log.time}
            </span>
          </div>
        ))}
      </div>
      <button className={`profile-modal__save-button ${styles.viewMoreButton}`}>
        {s.workspaceAdmin.auditViewMore}
      </button>
    </div>
  );
};
