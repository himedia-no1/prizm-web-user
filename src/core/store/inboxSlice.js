export const createInboxSlice = (set, get) => ({
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
});
