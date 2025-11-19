import DashboardClient from './DashboardClient';

export default async function DashboardPage({ params }) {
  const { workspaceId } = (await params) ?? {};

  return <DashboardClient workspaceId={workspaceId} />;
}
