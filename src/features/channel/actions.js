'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { callBff } from '@/shared/server/bffClient';
import { COOKIE_KEYS } from '@/shared/constants/cookies';

export async function getCurrentUserId() {
  const cookieStore = await cookies();
  return cookieStore.get(COOKIE_KEYS.mockUserId)?.value;
}

export async function validateAndGetChannel(channelId, workspaceId) {
  const userId = await getCurrentUserId();

  if (!userId) {
    redirect('/app/login');
  }

  const response = await callBff({ method: 'GET', url: `/mock/channels/${channelId}` });

  if (response.status !== 200 || response.data.workspaceId !== workspaceId) {
    redirect(`/app/workspace/${workspaceId}/dashboard`);
  }

  return { channel: response.data, userId };
}
