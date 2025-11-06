'use client';

import useStrings from '@/hooks/useStrings';

export const GroupsTab = ({ 
  groups, 
  workspaceChannels, 
  groupPermissions, 
  onToggleGroupChannel 
}) => {
  const s = useStrings();

  return (
    <div>
      <h2 className="settings-content__header">{s.workspaceAdmin.groupsTitle}</h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
        {s.workspaceAdmin.groupsDescription}
      </p>

      <button className="profile-modal__save-button" style={{ width: 'auto', marginBottom: '1.5rem' }}>
        {s.workspaceAdmin.groupsCreate}
      </button>

      <div className="channel-modal__list" style={{ gap: '1.25rem' }}>
        {groups.map((group) => {
          const assignedChannels = groupPermissions[group.id] || [];
          return (
            <div
              key={group.id}
              className="channel-modal__list-item"
              style={{
                flexDirection: 'column',
                alignItems: 'stretch',
                gap: '1rem',
                border: '1px solid var(--border)',
                borderRadius: '0.85rem',
                padding: '1.25rem',
                background: 'var(--card-bg)',
                boxShadow: '0 1px 3px var(--shadow)',
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <strong style={{ fontSize: '1rem' }}>{group.name}</strong>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    {s.workspaceAdmin.groupsMembersLabel}: {group.members}
                  </span>
                </div>
                <p style={{ margin: '0.4rem 0 0', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                  {group.description}
                </p>
              </div>

              <div>
                <h4 style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                  {s.workspaceAdmin.groupsChannelsLabel}
                </h4>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
                    gap: '0.5rem 1rem',
                  }}
                >
                  {workspaceChannels.map((channel) => (
                    <label
                      key={`${group.id}-${channel}`}
                      style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}
                    >
                      <input
                        type="checkbox"
                        checked={assignedChannels.includes(channel)}
                        onChange={() => onToggleGroupChannel(group.id, channel)}
                      />
                      <span>#{channel}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button className="profile-modal__save-button" style={{ width: 'auto' }}>
                  {s.workspaceAdmin.groupsSave}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
