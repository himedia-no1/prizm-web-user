import CreateWorkspaceClient from './CreateWorkspaceClient';

export default async function CreateWorkspace({ searchParams }) {
  const params = await searchParams;
  const modeParam = params?.mode === 'join' ? 'join' : 'create';
  return <CreateWorkspaceClient initialMode={modeParam} />;
}
