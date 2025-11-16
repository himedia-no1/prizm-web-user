import { useState } from 'react';
import { ChevronDown, Plus, Hash, Star, StarOff, Settings, UserPlus } from '@/components/common/icons';
import { UnreadBadge } from '@/components/ui/UnreadBadge';
import { useChatStore } from '@/core/store/chat';
import { useMessages } from 'next-intl';
import { useWorkspaceStore } from '@/core/store/workspace';

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
  const messages = useMessages();
  const t = messages?.common;

  const [isOpen, setIsOpen] = useState(true);
  const [hoveredChannel, setHoveredChannel] = useState(null);
  const { unreadCounts } = useChatStore();
  const currentWorkspaceRole = useWorkspaceStore((state) => state.currentWorkspaceRole);
  const isManager = currentWorkspaceRole === 'owner' || currentWorkspaceRole === 'manager';

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
                  </div>
                </button>
                {isHovered ? (
                  <>
                    {isManager && (
                      <div className="channel-hover-actions">
                        <button
                          type="button"
                          className="channel-action-button"
                          aria-label="Channel Settings"
                          onClick={(event) => {
                            event.stopPropagation();
                            onOpenModal?.('channelSettings', {
                              channelDetails: channel,
                              onSave: async (data) => {
                                console.log('Save channel settings:', data);
                              }
                            });
                          }}
                        >
                          <Settings size={14} />
                        </button>
                        <button
                          type="button"
                          className="channel-action-button"
                          aria-label="Invite Guest"
                          onClick={(event) => {
                            event.stopPropagation();
                            onOpenModal?.('generic', {
                              type: 'inviteGuest',
                              channelId: channel.id,
                              channelName: channel.name,
                              workspaceId: category.workspaceId,
                            });
                          }}
                        >
                          <UserPlus size={14} />
                        </button>
                      </div>
                    )}
                    <button
                      type="button"
                      className={`channel-favorite-button ${isFavorite ? 'active' : ''}`}
                      aria-label={isFavorite ? t?.favorites?.remove : t?.favorites?.add}
                      onClick={(event) => {
                        event.stopPropagation();
                        onToggleFavorite?.(channel.id);
                      }}
                    >
                      {isFavorite ? <Star size={14} /> : <StarOff size={14} />}
                    </button>
                  </>
                ) : isFavorite ? (
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
                ) : null}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
