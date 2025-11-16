import axiosInstance from '../axiosInstance';

/**
 * 사용자 관련 API 서비스
 */
export const userService = {
  /**
   * 사용자 목록 조회
   * @param {string} workspaceId - 워크스페이스 ID
   */
  async fetchUsers() {
    const response = await axiosInstance.get('/mock/users');
    return response.data;
  },

  /**
   * 사용자 프로필 조회
   * @param {string} userId - 사용자 ID
   */
  async fetchUser(userId) {
    const response = await axiosInstance.get(`/mock/users/${userId}`);
    return response.data;
  },

  /**
   * 사용자 프로필 업데이트
   * @param {string} userId - 사용자 ID
   * @param {object} data - { name, email, avatar, bio }
   */
  async updateUser(userId, data) {
    const response = await axiosInstance.put(`/mock/users/${userId}`, data);
    return response.data;
  },

  /**
   * 계정 비활성화
   * @param {string} userId - 사용자 ID
   */
  async deactivateAccount(userId) {
    const response = await axiosInstance.post(`/mock/users/${userId}/deactivate`);
    return response.data;
  },

  async deleteAccount(userId, confirmText) {
    const response = await axiosInstance.delete(`/mock/users/${userId}`, {
      data: { confirmText },
    });
    return response.data;
  },

  /**
   * 워크스페이스 프로필 조회
   * @param {string} workspaceId - 워크스페이스 ID
   * @param {string} userId - 사용자 ID
   */
  async fetchWorkspaceProfile(workspaceId, userId) {
    const response = await axiosInstance.get(
      `/mock/workspaces/${workspaceId}/users/${userId}/profile`,
    );
    return response.data;
  },

  /**
   * 워크스페이스 프로필 업데이트
   * @param {string} workspaceId - 워크스페이스 ID
   * @param {string} userId - 사용자 ID
   * @param {object} profile - { displayName, statusMessage, avatar }
   */
  async updateWorkspaceProfile(workspaceId, userId, profile) {
    const response = await axiosInstance.put(
      `/mock/workspaces/${workspaceId}/users/${userId}/profile`,
      profile,
    );
    return response.data;
  },
};
