'use client';

import useStrings from '@/hooks/useStrings';
import useDataStore from '@/store/dataStore';

export const PinnedModalContent = () => {
  const s = useStrings();
  const { users, messages } = useDataStore();
  const pinnedMessages = messages.filter((m) => m.pinned);

  return (
    <div className="channel-modal__list">
      {pinnedMessages.length > 0 ? (
        pinnedMessages.map((msg) => (
          <div key={msg.id} className="channel-modal__list-item message">
            <img src={users[msg.userId].avatar} alt={users[msg.userId].name} />
            <div className="message-item__content">
              <span className="message-item__username">{users[msg.userId].name}</span>
              <p className="message-item__text">{msg.text}</p>
            </div>
          </div>
        ))
      ) : (
        <p>{s.pinnedEmptyMessage}</p>
      )}
    </div>
  );
};
