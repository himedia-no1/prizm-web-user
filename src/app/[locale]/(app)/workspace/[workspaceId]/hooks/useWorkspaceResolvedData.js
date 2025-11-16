'use client';

import { useMemo } from 'react';
import { useWorkspaceStore } from '@/core/store/workspace';
import { useChatStore } from '@/core/store/chat';
import {
  selectWorkspaces,
  selectCategories,
  selectWorkspaceUsers,
  selectWorkspaceMembersMap,
} from '@/core/store/workspace/selectors';

export const useWorkspaceResolvedData = ({ workspaceId, initialWorkspace, userId, defaultUserName }) => {
  const workspaces = useWorkspaceStore(selectWorkspaces);
  const categories = useWorkspaceStore(selectCategories);
  const users = useWorkspaceStore(selectWorkspaceUsers);
  const workspaceMembersMap = useWorkspaceStore(selectWorkspaceMembersMap);
  const dms = useChatStore((state) => state.dms);

  const workspacesList = useMemo(() => {
    if (workspaces && workspaces.length > 0) {
      return workspaces;
    }
    if (initialWorkspace) {
      return [initialWorkspace];
    }
    return [];
  }, [workspaces, initialWorkspace]);

  const currentWorkspace = useMemo(() => {
    if (initialWorkspace) {
      return initialWorkspace;
    }
    return workspacesList.find((ws) => ws.id === workspaceId) ?? workspacesList[0] ?? null;
  }, [initialWorkspace, workspacesList, workspaceId]);

  const currentUser = useMemo(() => {
    if (userId && users[userId]) {
      return users[userId];
    }
    const fallback = Object.values(users ?? {})[0];
    return fallback ?? null;
  }, [users, userId]);

  const workspaceMembers = useMemo(
    () => workspaceMembersMap?.[workspaceId] ?? {},
    [workspaceId, workspaceMembersMap],
  );

  const safeWorkspace = useMemo(
    () => currentWorkspace ?? { id: workspaceId ?? 'workspace', name: 'Workspace' },
    [currentWorkspace, workspaceId],
  );

  const safeCurrentUser = useMemo(
    () => currentUser ?? { id: userId ?? 'user', name: defaultUserName, status: 'offline' },
    [currentUser, userId, defaultUserName],
  );

  const currentMembership = useMemo(
    () => workspaceMembers[userId] ?? { role: 'member' },
    [workspaceMembers, userId],
  );

  const permissionFlags = useMemo(() => {
    const role = currentMembership.role ?? 'member';
    const isPrivileged = role === 'owner' || role === 'manager';
    return {
      role,
      canManageWorkspace: isPrivileged,
      canInviteMembers: isPrivileged,
      canManageCategories: isPrivileged,
      canManageAppConnect: isPrivileged,
    };
  }, [currentMembership]);

  return {
    workspacesList,
    categories,
    dms,
    users,
    safeWorkspace,
    safeCurrentUser,
    workspaceMembers,
    permissionFlags,
    currentMembership,
  };
};

export default useWorkspaceResolvedData;
