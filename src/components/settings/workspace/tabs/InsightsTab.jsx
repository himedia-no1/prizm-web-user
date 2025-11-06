'use client';

import useStrings from '@/hooks/useStrings';

export const InsightsTab = ({ stats, activities }) => {
  const s = useStrings();

  return (
    <div>
      <h2 className="settings-content__header">{s.workspaceAdmin.dashboardTitle}</h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
        {s.workspaceAdmin.dashboardSubtitle}
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
        {stats.map((stat) => (
          <div
            key={stat.id}
            style={{
              border: '1px solid var(--border)',
              borderRadius: '0.75rem',
              padding: '1.25rem',
              background: 'var(--card-bg)',
              boxShadow: '0 1px 3px var(--shadow)',
            }}
          >
            <div style={{ fontSize: '1.75rem', fontWeight: 600, color: 'var(--text)' }}>{stat.value}</div>
            <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{stat.label}</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--primary)', marginTop: '0.5rem' }}>{stat.trend}</div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '2rem', display: 'grid', gap: '1.25rem' }}>
        <div>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 600, marginBottom: '1rem' }}>
            {s.workspaceAdmin.workspaceOverviewTitle}
          </h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
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
          <h3 style={{ fontSize: '1.15rem', fontWeight: 600, marginBottom: '1rem' }}>
            {s.workspaceAdmin.recentActivity}
          </h3>
          <div className="channel-modal__list">
            {activities.map((activity) => (
              <div key={activity.id} className="channel-modal__list-item member" style={{ padding: '0.75rem 0' }}>
                <img src={activity.user.avatar} alt={activity.user.name} style={{ width: 32, height: 32 }} />
                <span style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                  <span>{activity.action}</span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{activity.details}</span>
                </span>
                <span style={{ marginLeft: 'auto', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  {activity.time}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
