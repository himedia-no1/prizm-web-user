'use client';

import Image from 'next/image';
import { useMessages } from 'next-intl';
import styles from './MembersTab.module.css';
import { getPlaceholderImage } from '@/shared/utils/imagePlaceholder';

export const MembersTab = ({ 
  blockedMembers, 
  participants, 
  membershipHistory 
}) => {
  const messages = useMessages();
  const s = { ...(messages?.common ?? {}), ...messages };

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
      <p className={styles.description}>
        {s.workspaceAdmin.membersDescription}
      </p>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>{s.workspaceAdmin.membersBlockedTitle}</h3>
        <p className={styles.sectionDescription}>
          {s.workspaceAdmin.membersBlockedDescription}
        </p>
        {blockedMembers.length === 0 ? (
          <p className={styles.empty}>
            {s.workspaceAdmin.membersBlockedEmpty}
          </p>
        ) : (
          <div className="channel-modal__list">
            {blockedMembers.map((blocked) => (
              <div
                key={blocked.id}
                className={`channel-modal__list-item member ${styles.memberItem}`}>
                <span className={styles.memberDetails}>
                  <strong>{blocked.name}</strong>
                  <span className={styles.memberInfo}>{blocked.email}</span>
                  <span className={styles.memberMeta}>
                    {blocked.reason} · {blocked.blockedAt}
                  </span>
                </span>
                <button className={`profile-action-button ${styles.unblockButton}`}>
                  {s.workspaceAdmin.membersBlockedUnblock}
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>{s.workspaceAdmin.membersParticipantsTitle}</h3>
        <p className={styles.sectionDescription}>
          {s.workspaceAdmin.membersParticipantsDescription}
        </p>
        <div className={styles.actions}>
          <button className={`profile-modal__save-button ${styles.actionButton}`}>
            {s.workspaceAdmin.membersExport}
          </button>
          <button className={`profile-modal__save-button ${styles.actionButton} ${styles.secondaryButton}`}>
            {s.workspaceAdmin.membersMoveToGroup}
          </button>
          <button className={`profile-modal__save-button ${styles.actionButton}`}>
            {s.workspaceAdmin.inviteMember}
          </button>
        </div>
        <div className="channel-modal__list">
          {participants.map((participant) => {
            const avatarSrc =
              participant.avatar ||
              getPlaceholderImage(32, participant?.name?.[0] ?? '?');
            return (
              <div
                key={participant.id}
                className={`channel-modal__list-item member ${styles.memberItem}`}>
              <input type="checkbox" className={styles.checkbox} />
              <Image src={avatarSrc} alt={participant.displayName} width={32} height={32} />
              <div className={styles.participantDetails}>
                <strong>{participant.name}</strong>
                <span className={styles.memberInfo}>
                  {participant.displayName} · {participant.email}
                </span>
                <span className={styles.memberMeta}>
                  {participant.type} · {participant.group}
                </span>
              </div>
              <span
                className={`${styles.status} ${participant.status === 'online' ? styles.onlineStatus : styles.offlineStatus}`}>
                {participant.status}
              </span>
              <button className={`profile-action-button ${styles.unblockButton}`}>
                {s.workspaceAdmin.membersMoveToGroup}
              </button>
              </div>
            );
          })}
        </div>
      </section>

      <section>
        <h3 className={styles.sectionTitle}>{s.workspaceAdmin.membersHistoryTitle}</h3>
        <p className={styles.sectionDescription}>
          {s.workspaceAdmin.membersHistoryDescription}
        </p>
        {membershipHistory.length === 0 ? (
          <p className={styles.empty}>
            {s.workspaceAdmin.membersHistoryEmpty}
          </p>
        ) : (
          <div className="channel-modal__list">
            {membershipHistory.map((entry) => (
              <div
                key={entry.id}
                className={`channel-modal__list-item ${styles.historyItem}`}>
                <span className={styles.historyDetails}>
                  <strong>{entry.name}</strong>
                  <span className={styles.historyAction}>
                    {getHistoryMessage(entry.action)}
                  </span>
                </span>
                <span className={styles.historyTimestamp}>{entry.timestamp}</span>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
