'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { callBff } from '@/shared/server/bffClient';
import { COOKIE_KEYS } from '@/shared/constants/cookies';

export async function getCurrentUserId() {
  const cookieStore = await cookies();
  return cookieStore.get(COOKIE_KEYS.mockUserId)?.value;
}

export async function validateAndGetWorkspace(workspaceId) {
  const userId = await getCurrentUserId();

  if (!userId) {
    redirect('/login');
  }

  const response = await callBff({ method: 'GET', url: `/mock/workspaces/${workspaceId}` });

  if (response.status === 200) {
    return { workspace: response.data, userId };
  }

  if (response.status === 403 || response.status === 404) {
    await redirectToFallbackWorkspace();
  }

  throw new Error(`Failed to load workspace ${workspaceId}`);
}

async function redirectToFallbackWorkspace() {
  const fallbackPath = await resolveAccessibleWorkspaceDashboard();
  if (fallbackPath) {
    redirect(fallbackPath);
  }
  redirect('/workspace/new');
}

export async function fetchAccessibleWorkspaces() {
  const response = await callBff({ method: 'GET', url: '/mock/workspaces/access' });
  if (response.status === 200 && Array.isArray(response.data)) {
    return response.data;
  }
  return [];
}

export async function fetchLastVisitedPath() {
  const response = await callBff({ method: 'GET', url: '/mock/workspaces/last-visited' });
  if (response.status === 200) {
    return response.data?.lastVisitedPath ?? null;
  }
  return null;
}

async function resolveAccessibleWorkspaceDashboard() {
  const workspaces = await fetchAccessibleWorkspaces();
  if (workspaces.length > 0 && workspaces[0]?.id) {
    return `/workspace/${workspaces[0].id}/dashboard`;
  }
  return null;
}

export async function hasRefreshToken() {
  const cookieStore = await cookies();
  return Boolean(cookieStore.get(COOKIE_KEYS.refreshToken)?.value);
}
