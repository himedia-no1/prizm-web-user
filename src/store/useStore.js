import { create } from 'zustand';

const useStore = create((set, get) => ({
  // Dark mode state
  isDarkMode: false,
  toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),

  // Modal state
  modalType: null,
  modalProps: {},
  openModal: (type, props = {}) => set({ modalType: type, modalProps: props }),
  closeModal: () => set({ modalType: null, modalProps: {} }),

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

  // Language state
  language: 'ko',
  toggleLanguage: () => set((state) => ({ language: state.language === 'ko' ? 'en' : 'ko' })),
}));



export default useStore;
