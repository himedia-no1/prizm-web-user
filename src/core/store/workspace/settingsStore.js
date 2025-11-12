import { create } from 'zustand';

/**
 * Workspace Settings Store
 * - 워크스페이스 설정 UI 상태
 * - 초대 링크 관리
 *
 * 담당: 개발자 A (Workspace)
 */
export const useWorkspaceSettingsStore = create((set, get) => ({
  // 선택된 탭
  selectedTab: 'overview',
  setSelectedTab: (tab) => set({ selectedTab: tab }),

  // 초대 링크 복사 상태
  copiedLinkId: null,
  setCopiedLinkId: (id) => set({ copiedLinkId: id }),

  // 초대 링크 복사 액션
  copyInviteLink: (id, url) => {
    navigator.clipboard.writeText(url);
    set({ copiedLinkId: id });
    setTimeout(() => {
      if (get().copiedLinkId === id) {
        set({ copiedLinkId: null });
      }
    }, 2000);
  },

  // 초대 상태 톤 (색상/라벨)
  getInviteStatusTone: (status) => {
    const tones = {
      pending: {
        background: 'rgba(251, 191, 36, 0.15)',
        color: '#d97706',
        label: '대기 중',
      },
      accepted: {
        background: 'rgba(34, 197, 94, 0.15)',
        color: '#16a34a',
        label: '수락됨',
      },
      expired: {
        background: 'rgba(239, 68, 68, 0.15)',
        color: '#dc2626',
        label: '만료됨',
      },
    };
    return tones[status] || tones.pending;
  },

  // 타임스탬프 포맷
  formatInviteTimestamp: (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString('ko-KR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  },
}));

export default useWorkspaceSettingsStore;
