import { redirect } from 'next/navigation';
import { validateAndGetWorkspace } from '@/features/workspace/actions';

export default async function WorkspaceIndexPage({ params }) {
  const { workspaceId } = await params;
  await validateAndGetWorkspace(workspaceId);
  redirect(`/app/workspace/${workspaceId}/channel/general`);
}
