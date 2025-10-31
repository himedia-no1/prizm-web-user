import { DirectoryView } from '@/components/directory/DirectoryView';
import { mockUsers } from '@/__mocks__';

export default function DirectoryPage() {
  return <DirectoryView users={mockUsers} />;
}
