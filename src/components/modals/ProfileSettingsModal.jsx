'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import { useMessages } from 'next-intl';
import { X, Edit } from '@/components/common/icons';
import { getPlaceholderImage } from '@/shared/utils/imagePlaceholder';
import styles from './ProfileSettingsModal.module.css';

export const ProfileSettingsModal = ({ user, onClose }) => {
    const messages = useMessages();
    const t = messages?.modals?.profileSettings;
    const userProfileT = messages?.modals?.userProfile ?? {};

    const [isEditing, setIsEditing] = useState(false);
    const [status, setStatus] = useState(user.status);
    const [username, setUsername] = useState(user.name);
    const [realName, setRealName] = useState(user.realName || user.name);
    const [phone, setPhone] = useState(user.phone || '');

    const avatarSrc = user.avatar || getPlaceholderImage(72, user?.name?.[0] ?? '?');

    const handleSave = () => {
        // TODO: API 호출하여 프로필 업데이트
        console.log('Save profile:', { username, realName, phone, status });
        setIsEditing(false);
    };

    if (!t) {
        return null;
    }

    return (
        <div className="profile-modal-overlay" onClick={onClose}>
            <div className="profile-modal" onClick={(e) => e.stopPropagation()}>
                <header className={`profile-modal__header ${styles.header}`}>
                    <button onClick={onClose} className={`profile-modal__close-button ${styles.closeButton}`}>
                        <X size={18} />
                    </button>
                </header>
                <div className={`profile-modal__banner ${styles.banner}`}></div>
                <div className={`profile-modal__content ${styles.content}`}>
                    <div className={`profile-modal__avatar-section ${styles.avatarSection}`}>
                        <Image
                            src={avatarSrc}
                            alt={user.name}
                            width={72}
                            height={72}
                            className={`profile-modal__avatar ${styles.avatar}`}
                        />
                        {isEditing && (
                            <button className="profile-modal__avatar-edit">{t.changePhoto}</button>
                        )}
                    </div>

                    <h3 className={styles.displayName}>{username}</h3>
                    <p className={styles.statusLine}>
                        <span className={`dm-button__status ${status === 'online' ? 'online' : 'offline'} ${styles.statusDot}`}></span>
                        {status === 'online' ? t.statusOnline : t.statusOffline}
                    </p>

                    <div className={styles.details}>
                        {isEditing ? (
                            <>
                                <div className={styles.formGroup}>
                                    <label htmlFor="display-name"><strong>{t.displayName}:</strong></label>
                                    <input
                                        id="display-name"
                                        type="text"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        className={styles.input}
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <label htmlFor="real-name"><strong>{userProfileT.realName}:</strong></label>
                                    <input
                                        id="real-name"
                                        type="text"
                                        value={realName}
                                        onChange={(e) => setRealName(e.target.value)}
                                        className={styles.input}
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <label><strong>{userProfileT.email}:</strong></label>
                                    <div className={styles.readOnlyField}>
                                        {user.email} <span className={styles.disabledNote}>(변경 불가)</span>
                                    </div>
                                </div>
                                <div className={styles.formGroup}>
                                    <label htmlFor="phone"><strong>{userProfileT.phone}:</strong></label>
                                    <input
                                        id="phone"
                                        type="text"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        className={styles.input}
                                        placeholder="전화번호 입력"
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <label><strong>{userProfileT.socialProvider}:</strong></label>
                                    <div className={styles.readOnlyField}>
                                        {user.socialProvider} <span className={styles.disabledNote}>(변경 불가)</span>
                                    </div>
                                </div>
                                <div className={styles.formGroup}>
                                    <label><strong>{userProfileT.role}:</strong></label>
                                    <div className={styles.readOnlyField}>{user.role}</div>
                                </div>
                                <div className={styles.formGroup}>
                                    <label htmlFor="status-select"><strong>{t.status}:</strong></label>
                                    <select
                                        id="status-select"
                                        value={status}
                                        onChange={(e) => setStatus(e.target.value)}
                                        className={styles.select}
                                    >
                                        <option value="online">{t.statusOnline}</option>
                                        <option value="offline">{t.statusOffline}</option>
                                    </select>
                                </div>
                            </>
                        ) : (
                            <>
                                <div><strong>{userProfileT.realName}:</strong> {realName}</div>
                                <div><strong>{userProfileT.email}:</strong> {user.email}</div>
                                {phone && <div><strong>{userProfileT.phone}:</strong> {phone}</div>}
                                <div><strong>{userProfileT.socialProvider}:</strong> {user.socialProvider}</div>
                                <div><strong>{userProfileT.role}:</strong> {user.role}</div>
                            </>
                        )}
                    </div>

                    {isEditing ? (
                        <div className={styles.actions}>
                            <button
                                className={styles.cancelButton}
                                onClick={() => setIsEditing(false)}
                            >
                                취소
                            </button>
                            <button
                                className="profile-modal__save-button"
                                onClick={handleSave}
                            >
                                {t.save}
                            </button>
                        </div>
                    ) : (
                        <button
                            className="profile-modal__save-button"
                            onClick={() => setIsEditing(true)}
                        >
                            <Edit size={16} />
                            프로필 편집
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfileSettingsModal;
