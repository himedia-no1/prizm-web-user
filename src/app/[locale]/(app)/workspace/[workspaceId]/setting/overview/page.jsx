import WorkspaceSettingsClient from '../WorkspaceSettingsClient';

export default async function WorkspaceOverviewSettingsPage({ params }) {
  const { workspaceId } = (await params) ?? {};
  return (
    <WorkspaceSettingsClient
      workspaceId={workspaceId}
      workspaceId={workspaceId}
      initialTab="overview"
      basePath={`/workspace/${workspaceId}/setting`}
    />
  );
}
