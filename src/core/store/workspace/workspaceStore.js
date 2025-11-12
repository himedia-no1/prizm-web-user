import { create } from 'zustand';

/**
 * Workspace Store
 * - 워크스페이스 관리
 * - 멤버 관리
 * - 프로필 관리
 *
 * 담당: 개발자 A (Workspace)
 */
export const useWorkspaceStore = create((set, get) => ({
  // Current Workspace
  currentWorkspace: null,
  setCurrentWorkspace: (workspace) => set({ currentWorkspace: workspace }),

  currentWorkspaceRole: null,
  setCurrentWorkspaceRole: (role) => set({ currentWorkspaceRole: role }),

  // Workspace Memberships
  workspaceMemberships: {},
  setWorkspaceMemberships: (workspaceId, memberships) =>
    set((state) => ({
      workspaceMemberships: {
        ...state.workspaceMemberships,
        [workspaceId]: memberships,
      },
    })),

  // Workspace Profiles (워크스페이스별 사용자 프로필)
  workspaceProfiles: {},
  setWorkspaceProfile: (workspaceId, profile) =>
    set((state) => ({
      workspaceProfiles: {
        ...state.workspaceProfiles,
        [workspaceId]: profile,
      },
    })),
  getWorkspaceProfile: (workspaceId) => get().workspaceProfiles[workspaceId] || null,

  // DM Creation
  createDM: (userId, router) => {
    const dmId = `dm-${userId}`;
    const workspaceId = get().currentWorkspace?.id;
    if (workspaceId) {
      router.push(`/app/workspace/${workspaceId}/channel/${dmId}`);
    }
  },
}));

export default useWorkspaceStore;
