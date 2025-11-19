import WorkspaceSettingsRedirect from './WorkspaceSettingsRedirect';

export default async function WorkspaceSettingsIndexPage({ params }) {
  const { workspaceId } = (await params) ?? {};
  return <WorkspaceSettingsRedirect workspaceId={workspaceId} />;
}
