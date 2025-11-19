import WorkspaceLayoutClient from './WorkspaceLayoutClient';

export default async function WorkspaceLayout({ children, params }) {
  const { workspaceId } = await params;

  return (
    <WorkspaceLayoutClient workspaceId={workspaceId}>
      {children}
    </WorkspaceLayoutClient>
  );
}
