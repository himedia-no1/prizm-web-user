'use client';

import { useMessages } from 'next-intl';
import Image from 'next/image';
import { getPlaceholderImage } from '@/shared/utils/imagePlaceholder';
import { X, MessageSquare } from '@/components/common/icons';
import styles from './ThreadListSidebar.module.css';

export const ThreadListSidebar = ({ threadMessages = [], users = {}, onClose, onOpenThread }) => {
  const messages = useMessages();
  const t = messages?.modals;

  return (
    <aside className={`thread-sidebar ${styles.threadListSidebar}`}>
      <header className="thread-header">
        <div>
          <h3 className="thread-header__title">
            <MessageSquare size={18} />
            <span>{t?.titles?.threads || 'All Threads'}</span>
          </h3>
          <p className="thread-header__subtitle">
            {threadMessages.length} {threadMessages.length === 1 ? 'thread' : 'threads'}
          </p>
        </div>
        <button onClick={onClose} className="thread-header__close-button">
          <X size={18} />
        </button>
      </header>

      <div className={styles.threadList}>
        {threadMessages.length > 0 ? (
          threadMessages.map((msg) => {
            const user = users[msg.userId] || {};
            const avatarSrc = user.avatar || getPlaceholderImage(36, user?.name?.[0] ?? '?');
            const replyCount = msg.replyCount || 0;

            return (
              <div
                key={msg.id}
                className={styles.threadItem}
                onClick={() => onOpenThread(msg)}
              >
                <Image
                  src={avatarSrc}
                  alt={user.name}
                  width={36}
                  height={36}
                  className={styles.avatar}
                />
                <div className={styles.threadContent}>
                  <div className={styles.threadHeader}>
                    <span className={styles.userName}>{user.name}</span>
                    <span className={styles.timestamp}>{msg.timestamp}</span>
                  </div>
                  <p className={styles.threadText}>{msg.text}</p>
                  <div className={styles.threadMeta}>
                    <MessageSquare size={14} />
                    <span className={styles.replyCount}>
                      {replyCount} {replyCount === 1 ? 'reply' : 'replies'}
                    </span>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className={styles.emptyState}>
            <MessageSquare size={48} className={styles.emptyIcon} />
            <p className={styles.emptyText}>
              {t?.genericModal?.noThreads || 'No threads yet'}
            </p>
            <p className={styles.emptyHint}>
              Start a thread by replying to a message
            </p>
          </div>
        )}
      </div>
    </aside>
  );
};
