export const createSettingsSlice = (set, get) => ({
  userSettingsState: {
    activeTab: 'profile',
    formData: {},
    isEditing: false,
    hasUnsavedChanges: false,
  },
  
  workspaceSettingsState: {
    activeTab: 'overview',
    formData: {},
    isEditing: false,
    hasUnsavedChanges: false,
  },
  
  setUserSettingsTab: (tab) => set((state) => ({
    userSettingsState: { ...state.userSettingsState, activeTab: tab }
  })),
  
  setWorkspaceSettingsTab: (tab) => set((state) => ({
    workspaceSettingsState: { ...state.workspaceSettingsState, activeTab: tab }
  })),
  
  updateUserFormData: (data) => set((state) => ({
    userSettingsState: {
      ...state.userSettingsState,
      formData: { ...state.userSettingsState.formData, ...data },
      hasUnsavedChanges: true,
    }
  })),
  
  updateWorkspaceFormData: (data) => set((state) => ({
    workspaceSettingsState: {
      ...state.workspaceSettingsState,
      formData: { ...state.workspaceSettingsState.formData, ...data },
      hasUnsavedChanges: true,
    }
  })),
  
  setUserEditing: (isEditing) => set((state) => ({
    userSettingsState: { ...state.userSettingsState, isEditing }
  })),
  
  setWorkspaceEditing: (isEditing) => set((state) => ({
    workspaceSettingsState: { ...state.workspaceSettingsState, isEditing }
  })),
  
  saveUserSettings: () => set((state) => ({
    userSettingsState: {
      ...state.userSettingsState,
      isEditing: false,
      hasUnsavedChanges: false,
    }
  })),
  
  saveWorkspaceSettings: () => set((state) => ({
    workspaceSettingsState: {
      ...state.workspaceSettingsState,
      isEditing: false,
      hasUnsavedChanges: false,
    }
  })),
  
  resetUserSettings: () => set({
    userSettingsState: {
      activeTab: 'profile',
      formData: {},
      isEditing: false,
      hasUnsavedChanges: false,
    }
  }),
  
  resetWorkspaceSettings: () => set({
    workspaceSettingsState: {
      activeTab: 'overview',
      formData: {},
      isEditing: false,
      hasUnsavedChanges: false,
    }
  }),
});
