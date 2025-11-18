'use client';

import { useEffect, useState } from 'react';
import { workspaceService } from '@/core/api/services';
import { DashboardView } from '@/components/workspace/components/DashboardView';

export default function DashboardClient({ workspaceId }) {
  const [workspace, setWorkspace] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadWorkspace() {
      try {
        const data = await workspaceService.getWorkspace(workspaceId);
        setWorkspace(data);
      } catch (error) {
        console.error('Failed to load workspace:', error);
      } finally {
        setLoading(false);
      }
    }

    loadWorkspace();
  }, [workspaceId]);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div className="spinner" />
      </div>
    );
  }

  const stats = [];

  return <DashboardView workspaceName={workspace?.name ?? 'My Workspace'} stats={stats} />;
}
