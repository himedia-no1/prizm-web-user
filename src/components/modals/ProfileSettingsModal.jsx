'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import { useMessages } from 'next-intl';
import { X } from '@/components/common/icons';
import { getPlaceholderImage } from '@/shared/utils/imagePlaceholder';

export const ProfileSettingsModal = ({ user, onClose }) => {
    const messages = useMessages();
    const t = messages?.modals?.profileSettings;

    const [status, setStatus] = useState(user.status);
    const [username, setUsername] = useState(user.name);

    const avatarSrc = user.avatar || getPlaceholderImage(64, user?.name?.[0] ?? '?');

    if (!t) {
        return null;
    }

    return (
        <div className="profile-modal-overlay" onClick={onClose}>
            <div className="profile-modal" onClick={(e) => e.stopPropagation()}>
                <header className="profile-modal__header">
                    <h3>{t.title}</h3>
                    <button onClick={onClose} className="profile-modal__close-button">
                        <X size={18} />
                    </button>
                </header>
                <div className="profile-modal__banner"></div>
                <div className="profile-modal__content">
                    <div className="profile-modal__avatar-section">
                        <Image
                            src={avatarSrc}
                            alt={user.name}
                            width={64}
                            height={64}
                            className="profile-modal__avatar"
                        />
                        <button className="profile-modal__avatar-edit">{t.changePhoto}</button>
                    </div>
                    <div className="profile-modal__form-group">
                        <label htmlFor="username-modal">{t.displayName}</label>
                        <input
                            id="username-modal"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="profile-modal__form-group">
                        <label htmlFor="status-modal">{t.status}</label>
                        <select
                            id="status-modal"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <option value="online">{t.statusOnline}</option>
                            <option value="offline">{t.statusOffline}</option>
                        </select>
                    </div>
                    <button className="profile-modal__save-button">{t.save}</button>
                </div>
            </div>
        </div>
    );
};

export default ProfileSettingsModal;
