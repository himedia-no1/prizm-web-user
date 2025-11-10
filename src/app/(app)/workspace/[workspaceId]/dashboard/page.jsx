import { validateAndGetWorkspace } from '@/features/workspace/actions';
import { callBff } from '@/shared/server/bffClient';
import { DashboardView } from '@/components/workspace/components/DashboardView';

export default async function DashboardPage({ params }) {
  const { workspaceId } = (await params) ?? {};
  const { workspace } = await validateAndGetWorkspace(workspaceId);
  const statsResponse = await callBff({
    method: 'GET',
    url: `/mock/workspaces/${workspaceId}/stats`,
  });
  const statsPayload = statsResponse.status === 200 ? statsResponse.data : [];
  const stats = Array.isArray(statsPayload?.stats)
    ? statsPayload.stats
    : Array.isArray(statsPayload)
      ? statsPayload
      : [];

  return <DashboardView workspaceName={workspace?.name ?? 'My Workspace'} stats={stats} />;
}
