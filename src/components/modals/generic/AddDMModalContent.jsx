'use client';

import React from 'react';
import useStrings from '@/hooks/useStrings';

export const AddDMModalContent = ({ availableUsers = [] }) => {
    const s = useStrings();
    const strings = s.modals.addDM;

    return (
        <div>
            <div className="settings-form-group">
                <label htmlFor="dm-search">
                    {strings.searchLabel}
                </label>
                <input
                    id="dm-search"
                    type="text"
                    placeholder={strings.searchPlaceholder}
                />
            </div>
            <div className="channel-modal__list mention-list">
                {availableUsers.map((user) => (
                    <button key={user.id} className="channel-modal__list-item member mention-item">
                        <img src={user.avatar} alt={user.name} />
                        <span>{user.name}</span>
                        <span
                            className={`dm-button__status ${
                                user.status === 'online' ? 'online' : 'offline'
                            }`}
                            style={{ position: 'static', border: 'none', marginLeft: 'auto' }}
                        ></span>
                    </button>
                ))}
                {availableUsers.length === 0 && (
                    <p>{strings.empty}</p>
                )}
            </div>
        </div>
    );
};