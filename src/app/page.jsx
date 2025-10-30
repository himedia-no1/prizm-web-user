'use client';

import AuthGuard from './AuthGuard';

export default function HomePage() {
  return (
    <AuthGuard>
      {/* You can show a loading spinner here while the AuthGuard is checking the auth state */}
    </AuthGuard>
  );
}

