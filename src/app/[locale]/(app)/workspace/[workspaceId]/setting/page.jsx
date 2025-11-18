import { redirect } from 'next/navigation';

const DEFAULT_TAB = 'overview';

export default async function WorkspaceSettingsIndexPage({ params }) {
  const { workspaceId } = (await params) ?? {};
  if (!workspaceId) {
    redirect('/workspace/new');
  }
  redirect(`/workspace/${workspaceId}/setting/${DEFAULT_TAB}`);
}
