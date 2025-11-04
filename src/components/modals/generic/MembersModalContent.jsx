'use client';

import useDataStore from '@/store/dataStore';

export const MembersModalContent = () => {
  const { users } = useDataStore();

  return (
    <div className="channel-modal__list">
      {Object.values(users).map((user) => (
        <div key={user.id} className="channel-modal__list-item member">
          <img src={user.avatar} alt={user.name} />
          <span>{user.name}</span>
          <span
            className={`dm-button__status ${user.status === 'online' ? 'online' : 'offline'}`}
            style={{ position: 'static', border: 'none', marginLeft: 'auto' }}
          ></span>
        </div>
      ))}
    </div>
  );
};
