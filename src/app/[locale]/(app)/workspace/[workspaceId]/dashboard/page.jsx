import { validateAndGetWorkspace } from '@/features/workspace/actions';
import { DashboardView } from '@/components/workspace/components/DashboardView';

export default async function DashboardPage({ params }) {
  const { workspaceId } = (await params) ?? {};
  const { workspace } = await validateAndGetWorkspace(workspaceId);

  // TODO: 대시보드 통계 API 구현 대기
  const stats = [];

  return <DashboardView workspaceName={workspace?.name ?? 'My Workspace'} stats={stats} />;
}
