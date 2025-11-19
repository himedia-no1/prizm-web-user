import WorkspaceSettingsClient from '../WorkspaceSettingsClient';

export default async function IntegrationsPage({ params }) {
  const { workspaceId } = (await params) ?? {};
  return (
    <WorkspaceSettingsClient
      workspaceId={workspaceId}
      workspaceId={workspaceId}
      initialTab="integrations"
      basePath={`/workspace/${workspaceId}/setting`}
    />
  );
}
