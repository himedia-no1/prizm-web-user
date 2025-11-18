'use client';

const LAST_PATH_COOKIE = 'last_path';
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

const encodePath = (path = '/') => encodeURIComponent(path);
const decodePath = (cookieValue = '') => {
  try {
    return decodeURIComponent(cookieValue);
  } catch {
    return '/';
  }
};

const buildCookieString = (path) =>
  `${LAST_PATH_COOKIE}=${encodePath(path)}; path=/; SameSite=Lax; Max-Age=${COOKIE_MAX_AGE}`;

export const saveLastPathCookie = (path) => {
  if (typeof document === 'undefined' || !path) {
    return;
  }
  document.cookie = buildCookieString(path);
};

export const getLastPathFromCookie = () => {
  if (typeof document === 'undefined') {
    return null;
  }
  const cookies = document.cookie?.split(';') ?? [];
  for (const raw of cookies) {
    const [key, value] = raw.trim().split('=');
    if (key === LAST_PATH_COOKIE) {
      return decodePath(value);
    }
  }
  return null;
};

export const clearLastPathCookie = () => {
  if (typeof document === 'undefined') {
    return;
  }
  document.cookie = `${LAST_PATH_COOKIE}=; path=/; SameSite=Lax; Max-Age=0`;
};
