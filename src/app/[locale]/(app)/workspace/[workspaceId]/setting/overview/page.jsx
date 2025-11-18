import { validateWorkspaceAccess } from '@/features/workspace/actions';
import WorkspaceSettingsClient from '../WorkspaceSettingsClient';

export default async function WorkspaceOverviewSettingsPage({ params }) {
  const { workspaceId } = (await params) ?? {};
  await validateWorkspaceAccess(workspaceId);
  return (
    <WorkspaceSettingsClient
      workspaceId={workspaceId}
      workspaceId={workspaceId}
      initialTab="overview"
      basePath={`/workspace/${workspaceId}/setting`}
    />
  );
}
