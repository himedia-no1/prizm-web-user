'use client';

import { useMessages } from 'next-intl';
import { Hash, Users } from '@/components/common/icons';
import { useWorkspaceSettingsStore } from '@/core/store/workspace/useWorkspaceSettingsStore';
import styles from './InviteManagementTab.module.css';

export const InviteManagementTab = ({ invitations, inviteLinks }) => {
  const messages = useMessages();
  const s = { ...(messages?.common ?? {}), ...messages };
  const { copiedLinkId, copyInviteLink, formatInviteTimestamp, getInviteStatusTone } = 
    useWorkspaceSettingsStore();

  return (
    <div>
      <h2 className="settings-content__header">{s.workspaceManagement.inviteManagementTitle}</h2>
      <p className={styles.description}>
        {s.workspaceManagement.inviteManagementDescription}
      </p>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>{s.workspaceManagement.inviteManagementPendingTitle}</h3>
        <p className={styles.sectionDescription}>
          {s.workspaceManagement.membersInviteStatusDescription}
        </p>
        {invitations.length === 0 ? (
          <p className={styles.empty}>
            {s.workspaceManagement.membersInviteStatusEmpty}
          </p>
        ) : (
          <div className="channel-modal__list">
            {invitations.map((invite) => {
              const tone = getInviteStatusTone(invite.status);
              return (
                <div
                  key={invite.id}
                  className={`channel-modal__list-item member ${styles.inviteItem}`}>
                  <span className={styles.inviteDetails}>
                    <strong>{invite.email}</strong>
                    <span className={styles.inviteMeta}>
                      {invite.invitedBy} · {invite.sentAt}
                    </span>
                  </span>
                  <span
                    className={styles.inviteStatus}
                    style={{ '--status-background': tone.background, '--status-color': tone.color }}
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
        <h3 className={styles.sectionTitle}>{s.workspaceManagement.inviteManagementLinksTitle}</h3>
        <p className={styles.sectionDescription}>
          {s.workspaceManagement.inviteManagementLinksDescription}
        </p>
        {inviteLinks.length === 0 ? (
          <p className={styles.empty}>
            {s.workspaceManagement.inviteManagementLinksEmpty}
          </p>
        ) : (
          <div className="channel-modal__list">
            {inviteLinks.map((link) => {
              const baseStrings =
                link.type === 'guest' ? s.modals?.inviteGuest?.link : s.modals?.inviteMember?.link;
              const typeLabel =
                link.type === 'guest'
                  ? s.workspaceManagement.inviteManagementLinkGuest
                  : s.workspaceManagement.inviteManagementLinkMember;
              const expirationLabel = baseStrings?.expirationOptions?.[link.expiration] ?? link.expiration;
              const usageLabel = baseStrings?.usageOptions?.[link.usage] ?? link.usage;
              const Icon = link.type === 'guest' ? Hash : Users;

              return (
                <div
                  key={link.id}
                  className={`channel-modal__list-item ${styles.linkItem}`}>
                  <div className={styles.linkDetails}>
                    <div
                      className={styles.linkIconWrapper}
                    >
                      <Icon size={16} />
                    </div>
                    <div className={styles.linkInfo}>
                      <div className={styles.linkHeader}>
                        <strong>{typeLabel}</strong>
                        <span className={styles.linkId}>{link.id}</span>
                      </div>
                      <span className={styles.linkUrl}>{link.url}</span>
                      <div className={styles.linkMeta}>
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
                    className={`profile-action-button ${styles.copyButton}`}
                    onClick={() => copyInviteLink(link.id, link.url)}
                  >
                    {copiedLinkId === link.id
                      ? s.workspaceManagement.inviteManagementCopied
                      : s.workspaceManagement.inviteManagementCopy}
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
