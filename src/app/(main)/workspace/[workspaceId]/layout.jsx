import { use } from 'react';
import WorkspaceLayoutClient from './WorkspaceLayoutClient';

export default function WorkspaceLayout({ children, params }) {
  const resolvedParams = use(params);
  const workspaceId = resolvedParams?.workspaceId;

  return (
    <WorkspaceLayoutClient workspaceId={workspaceId}>
      {children}
    </WorkspaceLayoutClient>
  );
}
