export const MODAL_DEFAULT_STATES = {
  inbox: {
    activeTab: 'all',
    showUnreadOnly: false,
    selectedIds: [],
    loading: false,
  },
  aiAssistant: {
    prompt: '',
    response: '',
    loading: false,
    conversationHistory: [],
  },
  search: {
    query: '',
    activeFilter: 'all',
    results: [],
    loading: false,
  },
};

export const SETTINGS_DEFAULT_STATES = {
  user: {
    activeTab: 'profile',
    formData: {},
    isEditing: false,
  },
  workspace: {
    activeTab: 'overview',
    formData: {},
    isEditing: false,
  },
};
