import SearchClient from './SearchClient';

export default async function SearchPage({ params }) {
  const { workspaceId } = (await params) ?? {};

  return <SearchClient workspaceId={workspaceId} />;
}
