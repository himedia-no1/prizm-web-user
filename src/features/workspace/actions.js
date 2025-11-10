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
    redirect('/app/login');
  }

  const response = await callBff({ method: 'GET', url: `/mock/workspaces/${workspaceId}` });

  if (response.status === 200) {
    return { workspace: response.data, userId };
  }

  if (response.status === 403) {
    return handleWorkspaceForbidden();
  }

  if (response.status === 404) {
    return handleWorkspaceNotFound();
  }

  throw new Error(`Failed to load workspace ${workspaceId}`);
}

async function handleWorkspaceNotFound() {
  const lastVisitedPath = await fetchLastVisitedPath();
  if (lastVisitedPath) {
    redirect(lastVisitedPath);
  }

  const workspaces = await fetchAccessibleWorkspaces();
  if (workspaces.length > 0) {
    redirect(`/app/workspace/${workspaces[0].id}/dashboard`);
  }

  redirect('/app/workspace/new');
}

async function handleWorkspaceForbidden() {
  const workspaces = await fetchAccessibleWorkspaces();
  if (workspaces.length > 0) {
    redirect(`/app/workspace/${workspaces[0].id}/dashboard`);
  }
  redirect('/app/workspace/new');
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
