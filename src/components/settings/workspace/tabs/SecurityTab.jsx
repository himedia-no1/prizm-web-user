'use client';

import useStrings from '@/hooks/useStrings';

export const SecurityTab = () => {
  const s = useStrings();

  return (
    <div>
      <h2 className="settings-content__header">{s.workspaceAdmin.securityTitle}</h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
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
