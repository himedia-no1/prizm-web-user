'use client';

import { useEffect, useState } from 'react';
import { userService } from '@/core/api/services';
import UserSettingsPage from '@/components/settings/UserSettingsPage';

export default function UserSettingsClient({ activeTab }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const fetchUser = async () => {
      setIsLoading(true);
      try {
        const data = await userService.getProfile();
        if (!cancelled) {
          setUser(data ?? null);
        }
      } catch (error) {
        if (!cancelled) {
          setUser(null);
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    fetchUser();
    return () => {
      cancelled = true;
    };
  }, []);

  if (isLoading) {
    return (
      <div className="settings-page">
        <div className="settings-content">
          <p>Loading settings...</p>
        </div>
      </div>
    );
  }

  return <UserSettingsPage user={user} activeTab={activeTab} basePath="/me/setting" />;
}
