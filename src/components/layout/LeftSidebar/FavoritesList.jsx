import { useState } from 'react';
import { Hash, Star } from '@/components/common/icons';
import { UnreadBadge } from '@/components/ui/UnreadBadge';
import { useChatStore } from '@/core/store/chat';
import styles from './FavoritesList.module.css';
import { useMessages } from 'next-intl';

export const FavoritesList = ({
  channelsIndex,
  favoriteChannels = [],
  currentChannelId,
  currentView,
  onSelectChannel,
  onToggleFavorite,
  label,
}) => {
  const messages = useMessages();
  const t = messages?.common;
  const [hoveredChannel, setHoveredChannel] = useState(null);

  const unreadCounts = useChatStore((state) => state.unreadCounts);
  const favorites = favoriteChannels
    .map((id) => channelsIndex[id])
    .filter(Boolean);

  if (favorites.length === 0) {
    return null;
  }

  return (
    <div className="nav-group">
      <div className="nav-group__header">
        <span>{label}</span>
      </div>

      <ul className={`nav-category__list ${styles.list}`}>
        {favorites.map((channel) => {
          const isActive = currentView === 'channel' && currentChannelId === channel.id;
          const unreadCount = unreadCounts[channel.id] || 0;
          const isHovered = hoveredChannel === channel.id;
          return (
            <li
              key={channel.id}
              className="channel-row"
              onMouseEnter={() => setHoveredChannel(channel.id)}
              onMouseLeave={() => setHoveredChannel(null)}
            >
              <button
                onClick={() => onSelectChannel(channel.id)}
                className={`channel-button ${isActive ? 'active' : ''}`}
              >
                <span className="channel-button__name">
                  <Hash size={16} />
                  <span>{channel.name}</span>
                </span>
                <div className="channel-button__trail">
                  <UnreadBadge count={unreadCount} />
                  <span className="favorite-category-label">{channel.categoryName}</span>
                </div>
              </button>
              {isHovered && (
                <button
                  type="button"
                  className="channel-favorite-button active"
                  aria-label={t?.favorites?.remove}
                  onClick={(event) => {
                    event.stopPropagation();
                    onToggleFavorite?.(channel.id);
                  }}
                >
                  <Star size={14} />
                </button>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
