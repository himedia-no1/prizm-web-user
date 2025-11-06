'use client';

import React, { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, User, Google, GitHub, Microsoft, X } from '@/components/common/icons';
import { NotificationPreferences, ThemePreferences, LanguagePreferences } from '@/components/settings/prefs';
import { DeactivateAccountModal, DeleteAccountModal } from '@/components/modals';
import useStrings from '@/hooks/useStrings';
import { mockUsers } from '@/__mocks__';
import { useAuthStore } from '@/store/authStore';

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
                    <div>
                        <h2 className="settings-content__header">{s.userSettings?.profile?.title ?? '내 프로필'}</h2>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
                            {s.userSettings?.profile?.description ?? '아바타와 기본 정보를 수정합니다.'}
                        </p>
                        <div
                            className="profile-modal__avatar-section"
                            style={{ marginTop: 0, marginBottom: '2rem', justifyContent: 'flex-start' }}
                        >
                            <img
                                src={user.avatar}
                                alt={user.realName}
                                className="profile-modal__avatar"
                                style={{ width: '100px', height: '100px', margin: 0 }}
                            />
                            <button
                                className="profile-modal__avatar-edit"
                                style={{ left: '75px', bottom: '5px', position: 'absolute' }}
                            >
                                {s.userSettings?.profile?.avatarChange ?? '변경'}
                            </button>
                        </div>
                        <div className="settings-form-group">
                            <label htmlFor="realName">{s.userSettings?.profile?.nameLabel ?? '실제 이름'}</label>
                            <input
                                id="realName"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="settings-form-group">
                            <label htmlFor="email">{s.userSettings?.profile?.emailLabel ?? '이메일'}</label>
                            <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="settings-form-group">
                            <label>{s.userSettings?.profile?.socialLoginLabel ?? '소셜 로그인'}</label>
                            <div className="social-login-info">
                                {user.socialProvider === 'Google' && <Google size={20} />}
                                {user.socialProvider === 'GitHub' && <GitHub size={20} />}
                                {user.socialProvider === 'Microsoft' && <Microsoft size={20} />}
                                <span>
                                    {user.socialProvider}{' '}
                                    {s.userSettings?.profile?.socialLoginSuffix ?? '(으)로 가입함'}
                                </span>
                            </div>
                        </div>
                        <button className="profile-modal__save-button">
                            {s.userSettings?.profile?.saveButton ?? '변경사항 저장'}
                        </button>

                        <div style={{ marginTop: '2rem', display: 'grid', gap: '1rem' }}>
                            <div
                                style={{
                                    border: '1px solid var(--border)',
                                    borderRadius: '0.85rem',
                                    padding: '1.25rem',
                                    background: 'var(--card-bg)',
                                    boxShadow: '0 1px 3px var(--shadow)',
                                }}
                            >
                                <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 600 }}>
                                    {s.userSettings?.profile?.deactivateTitle ?? '계정 비활성화'}
                                </h3>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: '0.5rem 0 1rem' }}>
                                    {s.userSettings?.profile?.deactivateDescription ?? '데이터를 유지한 채 일시적으로 계정을 잠급니다.'}
                                </p>
                                <button
                                    type="button"
                                    className="profile-modal__save-button"
                                    style={{ width: 'auto', backgroundColor: '#f59e0b' }}
                                    onClick={() => setShowDeactivateModal(true)}
                                >
                                    {s.userSettings?.profile?.deactivateButton ?? '계정 비활성화'}
                                </button>
                            </div>
                            <div
                                style={{
                                    border: '1px solid rgba(239, 68, 68, 0.35)',
                                    borderRadius: '0.85rem',
                                    padding: '1.25rem',
                                    background: 'rgba(239, 68, 68, 0.05)',
                                    boxShadow: '0 1px 3px rgba(239, 68, 68, 0.15)',
                                }}
                            >
                                <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 600, color: '#b91c1c' }}>
                                    {s.userSettings?.profile?.deleteTitle ?? '계정 삭제'}
                                </h3>
                                <p style={{ color: '#b91c1c', fontSize: '0.9rem', margin: '0.5rem 0 1rem' }}>
                                    {s.userSettings?.profile?.deleteDescription ?? '계정과 관련 데이터를 영구적으로 삭제합니다.'}
                                </p>
                                <button
                                    type="button"
                                    className="profile-modal__save-button"
                                    style={{ width: 'auto', backgroundColor: '#ef4444' }}
                                    onClick={() => setShowDeleteModal(true)}
                                >
                                    {s.userSettings?.profile?.deleteButton ?? '계정 삭제'}
                                </button>
                            </div>
                        </div>
                    </div>
                );

            case 'prefs':
                return (
                    <div>
                        <h2 className="settings-content__header">{s.userSettings?.navPreferences ?? '환경 설정'}</h2>
                        <div style={{ display: 'grid', gap: '1.25rem' }}>
                            <NotificationPreferences />
                            <ThemePreferences />
                            <LanguagePreferences />
                        </div>
                    </div>
                );

            case 'devices':
                return (
                    <div>
                        <h2 className="settings-content__header">{s.userSettings?.devices?.title ?? '로그인된 기기'}</h2>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
                            {s.userSettings?.devices?.description ?? '현재 로그인 중인 기기를 확인하고 원격으로 로그아웃할 수 있습니다.'}
                        </p>
                        <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid var(--border)', borderRadius: '0.75rem', overflow: 'hidden' }}>
                            <thead style={{ backgroundColor: 'var(--card-bg)' }}>
                                <tr style={{ textAlign: 'left' }}>
                                    <th style={{ padding: '0.75rem', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-secondary)' }}>
                                        {s.userSettings?.devices?.table?.device ?? '기기'}
                                    </th>
                                    <th style={{ padding: '0.75rem', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-secondary)' }}>
                                        {s.userSettings?.devices?.table?.location ?? '위치'}
                                    </th>
                                    <th style={{ padding: '0.75rem', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-secondary)' }}>
                                        {s.userSettings?.devices?.table?.loggedInAt ?? '로그인 시각'}
                                    </th>
                                    <th style={{ padding: '0.75rem', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-secondary)' }}>
                                        {s.userSettings?.devices?.table?.lastActive ?? '마지막 활동'}
                                    </th>
                                    <th style={{ padding: '0.75rem', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-secondary)' }}>
                                        {s.userSettings?.devices?.table?.action ?? '조치'}
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {deviceSessions.map((session) => (
                                    <tr key={session.id} style={{ borderTop: '1px solid var(--border)' }}>
                                        <td style={{ padding: '0.75rem', fontWeight: 600 }}>{session.device}</td>
                                        <td style={{ padding: '0.75rem', color: 'var(--text-secondary)' }}>{session.location}</td>
                                        <td style={{ padding: '0.75rem', color: 'var(--text-tertiary)' }}>{session.loggedInAt}</td>
                                        <td style={{ padding: '0.75rem', color: 'var(--text-tertiary)' }}>{session.lastActive}</td>
                                        <td style={{ padding: '0.75rem' }}>
                                            <button className="profile-action-button" style={{ padding: '0.4rem 0.75rem' }}>
                                                {s.userSettings?.devices?.revoke ?? '이 기기에서 로그아웃'}
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                );

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
                        className="channel-modal"
                        style={{ maxWidth: '420px' }}
                        onClick={(event) => event.stopPropagation()}
                    >
                        <header className="channel-modal__header">
                            <h3>{s.userSettings?.logout?.modalTitle ?? '로그아웃 하시겠어요?'}</h3>
                            <button onClick={() => setShowLogoutModal(false)} className="channel-modal__close-button">
                                <X size={18} />
                            </button>
                        </header>
                        <div className="channel-modal__content">
                            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                                {s.userSettings?.logout?.modalDescription ?? '언제든 다시 로그인할 수 있습니다. 저장되지 않은 변경사항은 사라질 수 있습니다.'}
                            </p>
                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                                <button
                                    type="button"
                                    className="profile-action-button"
                                    style={{ padding: '0.6rem 1rem' }}
                                    onClick={() => setShowLogoutModal(false)}
                                >
                                    {s.userSettings?.logout?.cancel ?? '취소'}
                                </button>
                                <button
                                    type="button"
                                    className="profile-modal__save-button"
                                    style={{ width: 'auto', backgroundColor: '#ef4444', opacity: isLoggingOut ? 0.7 : 1 }}
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
