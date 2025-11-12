import { create } from 'zustand';

/**
 * Chat Store
 * - 채널/메시지 관리
 * - 스레드 관리
 * - 즐겨찾기 채널
 * - 읽지 않음 카운트
 * - 채널별 알림 설정
 *
 * 담당: 개발자 B (Chat)
 */
export const useChatStore = create((set, get) => ({
  // Favorite Channels
  favoriteChannels: ['c1', 'c3'],
  toggleFavoriteChannel: (channelId) =>
    set((state) => {
      const isFavorite = state.favoriteChannels.includes(channelId);
      return {
        favoriteChannels: isFavorite
          ? state.favoriteChannels.filter((id) => id !== channelId)
          : [...state.favoriteChannels, channelId],
      };
    }),

  // Thread
  currentThread: null,
  openThread: (thread) => set({ currentThread: thread }),
  closeThread: () => set({ currentThread: null }),

  // Unread Counts
  unreadCounts: {},
  setUnreadCount: (channelId, count) =>
    set((state) => ({
      unreadCounts: { ...state.unreadCounts, [channelId]: count },
    })),
  incrementUnreadCount: (channelId) =>
    set((state) => ({
      unreadCounts: {
        ...state.unreadCounts,
        [channelId]: (state.unreadCounts[channelId] || 0) + 1,
      },
    })),
  clearUnreadCount: (channelId) =>
    set((state) => {
      const newCounts = { ...state.unreadCounts };
      delete newCounts[channelId];
      return { unreadCounts: newCounts };
    }),

  // Channel Notification Settings
  channelNotificationSettings: {},
  setChannelNotifications: (channelId, enabled) =>
    set((state) => ({
      channelNotificationSettings: {
        ...state.channelNotificationSettings,
        [channelId]: enabled,
      },
    })),
  isChannelNotificationsEnabled: (channelId) => {
    const map = get().channelNotificationSettings;
    if (Object.prototype.hasOwnProperty.call(map, channelId)) {
      return map[channelId];
    }
    return true;
  },
  toggleChannelNotifications: (channelId) => {
    const current = get().isChannelNotificationsEnabled(channelId);
    set((state) => ({
      channelNotificationSettings: {
        ...state.channelNotificationSettings,
        [channelId]: !current,
      },
    }));
  },
}));

export default useChatStore;
