import axiosInstance from '../axiosInstance';
import { mockWorkspaces } from '@/__mocks__';
import { delay } from '../utils';

/**
 * 워크스페이스 관련 API 서비스
 */
export const workspaceService = {
  /**
   * 워크스페이스 목록 조회
   */
  async fetchWorkspaces() {
    // 🔌 백엔드 연결
    // const response = await axiosInstance.get('/api/v1/workspaces');
    // return response.data;
    
    // 📦 Mock 데이터
    console.log('[Mock] workspaceService.fetchWorkspaces');
    await delay(300);
    return Object.values(mockWorkspaces);
  },

  /**
   * 워크스페이스 상세 조회
   * @param {string} workspaceId - 워크스페이스 ID
   */
  async fetchWorkspace(workspaceId) {
    // 🔌 백엔드 연결
    // const response = await axiosInstance.get(`/api/v1/workspaces/${workspaceId}`);
    // return response.data;
    
    // 📦 Mock 데이터
    console.log('[Mock] workspaceService.fetchWorkspace:', workspaceId);
    await delay(300);
    return mockWorkspaces[workspaceId];
  },

  /**
   * 워크스페이스 생성
   * @param {object} data - { name, description }
   */
  async createWorkspace(data) {
    // 🔌 백엔드 연결
    // const response = await axiosInstance.post('/api/v1/workspaces', data);
    // return response.data;
    
    // 📦 Mock 데이터
    console.log('[Mock] workspaceService.createWorkspace:', data);
    await delay(500);
    return {
      id: `ws${Date.now()}`,
      name: data.name,
      description: data.description || '',
      createdAt: new Date().toISOString(),
      members: [],
      channels: [],
    };
  },

  /**
   * 초대 코드로 워크스페이스 참가
   * @param {string} inviteCode - 초대 코드
   */
  async joinByInviteCode(inviteCode) {
    // 🔌 백엔드 연결
    // const response = await axiosInstance.post('/api/v1/workspaces/join', {
    //   inviteCode,
    // });
    // return response.data;
    
    // 📦 Mock 데이터
    console.log('[Mock] workspaceService.joinByInviteCode:', inviteCode);
    await delay(400);
    return {
      workspaceId: 'ws1',
      name: 'Test Workspace',
      role: 'member',
    };
  },

  /**
   * 워크스페이스 업데이트
   * @param {string} workspaceId - 워크스페이스 ID
   * @param {object} data - { name, description }
   */
  async updateWorkspace(workspaceId, data) {
    // 🔌 백엔드 연결
    // const response = await axiosInstance.put(`/api/v1/workspaces/${workspaceId}`, data);
    // return response.data;
    
    // 📦 Mock 데이터
    console.log('[Mock] workspaceService.updateWorkspace:', workspaceId, data);
    await delay(300);
    return {
      id: workspaceId,
      ...data,
      updatedAt: new Date().toISOString(),
    };
  },

  /**
   * 워크스페이스 삭제
   * @param {string} workspaceId - 워크스페이스 ID
   */
  async deleteWorkspace(workspaceId) {
    // 🔌 백엔드 연결
    // await axiosInstance.delete(`/api/v1/workspaces/${workspaceId}`);
    
    // 📦 Mock 데이터
    console.log('[Mock] workspaceService.deleteWorkspace:', workspaceId);
    await delay(300);
  },
};
