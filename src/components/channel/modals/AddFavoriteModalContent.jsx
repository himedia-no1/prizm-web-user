'use client';

import { useState } from 'react';
import { Star } from '@/components/common/icons';
import useStore from '@/store/useStore';
import useStrings from '@/hooks/useStrings';

export const AddFavoriteModalContent = ({ channels = [] }) => {
  const s = useStrings();
  const favoriteChannels = useStore((state) => state.favoriteChannels);
  const toggleFavoriteChannel = useStore((state) => state.toggleFavoriteChannel);
  const closeModal = useStore((state) => state.closeModal);

  const [selectedChannels, setSelectedChannels] = useState(new Set(favoriteChannels));

  const handleToggle = (channelId) => {
    const newSelected = new Set(selectedChannels);
    if (newSelected.has(channelId)) {
      newSelected.delete(channelId);
    } else {
      newSelected.add(channelId);
    }
    setSelectedChannels(newSelected);
  };

  const handleSave = () => {
    // Update favorites in store
    channels.forEach((channel) => {
      const isFavorite = favoriteChannels.includes(channel.id);
      const shouldBeFavorite = selectedChannels.has(channel.id);

      if (isFavorite !== shouldBeFavorite) {
        toggleFavoriteChannel(channel.id);
      }
    });
    closeModal();
  };

  return (
    <div>
      <p className="channel-modal__helper-text">
        {s.favorites?.description ?? '즐겨찾기에 추가할 채널을 선택하세요.'}
      </p>

      <div className="favorite-selector-list">
        {channels.map((channel) => {
          const isActive = selectedChannels.has(channel.id);
          return (
            <button
              key={channel.id}
              className={`favorite-selector ${isActive ? 'active' : ''}`}
              onClick={() => handleToggle(channel.id)}
            >
              <div className="favorite-selector__info">
                <span className="favorite-selector__name">#{channel.name}</span>
                <span className="favorite-selector__category">{channel.categoryName}</span>
              </div>
              <div className="favorite-selector__action">
                {isActive ? (
                  <>
                    <Star size={16} fill="currentColor" />
                    <span>{s.favorites?.remove ?? '제거'}</span>
                  </>
                ) : (
                  <>
                    <Star size={16} />
                    <span>{s.favorites?.add ?? '추가'}</span>
                  </>
                )}
              </div>
            </button>
          );
        })}
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
        <button
          className="profile-modal__save-button"
          onClick={handleSave}
        >
          {s.favorites?.save ?? '저장'}
        </button>
      </div>
    </div>
  );
};
