'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import axiosInstance from '@/core/api/axiosInstance';
import { useAuthStore } from '@/core/store/authStore';

/**
 * 마지막 접속한 워크스페이스 경로를 서버에 저장하는 Hook
 * 특정 페이지에서만 실행됨:
 * - /workspace/{workspaceId}/dashboard
 * - /workspace/{workspaceId}/channel/{channelId}
 */
export function useLastWorkspacePath() {
  const pathname = usePathname();
  const accessToken = useAuthStore((state) => state.accessToken);

  useEffect(() => {
    if (!pathname) {
      return;
    }

    const normalizedPath = pathname.replace(/^\/[a-z]{2}(?=\/)/i, '') || pathname;
    const shouldSave =
      /\/workspace\/[^/]+\/dashboard$/.test(normalizedPath) ||
      /\/workspace\/[^/]+\/channel\/[^/]+/.test(normalizedPath);

    if (shouldSave && accessToken) {
      axiosInstance
        .post(
          '/mock/workspaces/last-visited',
          { path: pathname },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        )
        .catch((err) => {
          console.error('[useLastWorkspacePath] Failed to save:', err);
        });
    }
  }, [pathname, accessToken]);
}
