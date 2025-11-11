'use client';

import { useMessages } from 'next-intl';
import styles from './SecurityTab.module.css';

export const SecurityTab = () => {
  const messages = useMessages();
  const s = { ...(messages?.common ?? {}), ...messages };

  return (
    <div>
      <h2 className="settings-content__header">{s.workspaceAdmin.securityTitle}</h2>
      <p className={styles.description}>
        {s.workspaceAdmin.securityDescription}
      </p>
      <div className="settings-form-group">
        <label htmlFor="retention">{s.workspaceAdmin.retentionLabel}</label>
        <input id="retention" type="number" defaultValue={180} />
      </div>
      <div className="settings-form-group">
        <label>
          <input type="checkbox" /> {s.workspaceAdmin.twoFactorLabel}
        </label>
      </div>
      <button className="profile-modal__save-button">{s.workspaceAdmin.saveChanges}</button>
    </div>
  );
};
