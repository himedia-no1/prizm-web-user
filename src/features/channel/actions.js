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
 * 채널 접근 권한 검증만 수행 (데이터는 CSR에서 로드)
 */
export async function validateChannelAccess(channelId, workspaceId) {
  const accessToken = await refreshAccessToken();
  if (!accessToken) {
    redirect('/login');
  }

  try {
    await axios.get(`${BACKEND_URL}/api/workspaces/${workspaceId}/channels/${channelId}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    // 검증만 수행, 데이터는 반환하지 않음 (CSR에서 로드)
  } catch (error) {
    const status = error.response?.status;

    if (status === 403 || status === 404) {
      redirect(`/workspace/${workspaceId}/dashboard`);
    }

    // 500 에러 등은 그냥 통과 (CSR에서 처리)
    console.error('[validateChannelAccess] Error:', error.message);
  }
}
