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
});

export default createChatSlice;
