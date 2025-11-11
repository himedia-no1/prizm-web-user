export const createUISlice = (set) => ({
  isDarkMode: false,
  toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
  setTheme: (mode) => set({ isDarkMode: mode === 'dark' }),
  isAiSearchEnabled: false,
  toggleAiSearch: () => set((state) => ({ isAiSearchEnabled: !state.isAiSearchEnabled })),
  autoTranslateEnabled: true,
  toggleAutoTranslate: () => set((state) => ({ autoTranslateEnabled: !state.autoTranslateEnabled })),
  setAutoTranslate: (enabled) => set({ autoTranslateEnabled: enabled }),
});

export default createUISlice;
