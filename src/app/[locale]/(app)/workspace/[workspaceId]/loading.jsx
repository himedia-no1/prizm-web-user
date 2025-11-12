import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

export default function WorkspaceLoading() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        width: '100%',
      }}
    >
      <LoadingSpinner size="lg" />
    </div>
  );
}
