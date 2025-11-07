import { useState } from 'react';
import { ChevronDown, Plus, Hash, Star, StarOff } from '@/components/common/icons';
import { UnreadBadge } from '@/components/ui/UnreadBadge';
import useStore from '@/store/useStore';

export const CategorySection = ({
  category,
  currentChannelId,
  currentView,
  onSelectChannel,
  onOpenModal,
  favoriteChannels = [],
  onToggleFavorite,
  canManage = false,
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const { unreadCounts } = useStore();

  return (
    <div className="nav-category">
      <div className="nav-category__header-wrapper">
        <button
          className="nav-category__header"
          onClick={() => setIsOpen(!isOpen)}
        >
          <ChevronDown
            size={14}
            className={`nav-category__icon ${!isOpen ? 'collapsed' : ''}`}
          />
          <span>{category.name}</span>
        </button>
        {canManage && (
          <button
            className="nav-category__add-channel-button"
            onClick={(e) => {
              e.stopPropagation();
              onOpenModal?.('addChannel', {
                categoryId: category.id,
                categoryName: category.name,
              });
            }}
          >
            <Plus size={12} />
          </button>
        )}
      </div>

      {isOpen && (
        <ul className="nav-category__list">
          {category.channels.map(channel => {
            const isActive = currentView === 'channel' && currentChannelId === channel.id;
            const isFavorite = favoriteChannels.includes(channel.id);
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
                  </div>
                </button>
                <button
                  type="button"
                  className={`channel-favorite-button ${isFavorite ? 'active' : ''}`}
                  aria-label={isFavorite ? '즐겨찾기 해제' : '즐겨찾기에 추가'}
                  onClick={(event) => {
                    event.stopPropagation();
                    onToggleFavorite?.(channel.id);
                  }}
                >
                  {isFavorite ? <Star size={14} /> : <StarOff size={14} />}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
