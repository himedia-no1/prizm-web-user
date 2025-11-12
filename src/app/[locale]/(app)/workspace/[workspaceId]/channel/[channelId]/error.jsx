'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { useMessages } from 'next-intl';

export default function ChannelError({ error, reset }) {
  const messages = useMessages();
  const t = messages?.common;

  useEffect(() => {
    console.error('Channel Error:', error);
  }, [error]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
        padding: '2rem',
        textAlign: 'center',
      }}
    >
      <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>
        {t?.errorTitle || 'Failed to load channel'}
      </h2>
      <p style={{ color: '#64748b', marginBottom: '1.5rem', fontSize: '0.875rem' }}>
        {t?.errorDescription || 'An error occurred while loading the channel.'}
      </p>
      <Button onClick={reset} variant="primary" size="sm">
        {t?.tryAgain || 'Try again'}
      </Button>
    </div>
  );
}
