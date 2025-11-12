'use client';

import React from 'react';
import { useMessages } from 'next-intl';

export const InfoModalContent = ({ channelDetails = {} }) => {
    const messages = useMessages();
    const t = messages?.modals?.channelInfo ?? {};
    const { displayName, channelName, description, topic } = channelDetails;

    return (
        <div className="channel-modal__info">
            <h4>{displayName ?? `#${channelName ?? (t.defaultChannelName ?? 'channel')}`}</h4>
            <p>{description ?? (t.noDescription ?? 'No description available')}</p>
            {topic && (
                <p className="channel-modal__info-topic">{t.topicLabel ?? 'Topic'} · {topic}</p>
            )}
        </div>
    );
};
