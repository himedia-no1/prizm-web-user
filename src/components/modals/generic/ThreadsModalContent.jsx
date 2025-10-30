'use client';

import useStrings from '@/hooks/useStrings';
import useStore from '@/store/useStore';
import useDataStore from '@/store/dataStore';

export const ThreadsModalContent = () => {
  const s = useStrings();
  const openThread = useStore((state) => state.openThread);
  const { users, messages } = useDataStore();
  const threadMessages = messages.filter((m) => m.threadId);

  return (
    <div className="channel-modal__list thread-gallery">
      {threadMessages.length > 0 ? (
        threadMessages.map((msg) => (
          <div key={msg.id} className="channel-modal__list-item message thread-card">
            <img src={users[msg.userId].avatar} alt={users[msg.userId].name} />
            <div className="message-item__content">
              <span className="message-item__username">{users[msg.userId].name}</span>
              <p className="message-item__text">{msg.text}</p>
            </div>
            <button className="message-item__action-button" onClick={() => openThread(msg)}>
              {s.threadsViewButton}
            </button>
          </div>
        ))
      ) : (
        <p>{s.threadsEmptyMessage}</p>
      )}
    </div>
  );
};
