'use client';

import React from 'react';
import useStrings from '@/hooks/useStrings';

export const PinnedModalContent = ({ pinnedMessages = [], users = {} }) => {
    const s = useStrings();

    return (
        <div className="channel-modal__list">
            {pinnedMessages.length > 0 ? (
                pinnedMessages.map((msg) => {
                    const user = users[msg.userId] || {};
                    return (
                        <div key={msg.id} className="channel-modal__list-item message">
                            <img src={user.avatar} alt={user.name} />
                            <div className="message-item__content">
                                <span className="message-item__username">{user.name}</span>
                                <p className="message-item__text">{msg.text}</p>
                            </div>
                        </div>
                    );
                })
            ) : (
                <p>{s.modals.genericModal.noPinnedMessages}</p>
            )}
        </div>
    );
};