import { create } from 'zustand';

/**
 * Workspace Store
 * - 워크스페이스 관리
 * - 멤버 관리
 * - 프로필 관리
 * - Bootstrap 데이터 (workspaces, categories, users, groups, members)
 *
 * 담당: 개발자 A (Workspace)
 */
export const useWorkspaceStore = create((set, get) => ({
  // Current Workspace
  currentWorkspace: null,
  setCurrentWorkspace: (workspace) => set({ currentWorkspace: workspace }),

  currentWorkspaceRole: null,
  setCurrentWorkspaceRole: (role) => set({ currentWorkspaceRole: role }),

  // Bootstrap Data
  workspaces: [],
  categories: [],
  users: {},
  workspaceGroups: {},
  workspaceMembers: {},
  currentUserProfile: null, // 워크스페이스 간단 프로필

  // Bootstrap Loader
  setBootstrapData: (data) =>
    set({
      workspaces: data.workspaces ?? [],
      categories: data.categories ?? [],
      users: data.users ?? {},
      workspaceGroups: data.workspaceGroups ?? {},
      workspaceMembers: data.workspaceMembers ?? {},
    }),

  // Workspaces (워크스페이스 목록)
  setWorkspaces: (workspaces) => set({ workspaces: workspaces ?? [] }),

  // Categories (채널 목록)
  setCategories: (categories) => set({ categories }),

  // Current User Profile (워크스페이스 간단 프로필)
  setCurrentUserProfile: (profile) => set({ currentUserProfile: profile }),

  // Workspace Memberships
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

  // Helpers
  getWorkspaceMembers: (workspaceId) => {
    const members = get().workspaceMembers ?? {};
    return members[workspaceId] ?? {};
  },

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
