import SearchClient from './SearchClient';
import { getSearchContext } from './SearchServer';
import { validateAndGetWorkspace } from '@/features/workspace/actions';

export default async function SearchPage({ params }) {
  const { workspaceId } = (await params) ?? {};
  await validateAndGetWorkspace(workspaceId);
  const context = await getSearchContext();
  return <SearchClient context={context} />;
}
