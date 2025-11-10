'use client';

import { useLastWorkspacePath } from '@/shared/hooks/useLastWorkspacePath';
import { SearchView } from '@/components/search/components/SearchView';

export default function SearchClient({ context }) {
  useLastWorkspacePath();
  return <SearchView context={context} />;
}
