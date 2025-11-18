'use client';

import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useMessages } from 'next-intl';
import { workspaceService } from '@/core/api/services';
import { useUIStore } from '@/core/store/shared';
import styles from './MembersTab.module.css';
import { getPlaceholderImage } from '@/shared/utils/imagePlaceholder';

export const MembersTab = ({
  blockedMembers,
  participants,
  membershipHistory,
  onRefresh
}) => {
  const params = useParams();
  const workspaceId = params?.workspaceId;
  const messages = useMessages();
  const s = { ...(messages?.common ?? {}), ...messages };
  const openModal = useUIStore((state) => state.openModal);

  const handleUnblock = async (userId) => {
    if (!workspaceId) return;
    try {
      await workspaceService.unbanUser(workspaceId, userId);
      onRefresh?.();
    } catch (error) {
      console.error('Failed to unblock user:', error);
    }
  };

  const handleInviteMember = () => {
    openModal('inviteMember');
  };

  const getHistoryMessage = (action) => {
    switch (action) {
      case 'join':
        return s.workspaceManagement.membersHistoryActionJoin;
      case 'leave':
        return s.workspaceManagement.membersHistoryActionLeave;
      default:
        return s.workspaceManagement.membersHistoryActionInvited;
    }
  };

  return (
    <div>
      <h2 className="settings-content__header">{s.workspaceManagement.membersTitle}</h2>
      <p className={styles.description}>
        {s.workspaceManagement.membersDescription}
      </p>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>{s.workspaceManagement.membersBlockedTitle}</h3>
        <p className={styles.sectionDescription}>
          {s.workspaceManagement.membersBlockedDescription}
        </p>
        {blockedMembers.length === 0 ? (
          <p className={styles.empty}>
            {s.workspaceManagement.membersBlockedEmpty}
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
                <button
                  className={`profile-action-button ${styles.unblockButton}`}
                  onClick={() => handleUnblock(blocked.id)}
                >
                  {s.workspaceManagement.membersBlockedUnblock}
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>{s.workspaceManagement.membersParticipantsTitle}</h3>
        <p className={styles.sectionDescription}>
          {s.workspaceManagement.membersParticipantsDescription}
        </p>
        <div className={styles.actions}>
          <button className={`profile-modal__save-button ${styles.actionButton}`}>
            {s.workspaceManagement.membersExport}
          </button>
          <button className={`profile-modal__save-button ${styles.actionButton} ${styles.secondaryButton}`}>
            {s.workspaceManagement.membersMoveToGroup}
          </button>
          <button
            className={`profile-modal__save-button ${styles.actionButton}`}
            onClick={handleInviteMember}
          >
            {s.workspaceManagement.inviteMember}
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
                {s.workspaceManagement.membersMoveToGroup}
              </button>
              </div>
            );
          })}
        </div>
      </section>

      <section>
        <h3 className={styles.sectionTitle}>{s.workspaceManagement.membersHistoryTitle}</h3>
        <p className={styles.sectionDescription}>
          {s.workspaceManagement.membersHistoryDescription}
        </p>
        {membershipHistory.length === 0 ? (
          <p className={styles.empty}>
            {s.workspaceManagement.membersHistoryEmpty}
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
