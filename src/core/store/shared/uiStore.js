import { create } from 'zustand';

/**
 * UI Store (공통)
 * - 테마 (다크모드)
 * - Modal 상태
 * - 자동 번역 설정
 *
 * 담당: 공통 (모든 개발자)
 */
export const useUIStore = create((set) => ({
  // Theme
  isDarkMode: false,
  toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
  setTheme: (mode) => set({ isDarkMode: mode === 'dark' }),

  // Modal
  modalType: null,
  modalProps: {},
  openModal: (type, props = {}) => set({ modalType: type, modalProps: props }),
  closeModal: () => set({ modalType: null, modalProps: {} }),

  // Auto Translation
  autoTranslateEnabled: true,
  toggleAutoTranslate: () => set((state) => ({ autoTranslateEnabled: !state.autoTranslateEnabled })),
  setAutoTranslate: (enabled) => set({ autoTranslateEnabled: enabled }),
}));

export default useUIStore;
