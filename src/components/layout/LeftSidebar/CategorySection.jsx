import { useState } from 'react';
import { ChevronDown, Plus, Hash } from '@/components/common/icons';

export const CategorySection = ({
  category,
  currentChannelId,
  currentView,
  onSelectChannel,
  onOpenModal
}) => {
  const [isOpen, setIsOpen] = useState(true);

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
      </div>

      {isOpen && (
        <ul className="nav-category__list">
          {category.channels.map(channel => {
            const isActive = currentView === 'channel' && currentChannelId === channel.id;
            return (
              <li key={channel.id}>
                <button
                  onClick={() => onSelectChannel(channel.id)}
                  className={`channel-button ${isActive ? 'active' : ''}`}
                >
                  <span className="channel-button__name">
                    <Hash size={16} />
                    <span>{channel.name}</span>
                  </span>
                  {channel.unread > 0 && (
                    <span className="channel-button__unread">{channel.unread}</span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
