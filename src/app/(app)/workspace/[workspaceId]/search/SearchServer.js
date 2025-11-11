'use server';

import { cookies } from 'next/headers';
import { callBff } from '@/shared/server/bffClient';
import { COOKIE_KEYS } from '@/shared/constants/cookies';

export async function getSearchContext() {
  const cookieJar = await cookies();
  const userId = cookieJar.get(COOKIE_KEYS.mockUserId)?.value ?? 'u1';
  const response = await callBff({ method: 'GET', url: `/mock/users/${userId}` });
  return {
    user: response.status === 200 ? response.data : null,
  };
}
