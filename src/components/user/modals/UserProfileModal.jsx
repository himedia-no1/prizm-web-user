'use client';

import Image from 'next/image';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { X, MessageSquare } from '@/components/common/icons';
import useDataStore from '@/core/store/dataStore';
import styles from './UserProfileModal.module.css';
import { getPlaceholderImage } from '@/shared/utils/imagePlaceholder';

export const UserProfileModal = ({ userId, onClose, onCreateDM }) => {
    const router = useRouter();
    const users = useDataStore((state) => state.users);
    const loadInitialData = useDataStore((state) => state.loadInitialData);
    const initialized = useDataStore((state) => state.initialized);

    useEffect(() => {
        if (!initialized) {
            loadInitialData().catch((error) => {
                console.error('Failed to load users:', error);
            });
        }
    }, [initialized, loadInitialData]);

    if (!userId) {
        return null;
    }

    const user = users[userId];
    if (!user) {
        return null;
    }

    const avatarSrc = user.avatar || getPlaceholderImage(72, user?.name?.[0] ?? '?');

    return (
        <div className="profile-modal-overlay" onClick={onClose}>
            <div className="profile-modal user-profile-modal" onClick={(e) => e.stopPropagation()}>
                <header className={`profile-modal__header ${styles.header}`}>
                    <button
                        onClick={onClose}
                        className={`profile-modal__close-button ${styles.closeButton}`}
                    >
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
                    </div>
                    <h3 className="user-profile-modal__display-name">{user.name}</h3>
                    <p className="user-profile-modal__status">
                        <span
                            className={`dm-button__status ${user.status === 'online' ? 'online' : 'offline'} ${styles.status}`}
                        ></span>
                        {user.status === 'online' ? 'Online' : 'Offline'}
                    </p>
                    <div className="user-profile-modal__details">
                        <div>
                            <strong>실제 이름:</strong> {user.realName}
                        </div>
                        <div>
                            <strong>이메일:</strong> {user.email}
                        </div>
                        {user.phone && (
                            <div>
                                <strong>전화번호:</strong> {user.phone}
                            </div>
                        )}
                        <div>
                            <strong>가입 경로:</strong> {user.socialProvider}
                        </div>
                        <div>
                            <strong>역할:</strong> {user.role}
                        </div>
                    </div>
                    <button
                        className="profile-modal__save-button user-profile-modal__dm-button"
                        onClick={() => onCreateDM(user.id, router)}
                    >
                        <MessageSquare size={16} />
                        DM 보내기
                    </button>
                </div>
            </div>
        </div>
    );
};
