import { validateAndGetWorkspace } from '@/features/workspace/actions';
import { DashboardView } from '@/components/workspace/components/DashboardView';

export default async function DashboardPage({ params }) {
  const { workspaceId } = (await params) ?? {};
  const { workspace } = await validateAndGetWorkspace(workspaceId);

  // No dashboard statistics API available yet
  const stats = [];

  return <DashboardView workspaceName={workspace?.name ?? 'My Workspace'} stats={stats} />;
}
