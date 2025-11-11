'use client';

import { useMessages } from 'next-intl';

export const NotificationsModalContent = () => {
    const messages = useMessages();
    const s = { ...(messages?.common ?? {}), ...messages };

    return (
        <div className="channel-modal__list">
            <p>{s.notificationsEmptyMessage}</p>
        </div>
    );
};
