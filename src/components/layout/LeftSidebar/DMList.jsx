'use client';

import Image from 'next/image';
import { useMessages } from 'next-intl';
import { StatusIndicator } from '@/components/ui/StatusIndicator';
import { UnreadBadge } from '@/components/ui/UnreadBadge';
import useStore from '@/core/store/useStore';
import styles from './DMList.module.css';
import { getPlaceholderImage } from '@/shared/utils/imagePlaceholder';

export const DMList = ({
  dms,
  users,
  currentUser,
  currentChannelId,
  currentView,
  onSelectChannel,
}) => {
  const messages = useMessages();
  const s = { ...(messages?.common ?? {}), ...messages };
  const { unreadCounts } = useStore();

  return (
    <div className="nav-group">
      <div className="nav-group__header">
        <span>{s.directMessages}</span>
      </div>
      <ul className={`nav-category__list ${styles.list}`}>
        {dms.map(dm => {
          const user = users?.[dm.userId];
          const isActive = currentView === 'channel' && currentChannelId === dm.id;
          const unreadCount = unreadCounts[dm.id] || 0;
          const displayName = user?.name ?? dm.name ?? '사용자';
          const avatarSrc = user?.avatar || getPlaceholderImage(32, displayName?.[0] ?? '?');

          return (
            <li key={dm.id}>
              <button
                onClick={() => onSelectChannel(dm.id)}
                className={`channel-button ${isActive ? 'active' : ''}`}
              >
                <span className="channel-button__name">
                  <div className="dm-button__avatar-container">
                    <Image
                      src={avatarSrc}
                      alt={displayName}
                      width={32}
                      height={32}
                      className="dm-button__avatar"
                    />
                    <StatusIndicator
                      status={user?.status}
                      className="dm-button__status"
                    />
                  </div>
                  <span>{displayName}</span>
                </span>
                <div className="channel-button__trail">
                  <UnreadBadge count={unreadCount} />
                </div>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
