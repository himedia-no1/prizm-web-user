'use client';

import React, { useState } from 'react';
import { Settings, Inbox } from '@/components/common/icons';
import useStrings from '@/shared/hooks/useStrings';
import { workspaceService } from '@/core/api/services';
import useStore from '@/core/store/useStore';
import { useRouter } from 'next/navigation';
import styles from './CreateWorkspacePage.module.css';

export const CreateWorkspacePage = ({ onBack, initialMode = 'create', hasExistingWorkspace = false }) => {
    const s = useStrings();
    const router = useRouter();
    const openModal = useStore((state) => state.openModal);
    const [mode, setMode] = useState(initialMode);
    const [workspaceName, setWorkspaceName] = useState('');
    const [inviteCode, setInviteCode] = useState('');
    const [loading, setLoading] = useState(false);

    const handleCreateWorkspace = async () => {
        if (!workspaceName.trim()) return;
        setLoading(true);
        try {
            const result = await workspaceService.createWorkspace({ name: workspaceName });
            router.push(`/workspace/${result.id}/channel/general`);
        } catch (error) {
            console.error('Failed to create workspace:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleJoinWorkspace = async () => {
        if (!inviteCode.trim()) return;
        setLoading(true);
        try {
            const result = await workspaceService.joinByInviteCode(inviteCode);
            router.push(`/workspace/${result.workspaceId}/channel/general`);
        } catch (error) {
            console.error('Failed to join workspace:', error);
            alert('초대 코드가 올바르지 않습니다.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles['workspace-creation-layout']}>
            <div className={styles['main-content']}>
            <div className={styles['create-workspace-container']}>
                <h1>{s.workspace.create}</h1>
                
                <div className={styles['create-workspace-tabs']}>
                    <button
                        className={`${styles['tab-button']} ${mode === 'create' ? styles.active : ''}`}
                        onClick={() => setMode('create')}
                    >
                        {s.createNewWorkspace}
                    </button>
                    <button
                        className={`${styles['tab-button']} ${mode === 'join' ? styles.active : ''}`}
                        onClick={() => setMode('join')}
                    >
                        {s.workspace.joinWithLink}
                    </button>
                </div>

                {mode === 'create' ? (
                    <div className={styles['create-workspace-form']}>
                        <div className={styles['workspace-form-group']}>
                            <label>{s.workspaceAdmin.workspaceNameLabel}</label>
                            <input
                                type="text"
                                value={workspaceName}
                                onChange={(e) => setWorkspaceName(e.target.value)}
                                placeholder="예: 우리 회사 프로젝트"
                            />
                        </div>
                        <button
                            className={styles['workspace-primary-button']}
                            onClick={handleCreateWorkspace}
                            disabled={loading || !workspaceName.trim()}
                        >
                            {loading ? '생성 중...' : s.createNewWorkspace}
                        </button>
                    </div>
                ) : (
                    <div className={styles['create-workspace-form']}>
                        <div className={styles['workspace-form-group']}>
                            <label>{s.workspace.inviteCodePlaceholder}</label>
                            <input
                                type="text"
                                value={inviteCode}
                                onChange={(e) => setInviteCode(e.target.value)}
                                placeholder="ABC123XYZ"
                            />
                        </div>
                        <button
                            className={styles['workspace-primary-button']}
                            onClick={handleJoinWorkspace}
                            disabled={loading || !inviteCode.trim()}
                        >
                            {loading ? '참여 중...' : s.workspace.joinButton}
                        </button>
                    </div>
                )}

                {hasExistingWorkspace && (
                    <button className={styles['workspace-cancel-button']} onClick={onBack ?? (() => router.back())}>
                        {s.modals.deactivateAccount.cancelButton}
                    </button>
                )}
            </div>
        </div>
        {!hasExistingWorkspace && (
                <div className={styles['bottom-left-actions']}>
                    <button
                        className={styles['icon-button']}
                        title="내 설정"
                        onClick={() => router.push('/me/setting/profile')}
                    >
                        <Settings size={20} />
                    </button>
                    <button
                        className={styles['icon-button']}
                        title="알림"
                        onClick={() => openModal('notifications')}
                    >
                        <Inbox size={20} />
                    </button>
                </div>
            )}
        </div>
    );
};
