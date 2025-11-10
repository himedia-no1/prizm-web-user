export const createProfileSlice = (set, get) => ({
  workspaceProfiles: {},
  setWorkspaceProfile: (workspaceId, profile) =>
    set((state) => ({
      workspaceProfiles: {
        ...state.workspaceProfiles,
        [workspaceId]: profile,
      },
    })),
  getWorkspaceProfile: (workspaceId) => get().workspaceProfiles[workspaceId] || null,
});

export default createProfileSlice;
