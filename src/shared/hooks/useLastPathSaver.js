import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { userService } from '@/core/api/services';

/**
 * 대시보드 및 채널 페이지 방문 시 마지막 경로를 자동 저장하는 훅
 *
 * 저장되는 경로:
 * - /workspace/{workspaceId}/dashboard
 * - /workspace/{workspaceId}/channel/{channelId}
 */
export function useLastPathSaver() {
  const pathname = usePathname();
  const lastSavedPath = useRef(null);

  useEffect(() => {
    // 경로가 변경되지 않았으면 저장하지 않음
    if (!pathname || pathname === lastSavedPath.current) {
      return;
    }

    // 대시보드 또는 채널 페이지인지 확인
    const isDashboard = /^\/[^/]+\/workspace\/[^/]+\/dashboard$/.test(pathname);
    const isChannel = /^\/[^/]+\/workspace\/[^/]+\/channel\/[^/]+$/.test(pathname);

    if (isDashboard || isChannel) {
      lastSavedPath.current = pathname;

      // 비동기로 저장 (실패해도 사용자 경험에 영향 없음)
      userService.saveLastPath(pathname).catch((error) => {
        console.error('Failed to save last path:', error);
      });
    }
  }, [pathname]);
}
