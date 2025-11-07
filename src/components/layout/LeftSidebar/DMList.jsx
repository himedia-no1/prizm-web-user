'use client';

import { Plus } from '@/components/common/icons';
import { StatusIndicator } from '@/components/ui/StatusIndicator';
import { UnreadBadge } from '@/components/ui/UnreadBadge';
import useStrings from '@/hooks/useStrings';
import useStore from '@/store/useStore';
import styles from './DMList.module.css';

export const DMList = ({
  dms,
  users,
  currentUser,
  currentChannelId,
  currentView,
  onSelectChannel,
  onOpenModal,
}) => {
  const s = useStrings();
  const { unreadCounts } = useStore();
  const existingDMUserIds = dms.map((dm) => dm.userId);
  const excludeUserIds = currentUser?.id ? [currentUser.id] : [];

  return (
    <div className="nav-group">
      <div className="nav-group__header">
        <span>{s.directMessages}</span>
        <button
          className="nav-category__add-button"
          onClick={() =>
            onOpenModal?.('addDM', {
              excludeUserIds,
              existingDMUserIds,
            })
          }
        >
          <Plus size={14} />
        </button>
      </div>
      <ul className={`nav-category__list ${styles.list}`}>
        {dms.map(dm => {
          const user = users[dm.userId];
          const isActive = currentView === 'channel' && currentChannelId === dm.id;
          const unreadCount = unreadCounts[dm.id] || 0;

          return (
            <li key={dm.id}>
              <button
                onClick={() => onSelectChannel(dm.id)}
                className={`channel-button ${isActive ? 'active' : ''}`}
              >
                <span className="channel-button__name">
                  <div className="dm-button__avatar-container">
                    <img src={user.avatar} alt={user.name} className="dm-button__avatar" />
                    <StatusIndicator
                      status={user.status}
                      className="dm-button__status"
                    />
                  </div>
                  <span>{user.name}</span>
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
