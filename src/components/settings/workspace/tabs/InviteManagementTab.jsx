'use client';

import { Hash, Users } from '@/components/common/icons';
import useStrings from '@/hooks/useStrings';
import { useWorkspaceSettingsStore } from '@/store/workspace/useWorkspaceSettingsStore';

export const InviteManagementTab = ({ invitations, inviteLinks }) => {
  const s = useStrings();
  const { copiedLinkId, copyInviteLink, formatInviteTimestamp, getInviteStatusTone } = 
    useWorkspaceSettingsStore();

  return (
    <div>
      <h2 className="settings-content__header">{s.workspaceAdmin.inviteManagementTitle}</h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
        {s.workspaceAdmin.inviteManagementDescription}
      </p>

      <section style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.05rem', fontWeight: 600 }}>{s.workspaceAdmin.inviteManagementPendingTitle}</h3>
        <p style={{ color: 'var(--text-secondary)', margin: '0.35rem 0 1rem' }}>
          {s.workspaceAdmin.membersInviteStatusDescription}
        </p>
        {invitations.length === 0 ? (
          <p style={{ color: 'var(--text-tertiary)', fontSize: '0.9rem' }}>
            {s.workspaceAdmin.membersInviteStatusEmpty}
          </p>
        ) : (
          <div className="channel-modal__list">
            {invitations.map((invite) => {
              const tone = getInviteStatusTone(invite.status);
              return (
                <div
                  key={invite.id}
                  className="channel-modal__list-item member"
                  style={{ alignItems: 'center', gap: '1rem', padding: '0.75rem 0' }}
                >
                  <span style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', flex: 1 }}>
                    <strong>{invite.email}</strong>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                      {invite.invitedBy} · {invite.sentAt}
                    </span>
                  </span>
                  <span
                    style={{
                      padding: '0.25rem 0.6rem',
                      borderRadius: '9999px',
                      background: tone.background,
                      color: tone.color,
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      textTransform: 'capitalize',
                    }}
                  >
                    {tone.label}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </section>

      <section>
        <h3 style={{ fontSize: '1.05rem', fontWeight: 600 }}>{s.workspaceAdmin.inviteManagementLinksTitle}</h3>
        <p style={{ color: 'var(--text-secondary)', margin: '0.35rem 0 1rem' }}>
          {s.workspaceAdmin.inviteManagementLinksDescription}
        </p>
        {inviteLinks.length === 0 ? (
          <p style={{ color: 'var(--text-tertiary)', fontSize: '0.9rem' }}>
            {s.workspaceAdmin.inviteManagementLinksEmpty}
          </p>
        ) : (
          <div className="channel-modal__list">
            {inviteLinks.map((link) => {
              const baseStrings =
                link.type === 'guest' ? s.modals?.inviteGuest?.link : s.modals?.inviteMember?.link;
              const typeLabel =
                link.type === 'guest'
                  ? s.workspaceAdmin.inviteManagementLinkGuest
                  : s.workspaceAdmin.inviteManagementLinkMember;
              const expirationLabel = baseStrings?.expirationOptions?.[link.expiration] ?? link.expiration;
              const usageLabel = baseStrings?.usageOptions?.[link.usage] ?? link.usage;
              const Icon = link.type === 'guest' ? Hash : Users;

              return (
                <div
                  key={link.id}
                  className="channel-modal__list-item"
                  style={{ gap: '1rem', padding: '0.85rem 0', alignItems: 'center' }}
                >
                  <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', flex: 1 }}>
                    <div
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: '0.75rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'var(--card-bg)',
                        border: '1px solid var(--border)',
                      }}
                    >
                      <Icon size={16} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                        <strong>{typeLabel}</strong>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>{link.id}</span>
                      </div>
                      <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{link.url}</span>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', fontSize: '0.8rem' }}>
                        <span>{expirationLabel}</span>
                        <span>•</span>
                        <span>{usageLabel}</span>
                        <span>•</span>
                        <span>{formatInviteTimestamp(link.createdAt)}</span>
                        <span>•</span>
                        <span>{link.createdBy}</span>
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="profile-action-button"
                    style={{ padding: '0.45rem 0.85rem' }}
                    onClick={() => copyInviteLink(link.id, link.url)}
                  >
                    {copiedLinkId === link.id
                      ? s.workspaceAdmin.inviteManagementCopied
                      : s.workspaceAdmin.inviteManagementCopy}
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};
