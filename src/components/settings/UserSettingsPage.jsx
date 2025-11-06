'use client';

import React, { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, User, X } from '@/components/common/icons';
import { ProfileTab, PreferencesTab, DevicesTab } from '@/components/settings/user/tabs';
import { DeactivateAccountModal, DeleteAccountModal } from '@/components/modals';
import useStrings from '@/hooks/useStrings';
import { mockUsers } from '@/__mocks__';
import { useAuthStore } from '@/store/authStore';
import styles from './UserSettingsPage.module.css';

export const UserSettingsPage = ({ onBack }) => {
    const user = mockUsers['u1'];
    const [selectedSetting, setSelectedSetting] = useState('profile');
    const [username, setUsername] = useState(user.realName);
    const [email, setEmail] = useState(user.email);
    const s = useStrings();
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [showDeactivateModal, setShowDeactivateModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const logout = useAuthStore((state) => state.logout);
    const router = useRouter();
    const deviceSessions = [
        {
            id: 'device-1',
            device: 'MacBook Pro · Chrome',
            location: 'Seoul, KR',
            loggedInAt: '2024-03-15 09:20',
            lastActive: '5분 전',
        },
        {
            id: 'device-2',
            device: 'iPhone 15 · Prizm App',
            location: 'Seoul, KR',
            loggedInAt: '2024-03-14 21:10',
            lastActive: '1시간 전',
        },
        {
            id: 'device-3',
            device: 'Windows · Edge',
            location: 'Tokyo, JP',
            loggedInAt: '2024-03-10 13:45',
            lastActive: '3일 전',
        },
    ];

    const handleBack = () => {
        if (onBack) {
            onBack();
        } else if (typeof window !== 'undefined') {
            window.history.back();
        }
    };

    const handleLogoutConfirm = useCallback(async () => {
        if (isLoggingOut) {
            return;
        }

        setIsLoggingOut(true);
        try {
            await logout();
            setShowLogoutModal(false);
            router.replace('/login');
        } finally {
            setIsLoggingOut(false);
        }
    }, [isLoggingOut, logout, router]);

    const renderSettingContent = () => {
        switch (selectedSetting) {
            case 'profile':
                return (
                    <ProfileTab
                        user={user}
                        username={username}
                        setUsername={setUsername}
                        email={email}
                        setEmail={setEmail}
                        onDeactivate={() => setShowDeactivateModal(true)}
                        onDelete={() => setShowDeleteModal(true)}
                    />
                );

            case 'prefs':
                return <PreferencesTab />;

            case 'devices':
                return <DevicesTab deviceSessions={deviceSessions} />;

            default:
                return null;
        }
    };

    return (
        <div className="settings-page">
            <aside className="settings-sidebar">
                <button onClick={handleBack} className="settings-sidebar__back-button">
                    <ArrowLeft size={16} />
                    <span>{s.workspaceAdmin.backToWorkspace}</span>
                </button>
                <h3 className="settings-sidebar__title">
                    <User size={16} />
                    <span>{s.userSettings?.title ?? '사용자 설정'}</span>
                </h3>
                <nav className="settings-sidebar__nav">
                    <button
                        className={`settings-sidebar__button ${selectedSetting === 'profile' ? 'active' : ''}`}
                        onClick={() => setSelectedSetting('profile')}
                    >
                        <span>{s.userSettings?.navProfile ?? '프로필'}</span>
                    </button>
                    <button
                        className={`settings-sidebar__button ${selectedSetting === 'devices' ? 'active' : ''}`}
                        onClick={() => setSelectedSetting('devices')}
                    >
                        <span>{s.userSettings?.navDevices ?? '로그인된 기기'}</span>
                    </button>
                    <button
                        className={`settings-sidebar__button ${selectedSetting === 'prefs' ? 'active' : ''}`}
                        onClick={() => setSelectedSetting('prefs')}
                    >
                        <span>{s.userSettings?.navPreferences ?? '환경 설정'}</span>
                    </button>
                    <button
                        className="settings-sidebar__button"
                        onClick={() => setShowLogoutModal(true)}
                    >
                        <span>{s.userSettings?.navLogout ?? '로그아웃'}</span>
                    </button>
                </nav>
            </aside>
            <main className="settings-content">{renderSettingContent()}</main>
            {showLogoutModal && (
                <div className="channel-modal-overlay" onClick={() => setShowLogoutModal(false)}>
                    <div
                        className={`channel-modal ${styles.modal}`}
                        onClick={(event) => event.stopPropagation()}
                    >
                        <header className="channel-modal__header">
                            <h3>{s.userSettings?.logout?.modalTitle ?? '로그아웃 하시겠어요?'}</h3>
                            <button onClick={() => setShowLogoutModal(false)} className="channel-modal__close-button">
                                <X size={18} />
                            </button>
                        </header>
                        <div className="channel-modal__content">
                            <p className={styles.modalDescription}>
                                {s.userSettings?.logout?.modalDescription ?? '언제든 다시 로그인할 수 있습니다. 저장되지 않은 변경사항은 사라질 수 있습니다.'}
                            </p>
                            <div className={styles.modalActions}>
                                <button
                                    type="button"
                                    className={`profile-action-button ${styles.cancelButton}`}
                                    onClick={() => setShowLogoutModal(false)}
                                >
                                    {s.userSettings?.logout?.cancel ?? '취소'}
                                </button>
                                <button
                                    type="button"
                                    className={`profile-modal__save-button ${styles.logoutButton} ${isLoggingOut ? styles.loggingOut : ''}`}
                                    onClick={handleLogoutConfirm}
                                    disabled={isLoggingOut}
                                >
                                    {isLoggingOut
                                        ? (s.userSettings?.logout?.inProgress ?? '로그아웃 중...')
                                        : (s.userSettings?.logout?.confirm ?? '로그아웃')}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <DeactivateAccountModal
                isOpen={showDeactivateModal}
                onClose={() => setShowDeactivateModal(false)}
                userId={user.id}
            />
            <DeleteAccountModal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                userId={user.id}
            />
        </div>
    );
};

export default UserSettingsPage;
