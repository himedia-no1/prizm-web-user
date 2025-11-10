export const createChatSlice = (set, get) => ({
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
  currentThread: null,
  openThread: (thread) => set({ currentThread: thread, modalType: null }),
  closeThread: () => set({ currentThread: null }),
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
});

export default createChatSlice;
