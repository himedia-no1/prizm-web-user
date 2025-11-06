'use client';

import React from 'react';

export const MentionModalContent = ({ users = [] }) => {
    return (
        <div className="channel-modal__list mention-list">
            {users.map((user) => (
                <button key={user.id} className="channel-modal__list-item member mention-item">
                    <img src={user.avatar} alt={user.name} />
                    <span>{user.name}</span>
                </button>
            ))}
        </div>
    );
};