import { create } from 'zustand';

/**
 * Notification Store
 * - 알림 목록 관리
 * - 알림 읽음/삭제
 * - Inbox UI 상태
 *
 * 담당: 개발자 B (Chat)
 */
export const useNotificationStore = create((set, get) => ({
  // Notifications
  notifications: [],
  addNotification: (notification) =>
    set((state) => ({
      notifications: [notification, ...state.notifications],
    })),
  markNotificationAsRead: (notificationId) =>
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === notificationId ? { ...n, read: true } : n
      ),
    })),
  deleteNotification: (notificationId) =>
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== notificationId),
    })),
  markAllNotificationsAsRead: () =>
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, read: true })),
    })),
  clearNotifications: () => set({ notifications: [] }),

  // Inbox UI State
  inboxState: {
    activeTab: 'all',
    showUnreadOnly: false,
    selectedIds: [],
    loading: false,
  },

  setInboxTab: (tab) => set((state) => ({
    inboxState: { ...state.inboxState, activeTab: tab }
  })),

  toggleUnreadFilter: () => set((state) => ({
    inboxState: { ...state.inboxState, showUnreadOnly: !state.inboxState.showUnreadOnly }
  })),

  setSelectedNotifications: (ids) => set((state) => ({
    inboxState: { ...state.inboxState, selectedIds: ids }
  })),

  toggleNotificationSelection: (id) => set((state) => {
    const { selectedIds } = state.inboxState;
    const newSelectedIds = selectedIds.includes(id)
      ? selectedIds.filter((selectedId) => selectedId !== id)
      : [...selectedIds, id];
    return {
      inboxState: { ...state.inboxState, selectedIds: newSelectedIds }
    };
  }),

  clearNotificationSelection: () => set((state) => ({
    inboxState: { ...state.inboxState, selectedIds: [] }
  })),

  setInboxLoading: (loading) => set((state) => ({
    inboxState: { ...state.inboxState, loading }
  })),

  resetInboxState: () => set({
    inboxState: {
      activeTab: 'all',
      showUnreadOnly: false,
      selectedIds: [],
      loading: false,
    }
  }),
}));

export default useNotificationStore;
