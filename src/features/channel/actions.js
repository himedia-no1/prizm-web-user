'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import axios from 'axios';

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8080';

/**
 * SSR에서 직접 refresh 호출 (인터셉터 사용 X)
 */
async function refreshAccessToken() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get('refresh_token')?.value;

  if (!refreshToken) {
    return null;
  }

  try {
    const { data } = await axios.post(`${BACKEND_URL}/api/auth/refresh`, null, {
      headers: { Cookie: `refresh_token=${refreshToken}` },
    });
    return data?.accessToken ?? null;
  } catch (error) {
    return null;
  }
}

/**
 * 채널 검증 및 조회
 */
export async function validateAndGetChannel(channelId, workspaceId) {
  const accessToken = await refreshAccessToken();
  if (!accessToken) {
    redirect('/login');
  }

  try {
    const { data } = await axios.get(`${BACKEND_URL}/api/workspaces/${workspaceId}/channels/${channelId}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return { channel: data };
  } catch (error) {
    if (error.response?.status === 403 || error.response?.status === 404) {
      redirect(`/workspace/${workspaceId}/dashboard`);
    }
    throw error;
  }
}
