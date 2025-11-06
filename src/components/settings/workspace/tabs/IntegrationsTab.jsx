'use client';

import useStrings from '@/hooks/useStrings';

export const IntegrationsTab = () => {
  const s = useStrings();

  return (
    <div>
      <h2 className="settings-content__header">{s.workspaceAdmin.integrationsTitle}</h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
        {s.workspaceAdmin.integrationsDescription}
      </p>
      <div className="channel-modal__list">
        <div className="channel-modal__list-item" style={{ gap: '1rem' }}>
          <div>
            <strong>Slack Sync</strong>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
              채널 메시지 양방향 동기화
            </div>
          </div>
          <span style={{ marginLeft: 'auto', color: '#22c55e', fontSize: '0.85rem' }}>
            {s.workspaceAdmin.integrationsStatusActive}
          </span>
        </div>
        <div className="channel-modal__list-item" style={{ gap: '1rem' }}>
          <div>
            <strong>Jira</strong>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
              이슈 상태와 알림 연동
            </div>
          </div>
          <span style={{ marginLeft: 'auto', color: '#eab308', fontSize: '0.85rem' }}>
            {s.workspaceAdmin.integrationsStatusPaused}
          </span>
        </div>
        <div className="channel-modal__list-item" style={{ gap: '1rem' }}>
          <div>
            <strong>Notion</strong>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
              페이지 댓글을 채널로 공유
            </div>
          </div>
          <span style={{ marginLeft: 'auto', color: '#3b82f6', fontSize: '0.85rem' }}>
            {s.workspaceAdmin.integrationsStatusRequest}
          </span>
        </div>
      </div>
    </div>
  );
};
