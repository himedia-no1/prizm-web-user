'use client';

import { useState } from 'react';
import styles from './page.module.css';

const CreateWorkspacePage = () => {
    const [showInviteLink, setShowInviteLink] = useState(false);

    return (
        <div className={`settings-page ${styles.pageContainer}`}>
            <h1 className="login-title">새 워크스페이스 만들기</h1>
            <p className="login-subtitle">팀을 위한 새로운 공간을 생성합니다.</p>
            <div className={styles.formContainer}>
                <div className="settings-form-group">
                    <label htmlFor="new-ws-name">워크스페이스 이름</label>
                    <input id="new-ws-name" type="text" placeholder="예: 우리 회사 프로젝트" />
                </div>
                <button className="profile-modal__save-button">워크스페이스 생성</button>
                <button onClick={() => window.history.back()} className={`social-button ${styles.cancelButton}`}>취소</button>

                <div className={styles.inviteLinkToggleContainer}>
                    <button onClick={() => setShowInviteLink(!showInviteLink)} className={styles.inviteLinkToggleButton}>
                        초대링크를 받으셨나요?
                    </button>
                </div>

                {showInviteLink && (
                    <div className={styles.inviteLinkInputContainer}>
                        <div className="settings-form-group">
                            <label htmlFor="invite-link">초대 링크</label>
                            <input id="invite-link" type="text" placeholder="https://prizm.com/invite/..." />
                        </div>
                        <button className="profile-modal__save-button">워크스페이스 참여</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CreateWorkspacePage;
