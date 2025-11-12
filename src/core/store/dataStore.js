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
   * - 앱 초기화 시 한 번만 호출됩니다
   * - 데이터를 각 도메인 Store에 분산합니다
   */
  async loadInitialData() {
    if (get().initialized || get().loading) {
      return;
    }

    set({ loading: true, error: null });

    try {
      const response = await axiosInstance.get('/mock/bootstrap');
      const data = response.data ?? {};

      // 각 도메인 Store에 데이터 분산
      useWorkspaceStore.getState().setBootstrapData(data);
      useChatStore.getState().setBootstrapData(data);
      useAIStore.getState().setBootstrapData(data);

      set({ initialized: true, loading: false });
    } catch (error) {
      console.error('Failed to load initial data:', error);
      set({ error: error.message, loading: false });
    }
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
