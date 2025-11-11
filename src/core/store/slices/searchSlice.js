export const createSearchSlice = (set, get) => ({
  searchState: {
    query: '',
    activeFilter: 'all',
    results: [],
    loading: false,
    recentSearches: [],
  },
  
  setSearchQuery: (query) => set((state) => ({
    searchState: { ...state.searchState, query }
  })),
  
  setSearchFilter: (filter) => set((state) => ({
    searchState: { ...state.searchState, activeFilter: filter }
  })),
  
  setSearchResults: (results) => set((state) => ({
    searchState: { ...state.searchState, results }
  })),
  
  setSearchLoading: (loading) => set((state) => ({
    searchState: { ...state.searchState, loading }
  })),
  
  addRecentSearch: (query) => set((state) => {
    const recentSearches = [
      query,
      ...state.searchState.recentSearches.filter((q) => q !== query)
    ].slice(0, 10);
    return {
      searchState: { ...state.searchState, recentSearches }
    };
  }),
  
  clearSearchResults: () => set((state) => ({
    searchState: { ...state.searchState, results: [], query: '' }
  })),
  
  resetSearchState: () => set({
    searchState: {
      query: '',
      activeFilter: 'all',
      results: [],
      loading: false,
      recentSearches: [],
    }
  }),
});
