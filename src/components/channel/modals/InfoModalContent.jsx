'use client';

import React from 'react';
import useStrings from '@/shared/hooks/useStrings';

export const InfoModalContent = ({ channelDetails = {} }) => {
    const s = useStrings();
    const { displayName, channelName, description, topic } = channelDetails;

    return (
        <div className="channel-modal__info">
            <h4>{displayName ?? `#${channelName ?? 'channel'}`}</h4>
            <p>{description ?? s.modals.genericModal.channelDescriptionPlaceholder}</p>
            {topic && (
                <p className="channel-modal__info-topic">Topic · {topic}</p>
            )}
        </div>
    );
};