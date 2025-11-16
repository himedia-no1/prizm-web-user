import { cookies } from 'next/headers';
const SESSION_COOKIE_KEY = 'prizm_session';
const DEFAULT_MAX_AGE = 60 * 60 * 24 * 14; // 14 days

const serializeSession = (session) =>
  Buffer.from(JSON.stringify(session), 'utf-8').toString('base64url');

const deserializeSession = (value) => {
  if (!value) return null;
  try {
    return JSON.parse(Buffer.from(value, 'base64url').toString('utf-8'));
  } catch (error) {
    console.warn('[authSession] Failed to parse session cookie:', error);
    return null;
  }
};

const sanitizeSessionPayload = (session) => {
  if (!session) {
    return null;
  }

  const { refreshToken, userId, workspaceId = null } = session;
  if (!refreshToken || !userId) {
    return null;
  }

  return {
    refreshToken,
    userId,
    workspaceId,
  };
};

export const getServerSession = async () => {
  const cookieStore = await cookies();
  const raw = cookieStore.get(SESSION_COOKIE_KEY)?.value;
  return deserializeSession(raw);
};

export const createServerSession = async (session, options = {}) => {
  const sanitized = sanitizeSessionPayload(session);

  if (!sanitized) {
    throw new Error('Invalid session payload');
  }

  const cookieStore = await cookies();
  const value = serializeSession(sanitized);

  const defaultOptions = {
    httpOnly: true,
    path: '/',
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: DEFAULT_MAX_AGE,
  };

  cookieStore.set(
    SESSION_COOKIE_KEY,
    value,
    {
      ...defaultOptions,
      ...options,
    },
  );
};

export const clearServerSession = async () => {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_KEY, { path: '/' });
};
