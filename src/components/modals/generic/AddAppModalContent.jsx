'use client';

import React from 'react';
import useStrings from '@/hooks/useStrings';

export const AddAppModalContent = ({ apps = [] }) => {
    const s = useStrings();
    const strings = s.modals.addApp;

    return (
        <div>
            {strings.description && (
                <p className="channel-modal__helper-text">
                    {strings.description}
                </p>
            )}
            <div className="channel-modal__list app-list">
                {apps.map((app) => (
                    <div key={app.id} className="channel-modal__list-item app-list__item">
                        <div className="app-list__meta">
                            <img src={`/${app.icon}`} alt={app.name} className="dm-button__avatar" />
                            <div>
                                <span className="app-list__name">{app.name}</span>
                                <p className="app-list__description">
                                    {strings.itemDescription}
                                </p>
                            </div>
                        </div>
                        <button className="profile-modal__save-button" style={{ padding: '0.4rem 1rem' }}>
                            {strings.addButton}
                        </button>
                    </div>
                ))}
                {apps.length === 0 && (
                    <p>{strings.empty}</p>
                )}
            </div>
        </div>
    );
};