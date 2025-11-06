'use client';

import useStrings from '@/hooks/useStrings';

export const MembersTab = ({ 
  blockedMembers, 
  participants, 
  membershipHistory 
}) => {
  const s = useStrings();

  const getHistoryMessage = (action) => {
    switch (action) {
      case 'join':
        return s.workspaceAdmin.membersHistoryActionJoin;
      case 'leave':
        return s.workspaceAdmin.membersHistoryActionLeave;
      default:
        return s.workspaceAdmin.membersHistoryActionInvited;
    }
  };

  return (
    <div>
      <h2 className="settings-content__header">{s.workspaceAdmin.membersTitle}</h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
        {s.workspaceAdmin.membersDescription}
      </p>

      <section style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.05rem', fontWeight: 600 }}>{s.workspaceAdmin.membersBlockedTitle}</h3>
        <p style={{ color: 'var(--text-secondary)', margin: '0.35rem 0 1rem' }}>
          {s.workspaceAdmin.membersBlockedDescription}
        </p>
        {blockedMembers.length === 0 ? (
          <p style={{ color: 'var(--text-tertiary)', fontSize: '0.9rem' }}>
            {s.workspaceAdmin.membersBlockedEmpty}
          </p>
        ) : (
          <div className="channel-modal__list">
            {blockedMembers.map((blocked) => (
              <div
                key={blocked.id}
                className="channel-modal__list-item member"
                style={{ alignItems: 'center', gap: '1rem', padding: '0.75rem 0' }}
              >
                <span style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem', flex: 1 }}>
                  <strong>{blocked.name}</strong>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{blocked.email}</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>
                    {blocked.reason} · {blocked.blockedAt}
                  </span>
                </span>
                <button className="profile-action-button" style={{ padding: '0.4rem 0.75rem' }}>
                  {s.workspaceAdmin.membersBlockedUnblock}
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.05rem', fontWeight: 600 }}>{s.workspaceAdmin.membersParticipantsTitle}</h3>
        <p style={{ color: 'var(--text-secondary)', margin: '0.35rem 0 1rem' }}>
          {s.workspaceAdmin.membersParticipantsDescription}
        </p>
        <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
          <button className="profile-modal__save-button" style={{ width: 'auto' }}>
            {s.workspaceAdmin.membersExport}
          </button>
          <button className="profile-modal__save-button" style={{ width: 'auto', background: 'var(--primary-light)' }}>
            {s.workspaceAdmin.membersMoveToGroup}
          </button>
          <button className="profile-modal__save-button" style={{ width: 'auto' }}>
            {s.workspaceAdmin.inviteMember}
          </button>
        </div>
        <div className="channel-modal__list">
          {participants.map((participant) => (
            <div
              key={participant.id}
              className="channel-modal__list-item member"
              style={{ alignItems: 'center', gap: '1rem', padding: '0.75rem 0' }}
            >
              <input type="checkbox" style={{ margin: 0 }} />
              <img src={participant.avatar} alt={participant.displayName} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', flex: 1 }}>
                <strong>{participant.name}</strong>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  {participant.displayName} · {participant.email}
                </span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>
                  {participant.type} · {participant.group}
                </span>
              </div>
              <span
                style={{
                  fontSize: '0.8rem',
                  color: participant.status === 'online' ? '#16a34a' : 'var(--text-secondary)',
                  textTransform: 'capitalize',
                }}
              >
                {participant.status}
              </span>
              <button className="profile-action-button" style={{ padding: '0.4rem 0.75rem' }}>
                {s.workspaceAdmin.membersMoveToGroup}
              </button>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h3 style={{ fontSize: '1.05rem', fontWeight: 600 }}>{s.workspaceAdmin.membersHistoryTitle}</h3>
        <p style={{ color: 'var(--text-secondary)', margin: '0.35rem 0 1rem' }}>
          {s.workspaceAdmin.membersHistoryDescription}
        </p>
        {membershipHistory.length === 0 ? (
          <p style={{ color: 'var(--text-tertiary)', fontSize: '0.9rem' }}>
            {s.workspaceAdmin.membersHistoryEmpty}
          </p>
        ) : (
          <div className="channel-modal__list">
            {membershipHistory.map((entry) => (
              <div
                key={entry.id}
                className="channel-modal__list-item"
                style={{ padding: '0.75rem 0', gap: '1rem' }}
              >
                <span style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', flex: 1 }}>
                  <strong>{entry.name}</strong>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    {getHistoryMessage(entry.action)}
                  </span>
                </span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>{entry.timestamp}</span>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
