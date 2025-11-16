'use client';

import React, { useState } from 'react';
import { useMessages } from 'next-intl';
import { Inbox } from '@/components/common/icons';
import { workspaceService } from '@/core/api/services';
import { useUIStore } from '@/core/store/shared';
import { useRouter } from 'next/navigation';
import UserProfileHeader from '@/components/common/UserProfileHeader';
import styles from './CreateWorkspacePage.module.css';

export const CreateWorkspacePage = ({ onBack, initialMode = 'create', hasExistingWorkspace = false }) => {
    const messages = useMessages();
    const s = { ...(messages?.common ?? {}), ...messages };
    const router = useRouter();
    const openModal = useUIStore((state) => state.openModal);
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
            alert(s.workspace.invalidInviteCode);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles['workspace-creation-layout']}>
            {/* Header with user profile */}
            <div className={styles['header']}>
                <UserProfileHeader />
            </div>

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
                            <label>{s.workspaceManagement.workspaceNameLabel}</label>
                            <input
                                type="text"
                                value={workspaceName}
                                onChange={(e) => setWorkspaceName(e.target.value)}
                                placeholder={s.workspace.createWorkspacePlaceholder}
                            />
                        </div>
                        <button
                            className={styles['workspace-primary-button']}
                            onClick={handleCreateWorkspace}
                            disabled={loading || !workspaceName.trim()}
                        >
                            {loading ? s.workspace.creating : s.createNewWorkspace}
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
                                placeholder={s.workspace.inviteCodeExample}
                            />
                        </div>
                        <button
                            className={styles['workspace-primary-button']}
                            onClick={handleJoinWorkspace}
                            disabled={loading || !inviteCode.trim()}
                        >
                            {loading ? s.workspace.joining : s.workspace.joinButton}
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
                        title={s.notifications}
                        onClick={() => openModal('notifications')}
                    >
                        <Inbox size={20} />
                    </button>
                </div>
            )}
        </div>
    );
};
