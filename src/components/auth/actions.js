'use server';

import { cookies } from 'next/headers';
import { callBff } from '@/shared/server/bffClient';
import { COOKIE_KEYS, COOKIE_OPTIONS } from '@/shared/constants/cookies';

export async function authenticateWithProvider(provider) {
  console.log(`[Server Action] Authenticating with ${provider}`);

  try {
    const response = await callBff({
      method: 'POST',
      url: '/mock/auth/login',
      data: {
        provider,
        code: `mock-code-${Date.now()}`,
      },
    });

    if (response.status !== 200) {
      throw new Error('Failed to login');
    }

    const data = response.data ?? {};

    if (data.refreshToken && data.user?.id) {
      const jar = await cookies();
      jar.set(COOKIE_KEYS.refreshToken, data.refreshToken, COOKIE_OPTIONS);
      jar.set(COOKIE_KEYS.mockUserId, data.user.id, COOKIE_OPTIONS);
      jar.set(COOKIE_KEYS.mockUserRole, data.user.role ?? 'member', COOKIE_OPTIONS);
    }

    console.log('[Server Action] Login success:', data?.user);

    return {
      user: data?.user ?? null,
      accessToken: data?.accessToken ?? null,
      workspaceId: data?.workspaceId ?? null,
    };
  } catch (error) {
    throw error;
  }
}
