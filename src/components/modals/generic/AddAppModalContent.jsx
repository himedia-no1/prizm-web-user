'use client';

import useDataStore from '@/store/dataStore';

export const AddAppModalContent = () => {
    const { appConnect } = useDataStore();

    return (
        <div className="channel-modal__list">
            {appConnect.map((app) => (
                <button key={app.id} className="channel-modal__list-item member">
                    <img src={`/${app.icon}`} alt={app.name} className="dm-button__avatar" />
                    <span>{app.name}</span>
                </button>
            ))}
        </div>
    );
};
