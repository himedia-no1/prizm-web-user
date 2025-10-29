'use client';

import React, { useState } from 'react';
import { X } from '@/components/common/icons';

export const ProfileSettingsModal = ({ user, onClose }) => {
    const [status, setStatus] = useState(user.status);
    const [username, setUsername] = useState(user.name);

    return (
        <div className="profile-modal-overlay" onClick={onClose}>
            <div className="profile-modal" onClick={(e) => e.stopPropagation()}>
                <header className="profile-modal__header">
                    <h3>프로필 설정</h3>
                    <button onClick={onClose} className="profile-modal__close-button">
                        <X size={18} />
                    </button>
                </header>
                <div className="profile-modal__banner"></div>
                <div className="profile-modal__content">
                    <div className="profile-modal__avatar-section">
                        <img src={user.avatar} alt={user.name} className="profile-modal__avatar" />
                        <button className="profile-modal__avatar-edit">변경</button>
                    </div>
                    <div className="profile-modal__form-group">
                        <label htmlFor="username-modal">표시 이름</label>
                        <input
                            id="username-modal"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="profile-modal__form-group">
                        <label htmlFor="status-modal">상태</label>
                        <select
                            id="status-modal"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <option value="online">Online</option>
                            <option value="offline">Offline</option>
                        </select>
                    </div>
                    <button className="profile-modal__save-button">저장</button>
                </div>
            </div>
        </div>
    );
};
