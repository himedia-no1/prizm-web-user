'use server';

import testApi from '@/api/test.api';
import { createServerSession } from '@/lib/authSession';
import { mockUsers } from '@/__mocks__';

const providerToMockUserId = {
  GitHub: 'u2',
  Google: 'u1',
};

export async function authenticateWithProvider(provider) {
  const normalizedProvider = provider ?? 'Google';
  const mockCode = 'mock-oauth-code';

  const {
    accessToken,
    refreshToken,
    userId: resolvedUserIdFromApi,
    workspaceId,
  } = await testApi.loginWithProvider(normalizedProvider, mockCode);

  if (!refreshToken) {
    throw new Error('Missing refresh token');
  }

  const fallbackUserId = providerToMockUserId[normalizedProvider] ?? 'u1';
  const resolvedUserId = resolvedUserIdFromApi ?? fallbackUserId;
  const resolvedWorkspaceId = workspaceId ?? 'ws1';
  const user = mockUsers[resolvedUserId] ?? mockUsers[fallbackUserId] ?? mockUsers['u1'];

  await createServerSession({
    refreshToken,
    userId: resolvedUserId,
    workspaceId: resolvedWorkspaceId,
  });

  return {
    user,
    accessToken,
    workspaceId: resolvedWorkspaceId,
  };
}
