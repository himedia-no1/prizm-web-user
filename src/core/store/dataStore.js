'use client';

import { create } from 'zustand';
import axiosInstance from '@/core/api/axiosInstance';
import { useWorkspaceStore } from './workspace';
import { useChatStore } from './chat';
import { useAIStore } from './ai';

/**
 * Bootstrap Data Store (통합 로더)
 *
 * 초기 데이터를 한 번에 로드하고 각 도메인 Store에 분산합니다.
 * 실제 데이터는 각 도메인 Store에 저장됩니다:
 * - useWorkspaceStore: workspaces, categories, users, groups, members
 * - useChatStore: messages, channelDetails, threadMessages, dms
 * - useAIStore: appConnect, workspaceStats, recentActivities
 *
 * @deprecated 직접 사용하지 마세요. 각 도메인 Store를 직접 사용하세요.
 */
const useDataStore = create((set, get) => ({
  initialized: false,
  loading: false,
  error: null,

  /**
   * Bootstrap 데이터 로드
   * @deprecated 목업 데이터 제거됨. 각 컴포넌트에서 필요한 데이터를 직접 로드하세요.
   */
  async loadInitialData() {
    // 목업 데이터 제거 - 각 컴포넌트에서 실제 API 호출로 데이터 로드
    set({ initialized: true, loading: false });
  },

  /**
   * @deprecated useWorkspaceStore.getState().users 사용
   */
  get users() {
    return useWorkspaceStore.getState().users;
  },

  /**
   * @deprecated useChatStore.getState().getChannelDetails(channelId) 사용
   */
  getChannelDetails(channelId) {
    return useChatStore.getState().getChannelDetails(channelId);
  },

  /**
   * @deprecated useWorkspaceStore.getState().getWorkspaceMembers(workspaceId) 사용
   */
  getWorkspaceMembers(workspaceId) {
    return useWorkspaceStore.getState().getWorkspaceMembers(workspaceId);
  },
}));

export default useDataStore;
