'use client';

import React, { useState } from 'react';
import { ArrowLeft, User, Google, GitHub, Microsoft } from '@/components/common/icons';
import { mockUsers } from '@/__mocks__';

export const UserSettingsPage = ({ onBack }) => {
    const user = mockUsers['u1'];
    const [selectedSetting, setSelectedSetting] = useState('profile');
    const [username, setUsername] = useState(user.realName);
    const [email, setEmail] = useState(user.email);

    const renderSettingContent = () => {
        switch (selectedSetting) {
            case 'profile':
                return (
                    <div>
                        <h2 className="settings-content__header">내 프로필</h2>
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
                                변경
                            </button>
                        </div>
                        <div className="settings-form-group">
                            <label htmlFor="realName">실제 이름</label>
                            <input
                                id="realName"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="settings-form-group">
                            <label htmlFor="email">이메일</label>
                            <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="settings-form-group">
                            <label>소셜 로그인</label>
                            <div className="social-login-info">
                                {user.socialProvider === 'Google' && <Google size={20} />}
                                {user.socialProvider === 'GitHub' && <GitHub size={20} />}
                                {user.socialProvider === 'Microsoft' && <Microsoft size={20} />}
                                <span>{user.socialProvider}(으)로 가입함</span>
                            </div>
                        </div>
                        <button className="profile-modal__save-button">변경사항 저장</button>
                    </div>
                );

            case 'account':
                return (
                    <div>
                        <h2 className="settings-content__header">계정 설정</h2>
                        <p>이메일, 비밀번호 등을 변경합니다.</p>
                    </div>
                );

            case 'prefs':
                return (
                    <div>
                        <h2 className="settings-content__header">환경 설정</h2>
                        <p>알림, 테마, 언어 등을 설정합니다.</p>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="settings-page">
            <aside className="settings-sidebar">
                <button onClick={onBack} className="settings-sidebar__back-button">
                    <ArrowLeft size={16} />
                    <span>워크스페이스로 돌아가기</span>
                </button>
                <h3 className="settings-sidebar__title">
                    <User size={16} />
                    <span>사용자 설정</span>
                </h3>
                <nav className="settings-sidebar__nav">
                    <button
                        className={`settings-sidebar__button ${selectedSetting === 'profile' ? 'active' : ''}`}
                        onClick={() => setSelectedSetting('profile')}
                    >
                        <span>내 프로필</span>
                    </button>
                    <button
                        className={`settings-sidebar__button ${selectedSetting === 'account' ? 'active' : ''}`}
                        onClick={() => setSelectedSetting('account')}
                    >
                        <span>계정 설정</span>
                    </button>
                    <button
                        className={`settings-sidebar__button ${selectedSetting === 'prefs' ? 'active' : ''}`}
                        onClick={() => setSelectedSetting('prefs')}
                    >
                        <span>환경 설정</span>
                    </button>
                </nav>
            </aside>
            <main className="settings-content">{renderSettingContent()}</main>
        </div>
    );
};
