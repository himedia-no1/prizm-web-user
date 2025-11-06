'use client';

import useStrings from '@/hooks/useStrings';

export const AuditTab = ({ activities }) => {
  const s = useStrings();

  return (
    <div>
      <h2 className="settings-content__header">{s.workspaceAdmin.auditLogTitle}</h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
        {s.workspaceAdmin.auditLogDescription}
      </p>
      <div className="channel-modal__list">
        {activities.map((log) => (
          <div key={log.id} className="channel-modal__list-item" style={{ padding: '0.75rem 0' }}>
            <span>
              <strong>{log.action}</strong>
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{log.details}</div>
            </span>
            <span style={{ marginLeft: 'auto', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              {log.time}
            </span>
          </div>
        ))}
      </div>
      <button className="profile-modal__save-button" style={{ width: 'auto' }}>
        {s.workspaceAdmin.auditViewMore}
      </button>
    </div>
  );
};
