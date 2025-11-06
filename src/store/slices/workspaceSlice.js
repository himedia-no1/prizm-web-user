export const createWorkspaceSlice = (set, get) => ({
  currentWorkspace: null,
  setCurrentWorkspace: (workspace) => set({ currentWorkspace: workspace }),
  currentWorkspaceRole: null,
  setCurrentWorkspaceRole: (role) => set({ currentWorkspaceRole: role }),
  workspaceMemberships: {},
  setWorkspaceMemberships: (workspaceId, memberships) =>
    set((state) => ({
      workspaceMemberships: {
        ...state.workspaceMemberships,
        [workspaceId]: memberships,
      },
    })),
  createDM: (userId, router) => {
    const dmId = `dm-${userId}`;
    const workspaceId = get().currentWorkspace?.id;
    if (workspaceId) {
      router.push(`/workspace/${workspaceId}/channel/${dmId}`);
      set({ modalType: null, modalProps: {} });
    }
  },
});

export default createWorkspaceSlice;
