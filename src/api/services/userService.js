import axiosInstance from '../axiosInstance';
import { mockUsers } from '@/__mocks__';
import { delay } from '../utils';

/**
 * 사용자 관련 API 서비스
 */
export const userService = {
  /**
   * 사용자 목록 조회
   * @param {string} workspaceId - 워크스페이스 ID
   */
  async fetchUsers(workspaceId) {
    // 🔌 백엔드 연결
    // const response = await axiosInstance.get(`/api/v1/workspaces/${workspaceId}/users`);
    // return response.data;
    
    // 📦 Mock 데이터
    console.log('[Mock] userService.fetchUsers:', workspaceId);
    await delay(300);
    return Object.values(mockUsers);
  },

  /**
   * 사용자 프로필 조회
   * @param {string} userId - 사용자 ID
   */
  async fetchUser(userId) {
    // 🔌 백엔드 연결
    // const response = await axiosInstance.get(`/api/v1/users/${userId}`);
    // return response.data;
    
    // 📦 Mock 데이터
    console.log('[Mock] userService.fetchUser:', userId);
    await delay(200);
    return mockUsers[userId];
  },

  /**
   * 사용자 프로필 업데이트
   * @param {string} userId - 사용자 ID
   * @param {object} data - { name, email, avatar, bio }
   */
  async updateUser(userId, data) {
    // 🔌 백엔드 연결
    // const response = await axiosInstance.put(`/api/v1/users/${userId}`, data);
    // return response.data;
    
    // 📦 Mock 데이터
    console.log('[Mock] userService.updateUser:', userId, data);
    await delay(300);
    return {
      id: userId,
      ...data,
      updatedAt: new Date().toISOString(),
    };
  },

  /**
   * 계정 비활성화
   * @param {string} userId - 사용자 ID
   */
  async deactivateAccount(userId) {
    // 🔌 백엔드 연결
    // await axiosInstance.post(`/api/v1/users/${userId}/deactivate`);
    
    // 📦 Mock 데이터
    console.log('[Mock] userService.deactivateAccount:', userId);
    await delay(400);
    return { success: true };
  },

  /**
   * 워크스페이스 프로필 조회
   * @param {string} workspaceId - 워크스페이스 ID
   * @param {string} userId - 사용자 ID
   */
  async fetchWorkspaceProfile(workspaceId, userId) {
    // 🔌 백엔드 연결
    // const response = await axiosInstance.get(
    //   `/api/v1/workspaces/${workspaceId}/users/${userId}/profile`
    // );
    // return response.data;
    
    // 📦 Mock 데이터
    console.log('[Mock] userService.fetchWorkspaceProfile:', workspaceId, userId);
    await delay(300);
    return {
      displayName: 'John Doe',
      statusMessage: 'Working on a new feature',
      avatar: '/avatars/default.png',
    };
  },

  /**
   * 워크스페이스 프로필 업데이트
   * @param {string} workspaceId - 워크스페이스 ID
   * @param {string} userId - 사용자 ID
   * @param {object} profile - { displayName, statusMessage, avatar }
   */
  async updateWorkspaceProfile(workspaceId, userId, profile) {
    // 🔌 백엔드 연결
    // const response = await axiosInstance.put(
    //   `/api/v1/workspaces/${workspaceId}/users/${userId}/profile`,
    //   profile
    // );
    // return response.data;
    
    // 📦 Mock 데이터
    console.log('[Mock] userService.updateWorkspaceProfile:', workspaceId, userId, profile);
    await delay(300);
    return {
      ...profile,
      updatedAt: new Date().toISOString(),
    };
  },
};
