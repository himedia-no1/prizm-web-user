'use client';

import React, { useCallback, useEffect, useState } from 'react';
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
    activeTab = 'profile',
    basePath = '/me/setting',
}) => {
    const router = useRouter();
    const t = useTranslations('userSettings');
    const handleTabChange = useCallback((tab) => {
        const target = `${basePath}/${tab}`;
        router.replace(target);
    }, [router, basePath]);
    
    const [username, setUsername] = useState(user?.name || '');
    const [email, setEmail] = useState(user?.email || '');
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const logout = useAuthStore((state) => state.logout);
    
    // user prop이 변경되면 username과 email 업데이트
    useEffect(() => {
        if (user) {
            setUsername(user.name || '');
            setEmail(user.email || '');
        }
    }, [user]);
    
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
        if (!user) return null;
        
        switch (activeTab) {
            case 'profile':
                return (
                    <ProfileTab
                        user={user}
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
                userId={user?.id}
            />
        </div>
    );
};

export default UserSettingsPage;
