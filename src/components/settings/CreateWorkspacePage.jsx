'use client';

import React, { useState } from 'react';
import useStrings from '@/hooks/useStrings';
import testApi from '@/api/test.api';
import { useRouter } from 'next/navigation';
import './CreateWorkspacePage.css';

export const CreateWorkspacePage = ({ onBack }) => {
    const s = useStrings();
    const router = useRouter();
    const [mode, setMode] = useState('create'); // 'create' or 'join'
    const [workspaceName, setWorkspaceName] = useState('');
    const [inviteCode, setInviteCode] = useState('');
    const [loading, setLoading] = useState(false);

    const handleCreateWorkspace = async () => {
        if (!workspaceName.trim()) return;
        setLoading(true);
        try {
            const result = await testApi.createWorkspace({ name: workspaceName });
            router.push(`/workspace/${result.id}`);
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
            const result = await testApi.joinWorkspaceByInviteCode(inviteCode);
            router.push(`/workspace/${result.workspaceId}`);
        } catch (error) {
            console.error('Failed to join workspace:', error);
            alert('초대 코드가 올바르지 않습니다.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="create-workspace-page">
            <div className="create-workspace-container">
                <h1>{s.workspace.create}</h1>
                
                <div className="create-workspace-tabs">
                    <button
                        className={mode === 'create' ? 'tab-button active' : 'tab-button'}
                        onClick={() => setMode('create')}
                    >
                        {s.createNewWorkspace}
                    </button>
                    <button
                        className={mode === 'join' ? 'tab-button active' : 'tab-button'}
                        onClick={() => setMode('join')}
                    >
                        {s.workspace.joinWithLink}
                    </button>
                </div>

                {mode === 'create' ? (
                    <div className="create-workspace-form">
                        <div className="workspace-form-group">
                            <label>{s.workspaceAdmin.workspaceNameLabel}</label>
                            <input
                                type="text"
                                value={workspaceName}
                                onChange={(e) => setWorkspaceName(e.target.value)}
                                placeholder="예: 우리 회사 프로젝트"
                            />
                        </div>
                        <button
                            className="workspace-primary-button"
                            onClick={handleCreateWorkspace}
                            disabled={loading || !workspaceName.trim()}
                        >
                            {loading ? '생성 중...' : s.createNewWorkspace}
                        </button>
                    </div>
                ) : (
                    <div className="create-workspace-form">
                        <div className="workspace-form-group">
                            <label>{s.workspace.inviteCodePlaceholder}</label>
                            <input
                                type="text"
                                value={inviteCode}
                                onChange={(e) => setInviteCode(e.target.value)}
                                placeholder="ABC123XYZ"
                            />
                        </div>
                        <button
                            className="workspace-primary-button"
                            onClick={handleJoinWorkspace}
                            disabled={loading || !inviteCode.trim()}
                        >
                            {loading ? '참여 중...' : s.workspace.joinButton}
                        </button>
                    </div>
                )}

                <button className="workspace-cancel-button" onClick={onBack}>
                    {s.modals.deactivateAccount.cancelButton}
                </button>
            </div>
        </div>
    );
};
