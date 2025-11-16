'use client';

import React, { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { ArrowLeft, User, X } from '@/components/common/icons';
import { ProfileTab, PreferencesTab } from '@/components/settings/user/tabs';
import { DeleteAccountModal } from '@/components/modals';
import { useAuthStore } from '@/core/store/authStore';
import styles from './UserSettingsPage.module.css';

export const UserSettingsPage = ({
    onBack,
    user,
    deviceSessions = [],
    activeTab = 'profile',
    basePath = '/me/setting',
}) => {
    const fallbackUser = user ?? {
        id: 'u1',
        name: 'Prizm User',
        realName: 'Prizm User',
        email: 'user@example.com',
    };
    const router = useRouter();
    const t = useTranslations('userSettings');
    const handleTabChange = useCallback((tab) => {
        const target = `${basePath}/${tab}`;
        router.replace(target);
    }, [router, basePath]);
    const [username, setUsername] = useState(fallbackUser.realName);
    const [email, setEmail] = useState(fallbackUser.email);
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const logout = useAuthStore((state) => state.logout);
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
        switch (activeTab) {
            case 'profile':
                return (
                    <ProfileTab
                        user={fallbackUser}
                        username={username}
                        setUsername={setUsername}
                        email={email}
                        setEmail={setEmail}
                        onDelete={() => setShowDeleteModal(true)}
                    />
                );

            case 'prefs':
                return <PreferencesTab />;

            default:
                return null;
        }
    };

    return (
        <div className="settings-page">
            <aside className="settings-sidebar">
                <button onClick={handleBack} className="settings-sidebar__back-button">
                    <ArrowLeft size={16} />
                    <span>{t('backToWorkspace')}</span>
                </button>
                <h3 className="settings-sidebar__title">
                    <User size={16} />
                    <span>{t('title')}</span>
                </h3>
                <nav className="settings-sidebar__nav">
                    <button
                        className={`settings-sidebar__button ${activeTab === 'profile' ? 'active' : ''}`}
                        onClick={() => handleTabChange('profile')}
                    >
                        <span>{t('navProfile')}</span>
                    </button>
                    <button
                        className={`settings-sidebar__button ${activeTab === 'prefs' ? 'active' : ''}`}
                        onClick={() => handleTabChange('prefs')}
                    >
                        <span>{t('navPreferences')}</span>
                    </button>
                    <button
                        className="settings-sidebar__button"
                        onClick={() => setShowLogoutModal(true)}
                    >
                        <span>{t('navLogout')}</span>
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
                            <h3>{t('logout.modalTitle')}</h3>
                            <button onClick={() => setShowLogoutModal(false)} className="channel-modal__close-button">
                                <X size={18} />
                            </button>
                        </header>
                        <div className="channel-modal__content">
                            <p className={styles.modalDescription}>
                                {t('logout.modalDescription')}
                            </p>
                            <div className={styles.modalActions}>
                                <button
                                    type="button"
                                    className={`profile-action-button ${styles.cancelButton}`}
                                    onClick={() => setShowLogoutModal(false)}
                                >
                                    {t('logout.cancel')}
                                </button>
                                <button
                                    type="button"
                                    className={`profile-modal__save-button ${styles.logoutButton} ${isLoggingOut ? styles.loggingOut : ''}`}
                                    onClick={handleLogoutConfirm}
                                    disabled={isLoggingOut}
                                >
                                    {isLoggingOut
                                        ? t('logout.inProgress')
                                        : t('logout.confirm')}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <DeleteAccountModal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                userId={fallbackUser.id}
            />
        </div>
    );
};

export default UserSettingsPage;
