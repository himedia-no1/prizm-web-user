'use client';

import React from 'react';
import Image from 'next/image';
import { useMessages } from 'next-intl';
import { getPlaceholderImage } from '@/shared/utils/imagePlaceholder';

export const ThreadsModalContent = ({ threadMessages = [], users = {}, onOpenThread }) => {
    const messages = useMessages();
    const s = { ...(messages?.common ?? {}), ...messages };

    return (
        <div className="channel-modal__list thread-gallery">
            {threadMessages.length > 0 ? (
                threadMessages.map((msg) => {
                    const user = users[msg.userId] || {};
                    const avatarSrc = user.avatar || getPlaceholderImage(32, user?.name?.[0] ?? '?');
                    return (
                        <div key={msg.id} className="channel-modal__list-item message thread-card">
                            <Image src={avatarSrc} alt={user.name} width={32} height={32} />
                            <div className="message-item__content">
                                <span className="message-item__username">{user.name}</span>
                                <p className="message-item__text">{msg.text}</p>
                            </div>
                            <button className="message-item__action-button" onClick={() => onOpenThread(msg)}>
                                {s.modals.genericModal.viewThread}
                            </button>
                        </div>
                    );
                })
            ) : (
                <p>{s.modals.genericModal.noThreads}</p>
            )}
        </div>
    );
};
