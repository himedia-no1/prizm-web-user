'use client';

export const selectWorkspaces = (state) => state.workspaces ?? [];
export const selectCategories = (state) => state.categories ?? [];
export const selectWorkspaceUsers = (state) => state.users ?? {};
export const selectWorkspaceMembersMap = (state) => state.workspaceMembers ?? {};

export const selectWorkspaceById = (state, workspaceId) =>
  (state.workspaces ?? []).find((workspace) => workspace.id === workspaceId) ?? null;

export default {
  selectWorkspaces,
  selectCategories,
  selectWorkspaceUsers,
  selectWorkspaceMembersMap,
  selectWorkspaceById,
};
