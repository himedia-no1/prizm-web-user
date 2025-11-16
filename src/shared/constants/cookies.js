export const COOKIE_KEYS = {
  refreshToken: 'refresh_token',
  mockUserId: 'mock_user_id',
  mockUserRole: 'mock_user_role',
};

export const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  maxAge: 60 * 60 * 24 * 7,
  path: '/',
};
