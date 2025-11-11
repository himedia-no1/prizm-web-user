export const createUISlice = (set) => ({
  isDarkMode: false,
  toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
  setTheme: (mode) => set({ isDarkMode: mode === 'dark' }),
  autoTranslateEnabled: true,
  toggleAutoTranslate: () => set((state) => ({ autoTranslateEnabled: !state.autoTranslateEnabled })),
  setAutoTranslate: (enabled) => set({ autoTranslateEnabled: enabled }),
});

export default createUISlice;
