'use server';

import { callBff } from '@/shared/server/bffClient';

export async function getUserSettingsContext() {
  const response = await callBff({ method: 'GET', url: '/mock/users/settings' });
  if (response.status !== 200) {
    return {
      user: null,
      deviceSessions: [],
    };
  }

  return {
    user: response.data?.user ?? null,
    deviceSessions: Array.isArray(response.data?.deviceSessions) ? response.data.deviceSessions : [],
  };
}
