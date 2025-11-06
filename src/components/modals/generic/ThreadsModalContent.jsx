'use client';

import React from 'react';
import useStrings from '@/hooks/useStrings';

export const ThreadsModalContent = ({ threadMessages = [], users = {}, onOpenThread }) => {
    const s = useStrings();

    return (
        <div className="channel-modal__list thread-gallery">
            {threadMessages.length > 0 ? (
                threadMessages.map((msg) => {
                    const user = users[msg.userId] || {};
                    return (
                        <div key={msg.id} className="channel-modal__list-item message thread-card">
                            <img src={user.avatar} alt={user.name} />
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