'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import axios from 'axios';

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8080';

/**
 * Refresh Token 쿠키 확인
 */
export async function hasRefreshToken() {
  const cookieStore = await cookies();
  return Boolean(cookieStore.get('refresh_token')?.value);
}

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
 * 워크스페이스 접근 권한 검증만 수행 (데이터는 CSR에서 로드)
 */
export async function validateWorkspaceAccess(workspaceId) {
  const accessToken = await refreshAccessToken();
  if (!accessToken) {
    redirect('/login');
  }

  try {
    await axios.get(`${BACKEND_URL}/api/workspaces/${workspaceId}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    // 검증만 수행, 데이터는 반환하지 않음 (CSR에서 로드)
  } catch (error) {
    const status = error.response?.status;

    if (status === 403 || status === 404) {
      await redirectToFallbackWorkspace(accessToken);
    }

    // 500 에러 등은 그냥 통과 (CSR에서 처리)
    console.error('[validateWorkspaceAccess] Error:', error.message);
  }
}

/**
 * 접근 가능한 워크스페이스 목록 조회
 */
export async function fetchAccessibleWorkspaces() {
  const accessToken = await refreshAccessToken();
  if (!accessToken) {
    return [];
  }

  try {
    const { data } = await axios.get(`${BACKEND_URL}/api/workspaces`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return Array.isArray(data) ? data : [];
  } catch (error) {
    return [];
  }
}

/**
 * 마지막 방문 경로 조회
 */
export async function fetchLastVisitedPath() {
  const accessToken = await refreshAccessToken();
  if (!accessToken) {
    return null;
  }

  try {
    const { data } = await axios.get(`${BACKEND_URL}/api/users/last-path`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return data?.path ?? null;
  } catch (error) {
    return null;
  }
}

/**
 * Fallback 워크스페이스로 리다이렉트
 */
async function redirectToFallbackWorkspace(accessToken) {
  const fallbackPath = await resolveAccessibleWorkspaceDashboard(accessToken);
  if (fallbackPath) {
    redirect(fallbackPath);
  }
  redirect('/workspace/new');
}

/**
 * 접근 가능한 첫 번째 워크스페이스 대시보드 경로 반환
 */
async function resolveAccessibleWorkspaceDashboard(accessToken) {
  try {
    const { data } = await axios.get(`${BACKEND_URL}/api/workspaces`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const workspaces = Array.isArray(data) ? data : [];
    if (workspaces.length > 0 && workspaces[0]?.id) {
      return `/workspace/${workspaces[0].id}/dashboard`;
    }
  } catch (error) {
    // ignore
  }
  return null;
}
