'use client';

import { Hash, Star, StarOff, Plus } from '@/components/common/icons';
import { UnreadBadge } from '@/components/common/UnreadBadge';
import useStore from '@/store/useStore';

export const FavoritesList = ({
  channelsIndex,
  favoriteChannels = [],
  currentChannelId,
  currentView,
  onSelectChannel,
  onToggleFavorite,
  onOpenFavoriteModal,
  label,
  emptyLabel = '즐겨찾기한 채널이 없습니다.',
}) => {
  const { unreadCounts } = useStore();
  const favorites = favoriteChannels
    .map((id) => channelsIndex[id])
    .filter(Boolean);

  return (
    <div className="nav-group">
      <div className="nav-group__header">
        <span>{label}</span>
        <button
          type="button"
          className="nav-category__add-button"
          onClick={() => onOpenFavoriteModal?.()}
        >
          <Plus size={14} />
        </button>
      </div>

      {favorites.length === 0 ? (
        <p className="favorites-empty">{emptyLabel}</p>
      ) : (
        <ul className="nav-category__list" style={{ paddingLeft: 0 }}>
          {favorites.map((channel) => {
            const isActive = currentView === 'channel' && currentChannelId === channel.id;
            const unreadCount = unreadCounts[channel.id] || 0;
            return (
              <li key={channel.id} className="channel-row">
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
                <button
                  type="button"
                  className="channel-favorite-button active"
                  aria-label="즐겨찾기 해제"
                  onClick={(event) => {
                    event.stopPropagation();
                    onToggleFavorite?.(channel.id);
                  }}
                >
                  <Star size={14} />
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
