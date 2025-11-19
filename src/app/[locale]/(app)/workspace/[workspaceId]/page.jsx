import WorkspaceRedirect from './WorkspaceRedirect';

export default async function WorkspaceIndexPage({ params }) {
  const { workspaceId } = await params;
  return <WorkspaceRedirect workspaceId={workspaceId} />;
}
