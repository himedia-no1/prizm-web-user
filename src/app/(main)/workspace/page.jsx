'use client';

import { useRouter } from 'next/navigation';
import { mockWorkspaces } from '@/mocks';
import './workspace.css';

export default function WorkspacePage() {
  const router = useRouter();

  const handleSelectWorkspace = (workspaceId) => {
    router.push(`/workspace/${workspaceId}/dashboard`);
  };

  return (
    <main className="workspace-selector-page">
      <div className="workspace-selector-container">
        <h1 className="workspace-selector-title">워크스페이스 선택</h1>
        <p className="workspace-selector-subtitle">참여 중인 워크스페이스를 선택하세요</p>

        <div className="workspace-grid">
          {mockWorkspaces.map((workspace) => (
            <button
              key={workspace.id}
              onClick={() => handleSelectWorkspace(workspace.id)}
              className="workspace-card-button"
            >
              <div className="workspace-card-icon">{workspace.icon}</div>
              <div className="workspace-card-name">{workspace.name}</div>
            </button>
          ))}
          <button
            onClick={() => router.push('/create-workspace')}
            className="workspace-card-button workspace-card-new"
          >
            <div className="workspace-card-icon">+</div>
            <div className="workspace-card-name">새 워크스페이스</div>
          </button>
        </div>
      </div>
    </main>
  );
}
