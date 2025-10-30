'use client';

import useStrings from '@/hooks/useStrings';

export const InfoModalContent = () => {
    const s = useStrings();

    return (
        <div className="channel-modal__info">
            <h4>{s.infoModalChannelHeading}</h4>
            <p>{s.infoModalDescription}</p>
        </div>
    );
};
