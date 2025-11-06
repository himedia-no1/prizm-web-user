'use client';

import useStrings from '@/hooks/useStrings';

export const DevicesTab = ({ deviceSessions }) => {
  const s = useStrings();

  return (
    <div>
      <h2 className="settings-content__header">{s.userSettings?.devices?.title ?? '로그인된 기기'}</h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
        {s.userSettings?.devices?.description ?? '현재 로그인 중인 기기를 확인하고 원격으로 로그아웃할 수 있습니다.'}
      </p>
      <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid var(--border)', borderRadius: '0.75rem', overflow: 'hidden' }}>
        <thead style={{ backgroundColor: 'var(--card-bg)' }}>
          <tr style={{ textAlign: 'left' }}>
            <th style={{ padding: '0.75rem', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-secondary)' }}>
              {s.userSettings?.devices?.table?.device ?? '기기'}
            </th>
            <th style={{ padding: '0.75rem', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-secondary)' }}>
              {s.userSettings?.devices?.table?.location ?? '위치'}
            </th>
            <th style={{ padding: '0.75rem', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-secondary)' }}>
              {s.userSettings?.devices?.table?.loggedInAt ?? '로그인 시각'}
            </th>
            <th style={{ padding: '0.75rem', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-secondary)' }}>
              {s.userSettings?.devices?.table?.lastActive ?? '마지막 활동'}
            </th>
            <th style={{ padding: '0.75rem', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-secondary)' }}>
              {s.userSettings?.devices?.table?.action ?? '조치'}
            </th>
          </tr>
        </thead>
        <tbody>
          {deviceSessions.map((session) => (
            <tr key={session.id} style={{ borderTop: '1px solid var(--border)' }}>
              <td style={{ padding: '0.75rem', fontWeight: 600 }}>{session.device}</td>
              <td style={{ padding: '0.75rem', color: 'var(--text-secondary)' }}>{session.location}</td>
              <td style={{ padding: '0.75rem', color: 'var(--text-tertiary)' }}>{session.loggedInAt}</td>
              <td style={{ padding: '0.75rem', color: 'var(--text-tertiary)' }}>{session.lastActive}</td>
              <td style={{ padding: '0.75rem' }}>
                <button className="profile-action-button" style={{ padding: '0.4rem 0.75rem' }}>
                  {s.userSettings?.devices?.revoke ?? '이 기기에서 로그아웃'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
