'use client';

import { useState } from 'react';
import { Settings, Users, CreditCard, ArrowLeft } from '@/components/common/icons';

const WorkspaceSettingsPage = () => {
    const [selectedSetting, setSelectedSetting] = useState('overview');

    const renderSettingContent = () => {
        switch(selectedSetting) {
            case 'overview':
                return (
                    <div>
                        <h2 className="settings-content__header">개요</h2>
                        <p>워크스페이스 개요입니다. 이름, 아이콘 등을 변경할 수 있습니다.</p>
                        <div className="settings-form-group">
                            <label htmlFor="ws-name">워크스페이스 이름</label>
                            <input id="ws-name" type="text" defaultValue="Prizm Dev" />
                        </div>
                    </div>
                );
            case 'members':
                return (
                    <div>
                        <h2 className="settings-content__header">멤버 관리</h2>
                        <p>워크스페이스 멤버를 초대하거나 관리합니다.</p>
                    </div>
                );
            case 'billing':
                return (
                    <div>
                        <h2 className="settings-content__header">결제 정보</h2>
                        <p>플랜 및 결제 정보를 관리합니다.</p>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="settings-page">
            <aside className="settings-sidebar">
                <button onClick={() => window.history.back()} className="settings-sidebar__back-button">
                    <ArrowLeft size={16} />
                    <span>워크스페이스로 돌아가기</span>
                </button>
                <h3 className="settings-sidebar__title">
                    <span className="ws-dropdown__button-icon" style={{width: '1.5rem', height: '1.5rem', fontSize: '0.875rem'}}>P</span>
                    <span>Prizm Dev 설정</span>
                </h3>
                <nav className="settings-sidebar__nav">
                    <button className={`settings-sidebar__button ${selectedSetting === 'overview' ? 'active' : ''}`} onClick={() => setSelectedSetting('overview')}>
                        <Settings size={16} />
                        <span>개요</span>
                    </button>
                    <button className={`settings-sidebar__button ${selectedSetting === 'members' ? 'active' : ''}`} onClick={() => setSelectedSetting('members')}>
                        <Users size={16} />
                        <span>멤버 관리</span>
                    </button>
                    <button className={`settings-sidebar__button ${selectedSetting === 'billing' ? 'active' : ''}`} onClick={() => setSelectedSetting('billing')}>
                        <CreditCard size={16} />
                        <span>결제</span>
                    </button>
                </nav>
            </aside>
            <main className="settings-content">
                {renderSettingContent()}
            </main>
        </div>
    );
};

export default WorkspaceSettingsPage;
