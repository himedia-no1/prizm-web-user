import { validateWorkspaceAccess } from '@/features/workspace/actions';
import WorkspaceSettingsClient from '../WorkspaceSettingsClient';

export default async function InviteManagementPage({ params }) {
  const { workspaceId } = (await params) ?? {};
  await validateWorkspaceAccess(workspaceId);
  return (
    <WorkspaceSettingsClient
      workspaceId={workspaceId}
      workspaceId={workspaceId}
      initialTab="invite-management"
      basePath={`/workspace/${workspaceId}/setting`}
    />
  );
}
