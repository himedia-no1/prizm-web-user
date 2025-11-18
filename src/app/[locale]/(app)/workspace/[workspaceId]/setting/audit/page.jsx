import { validateWorkspaceAccess } from '@/features/workspace/actions';
import WorkspaceSettingsClient from '../WorkspaceSettingsClient';

export default async function AuditLogsPage({ params }) {
  const { workspaceId } = (await params) ?? {};
  await validateWorkspaceAccess(workspaceId);
  return (
    <WorkspaceSettingsClient
      workspaceId={workspaceId}
      workspaceId={workspaceId}
      initialTab="audit"
      basePath={`/workspace/${workspaceId}/setting`}
    />
  );
}
