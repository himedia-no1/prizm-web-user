'use client';

import useStrings from '@/hooks/useStrings';

export const NotificationsModalContent = () => {
    const s = useStrings();

    return (
        <div className="channel-modal__list">
            <p>{s.notificationsEmptyMessage}</p>
        </div>
    );
};
