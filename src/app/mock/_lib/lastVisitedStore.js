import { getUserById, PROVIDER_USER_MAP } from '@/app/mock/_lib';

const DEFAULT_USER_IDS = Array.from(new Set(Object.values(PROVIDER_USER_MAP)));

const seed = DEFAULT_USER_IDS.reduce((acc, id) => {
  const profile = getUserById(id);
  if (profile?.lastVisitedPath) {
    acc[id] = profile.lastVisitedPath;
  }
  return acc;
}, {});

const cache = new Map(Object.entries(seed));

export const getLastVisited = (userId) => {
  if (!userId) {
    return null;
  }
  return cache.get(userId) ?? null;
};

export const setLastVisited = (userId, path) => {
  if (!userId || typeof path !== 'string') {
    return;
  }
  const trimmed = path.trim();
  if (!trimmed) {
    return;
  }
  cache.set(userId, trimmed);
};

export const clearLastVisited = (userId) => {
  if (!userId) {
    return;
  }
  cache.delete(userId);
};
