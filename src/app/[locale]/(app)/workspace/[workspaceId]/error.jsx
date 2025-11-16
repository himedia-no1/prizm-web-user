'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { useMessages } from 'next-intl';

export default function WorkspaceError({ error, reset }) {
  const messages = useMessages();
  const t = messages?.common;

  useEffect(() => {
    console.error('Workspace Error:', error);
  }, [error]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        width: '100%',
        padding: '2rem',
        textAlign: 'center',
      }}
    >
      <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>
        {t?.errorTitle || 'Something went wrong'}
      </h2>
      <p style={{ color: '#64748b', marginBottom: '2rem' }}>
        {t?.errorDescription || 'An error occurred while loading the workspace.'}
      </p>
      <Button onClick={reset} variant="primary">
        {t?.tryAgain || 'Try again'}
      </Button>
    </div>
  );
}
