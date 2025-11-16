'use client';

import React, { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { ProfileTab, PreferencesTab } from '@/components/settings/user/tabs';
import { DeleteAccountModal } from '@/components/modals';
import { useAuthStore } from '@/core/store/authStore';
import { SettingsSidebarNav } from '@/components/settings/user/components/SettingsSidebarNav';
import { LogoutConfirmationModal } from '@/components/settings/user/components/LogoutConfirmationModal';
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
            <SettingsSidebarNav
                activeTab={activeTab}
                onBack={handleBack}
                onTabChange={handleTabChange}
                onLogoutClick={() => setShowLogoutModal(true)}
                labels={{
                    backToWorkspace: t('backToWorkspace'),
                    title: t('title'),
                    navProfile: t('navProfile'),
                    navPreferences: t('navPreferences'),
                    navLogout: t('navLogout'),
                }}
            />
            <main className="settings-content">{renderSettingContent()}</main>

            <LogoutConfirmationModal
                open={showLogoutModal}
                onCancel={() => setShowLogoutModal(false)}
                onConfirm={handleLogoutConfirm}
                labels={{
                    modalTitle: t('logout.modalTitle'),
                    modalDescription: t('logout.modalDescription'),
                    cancel: t('logout.cancel'),
                    confirm: t('logout.confirm'),
                    inProgress: t('logout.inProgress'),
                }}
                isProcessing={isLoggingOut}
            />

            <DeleteAccountModal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                userId={fallbackUser.id}
            />
        </div>
    );
};

export default UserSettingsPage;
