'use client';

import useDataStore from '@/store/dataStore';

export const MentionModalContent = () => {
  const { users } = useDataStore();

  return (
    <div className="channel-modal__list mention-list">
      {Object.values(users).map((user) => (
        <button key={user.id} className="channel-modal__list-item member mention-item">
          <img src={user.avatar} alt={user.name} />
          <span>{user.name}</span>
        </button>
      ))}
    </div>
  );
};
