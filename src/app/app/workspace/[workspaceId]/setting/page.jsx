import { redirect } from 'next/navigation';

const DEFAULT_TAB = 'overview';

export default async function WorkspaceSettingsIndexPage({ params }) {
  const { workspaceId } = (await params) ?? {};
  if (!workspaceId) {
    redirect('/app/workspace');
  }
  redirect(`/app/workspace/${workspaceId}/setting/${DEFAULT_TAB}`);
}
