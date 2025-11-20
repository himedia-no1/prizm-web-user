'use client';

import { useEffect, useMemo } from 'react';
import { useWorkspaceStore } from '@/core/store/workspace';
import { useChatStore } from '@/core/store/chat';
import { workspaceService, channelService } from '@/core/api/services';
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
  const currentUserProfile = useWorkspaceStore((state) => state.currentUserProfile); // 워크스페이스 간단 프로필

  // 워크스페이스 간단 프로필 + 채널 목록 + 워크스페이스 목록 + 워크스페이스 정보 가져오기
  useEffect(() => {
    let cancelled = false;

    const fetchWorkspaceData = async () => {
      if (!workspaceId) return;
      
      // axios interceptor가 401 발생 시 자동으로 refresh하므로 바로 API 호출
      try {
        // 1. 워크스페이스 목록 조회 (사이드바 드롭다운용)
        const allWorkspaces = await workspaceService.getWorkspaces();
        
        // 2. 현재 워크스페이스 정보 조회 (이름, 이미지)
        const workspaceInfo = await workspaceService.getWorkspace(workspaceId);
        
        // 3. 워크스페이스 간단 프로필 조회
        const profile = await workspaceService.getMyProfile(workspaceId);
        
        // 4. 채널 목록 조회 (카테고리 + 채널 중첩 배열)
        const channelsData = await channelService.getAccessibleChannels(workspaceId);
        
        if (!cancelled) {
          // Store에 저장
          useWorkspaceStore.getState().setWorkspaces(allWorkspaces);
          useWorkspaceStore.getState().setCurrentWorkspace(workspaceInfo);
          useWorkspaceStore.getState().setCategories(channelsData.categories || []);
          useWorkspaceStore.getState().setCurrentUserProfile(profile);
          
          // myRole 저장
          if (workspaceInfo?.myRole) {
            useWorkspaceStore.getState().setCurrentWorkspaceRole(workspaceInfo.myRole);
          }
        }
      } catch (error) {
        console.error('Failed to load workspace data:', error);
      }
    };

    fetchWorkspaceData();

    return () => {
      cancelled = true;
    };
  }, [workspaceId]);

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
    // Store에 저장된 워크스페이스 정보 우선 사용
    const storeWorkspace = useWorkspaceStore.getState().currentWorkspace;
    if (storeWorkspace && storeWorkspace.id === workspaceId) {
      return storeWorkspace;
    }
    if (initialWorkspace) {
      return initialWorkspace;
    }
    return workspacesList.find((ws) => ws.id === workspaceId) ?? workspacesList[0] ?? null;
  }, [workspacesList, workspaceId, initialWorkspace]);

  const safeWorkspace = useMemo(() => {
    // Store에 저장된 워크스페이스 정보가 있으면 사용
    const storeWorkspace = useWorkspaceStore.getState().currentWorkspace;
    if (storeWorkspace && storeWorkspace.id === workspaceId) {
      return storeWorkspace;
    }
    // 데이터 로딩 전에는 null 반환
    if (!currentWorkspace) {
      return null;
    }
    return currentWorkspace;
  }, [currentWorkspace, workspaceId]);

  const safeCurrentUser = useMemo(() => {
    // 워크스페이스 간단 프로필이 있으면 사용
    if (currentUserProfile) {
      return {
        id: userId ?? 'user',
        name: currentUserProfile.name || defaultUserName,
        avatar: currentUserProfile.imageUrl || null,
        status: currentUserProfile.state || 'offline',
        notify: currentUserProfile.notify,
        role: currentUserProfile.role, // 역할 추가
      };
    }
    
    // 기본 users에서 찾기 (users가 배열인지 확인)
    if (Array.isArray(users)) {
      const foundUser = users.find((u) => u.id === userId);
      if (foundUser) {
        return foundUser;
      }
    }
    
    return { id: userId ?? 'user', name: defaultUserName, status: 'offline' };
  }, [currentUserProfile, users, userId, defaultUserName]);

  const currentMembership = useMemo(() => {
    // 워크스페이스 멤버십 정보 가져오기 (id 포함)
    const membership = workspaceMembersMap?.[userId];
    
    if (membership) {
      return membership; // id, role 등 모든 필드 포함
    }
    
    // currentUserProfile에서 role 가져오기 (fallback)
    if (currentUserProfile?.role) {
      return { 
        id: currentUserProfile.id,
        role: currentUserProfile.role 
      };
    }
    
    return { role: 'MEMBER' };
  }, [workspaceMembersMap, userId, currentUserProfile]);

  const permissionFlags = useMemo(() => {
    const role = currentMembership.role ?? 'MEMBER';
    const isPrivileged = role === 'OWNER' || role === 'MANAGER';
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
    workspaceMembers: workspaceMembersMap,
    permissionFlags,
    currentMembership,
  };
};

export default useWorkspaceResolvedData;
