import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

export default function DirectoryLoading() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
        minHeight: '400px',
      }}
    >
      <LoadingSpinner size="md" />
    </div>
  );
}
