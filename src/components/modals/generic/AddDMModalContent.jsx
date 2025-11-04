'use client';

import useDataStore from '@/store/dataStore';

export const AddDMModalContent = () => {
    const { users } = useDataStore();

    return (
        <div className="channel-modal__list">
            {Object.values(users).map((user) => (
                <button key={user.id} className="channel-modal__list-item member">
                    <img src={user.avatar} alt={user.name} />
                    <span>{user.name}</span>
                </button>
            ))}
        </div>
    );
};
