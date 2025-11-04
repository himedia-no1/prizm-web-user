import { create } from 'zustand';

const useStore = create((set, get) => ({
  // Dark mode state
  isDarkMode: false,
  toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
  setTheme: (mode) => set({ isDarkMode: mode === 'dark' }),

  // Modal state
  modalType: null,
  modalProps: {},
  openModal: (type, props = {}) => set({ modalType: type, modalProps: props }),
  closeModal: () => set({ modalType: null, modalProps: {} }),

  // Favorite channels
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

  // Thread state
  currentThread: null,
  openThread: (thread) => set({ currentThread: thread, modalType: null }),
  closeThread: () => set({ currentThread: null }),

  // Workspace state
  currentWorkspace: null,
  setCurrentWorkspace: (workspace) => set({ currentWorkspace: workspace }),

  // DM state
  createDM: (userId, router) => {
    const dmId = `dm-${userId}`;
    const workspaceId = get().currentWorkspace?.id;
    if (workspaceId) {
      router.push(`/workspace/${workspaceId}/channel/${dmId}`);
      set({ modalType: null, modalProps: {} });
    }
  },

  // AI Search state
  isAiSearchEnabled: false,
  toggleAiSearch: () => set((state) => ({ isAiSearchEnabled: !state.isAiSearchEnabled })),

  // Language state
  language: 'ko',
  toggleLanguage: () => set((state) => ({ language: state.language === 'ko' ? 'en' : 'ko' })),
  setLanguage: (lang) => set({ language: lang }),
}));



export default useStore;
