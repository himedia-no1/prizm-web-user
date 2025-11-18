import { validateWorkspaceAccess } from '@/features/workspace/actions';
import WorkspaceSettingsClient from '../WorkspaceSettingsClient';

export default async function GroupsPage({ params }) {
  const { workspaceId } = (await params) ?? {};
  await validateWorkspaceAccess(workspaceId);
  return (
    <WorkspaceSettingsClient
      workspaceId={workspaceId}
      workspaceId={workspaceId}
      initialTab="groups"
      basePath={`/workspace/${workspaceId}/setting`}
    />
  );
}
