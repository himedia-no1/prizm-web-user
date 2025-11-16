'use server';

import { cookies } from 'next/headers';
import { COOKIE_KEYS, COOKIE_OPTIONS } from './constants';
import { getUserById } from './users';

export const issueSessionCookies = async ({ refreshToken, userId, role }) => {
  const jar = await cookies();
  jar.set(COOKIE_KEYS.refreshToken, refreshToken, COOKIE_OPTIONS);
  jar.set(COOKIE_KEYS.mockUserId, userId, COOKIE_OPTIONS);
  jar.set(COOKIE_KEYS.mockUserRole, role ?? 'member', COOKIE_OPTIONS);
};

export const clearSessionCookies = async () => {
  const jar = await cookies();
  Object.values(COOKIE_KEYS).forEach((key) => {
    jar.delete(key, { path: '/' });
  });
};

export const readMockUserFromCookies = async () => {
  const jar = await cookies();
  const userId = jar.get(COOKIE_KEYS.mockUserId)?.value;
  if (!userId) {
    return null;
  }
  return getUserById(userId);
};

export const requireMockUser = async () => {
  const user = await readMockUserFromCookies();
  if (!user) {
    throw new Error('Unauthorized');
  }
  return user;
};
