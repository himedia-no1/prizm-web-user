'use client';

import { useMessages } from 'next-intl';
import Image from 'next/image';
import { getPlaceholderImage } from '@/shared/utils/imagePlaceholder';
import { X, Bookmark } from '@/components/common/icons';
import styles from './PinnedSidebar.module.css';

export const PinnedSidebar = ({ pinnedMessages = [], users = {}, onClose }) => {
  const messages = useMessages();
  const t = messages?.modals;

  return (
    <aside className={`thread-sidebar ${styles.pinnedSidebar}`}>
      <header className="thread-header">
        <div>
          <h3 className="thread-header__title">
            <Bookmark size={18} />
            <span>{t?.titles?.pinned || 'Pinned Messages'}</span>
          </h3>
          <p className="thread-header__subtitle">
            {pinnedMessages.length} {pinnedMessages.length === 1 ? 'message' : 'messages'}
          </p>
        </div>
        <button onClick={onClose} className="thread-header__close-button">
          <X size={18} />
        </button>
      </header>

      <div className={styles.pinnedList}>
        {pinnedMessages.length > 0 ? (
          pinnedMessages.map((msg) => {
            const user = users[msg.userId] || {};
            const avatarSrc = user.avatar || getPlaceholderImage(36, user?.name?.[0] ?? '?');
            return (
              <div key={msg.id} className={styles.pinnedItem}>
                <Image
                  src={avatarSrc}
                  alt={user.name}
                  width={36}
                  height={36}
                  className={styles.avatar}
                />
                <div className={styles.messageContent}>
                  <div className={styles.messageHeader}>
                    <span className={styles.userName}>{user.name}</span>
                    <span className={styles.timestamp}>{msg.timestamp}</span>
                  </div>
                  <p className={styles.messageText}>{msg.text}</p>
                </div>
              </div>
            );
          })
        ) : (
          <div className={styles.emptyState}>
            <Bookmark size={48} className={styles.emptyIcon} />
            <p className={styles.emptyText}>
              {t?.genericModal?.noPinnedMessages || 'No pinned messages yet'}
            </p>
            <p className={styles.emptyHint}>
              Pin important messages to keep them easily accessible
            </p>
          </div>
        )}
      </div>
    </aside>
  );
};
