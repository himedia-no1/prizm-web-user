'use client';

import React from 'react';

export const CreateWorkspacePage = ({ onBack }) => {
    return (
        <div className="settings-page" style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <h1 className="login-title">새 워크스페이스 만들기</h1>
            <p className="login-subtitle">팀을 위한 새로운 공간을 생성합니다.</p>
            <div style={{ width: '400px', marginTop: '2rem' }}>
                <div className="settings-form-group">
                    <label htmlFor="new-ws-name">워크스페이스 이름</label>
                    <input id="new-ws-name" type="text" placeholder="예: 우리 회사 프로젝트" />
                </div>
                <button className="profile-modal__save-button">워크스페이스 생성</button>
                <button
                    onClick={onBack}
                    className="social-button"
                    style={{ marginTop: '1rem', background: 'var(--card-bg)', color: 'var(--text)' }}
                >
                    취소
                </button>
            </div>
        </div>
    );
};
