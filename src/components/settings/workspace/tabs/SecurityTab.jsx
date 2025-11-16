'use client';

import { useMessages } from 'next-intl';
import styles from './SecurityTab.module.css';

export const SecurityTab = () => {
  const messages = useMessages();
  const s = { ...(messages?.common ?? {}), ...messages };

  return (
    <div>
      <h2 className="settings-content__header">{s.workspaceManagement.securityTitle}</h2>
      <p className={styles.description}>
        {s.workspaceManagement.securityDescription}
      </p>
      <div className="settings-form-group">
        <label htmlFor="retention">{s.workspaceManagement.retentionLabel}</label>
        <input id="retention" type="number" defaultValue={180} />
      </div>
      <div className="settings-form-group">
        <label>
          <input type="checkbox" /> {s.workspaceManagement.twoFactorLabel}
        </label>
      </div>
      <button className="profile-modal__save-button">{s.workspaceManagement.saveChanges}</button>
    </div>
  );
};
