import axiosInstance from '../axiosInstance';

/**
 * 워크스페이스 관련 API 서비스
 */
export const workspaceService = {
  /**
   * 내 워크스페이스 목록 조회
   */
  async getMyWorkspaces() {
    const response = await axiosInstance.get('/mock/workspaces/my');
    return response.data;
  },

  async getAccessibleWorkspaces() {
    const response = await axiosInstance.get('/mock/workspaces/access');
    return response.data;
  },

  /**
   * 워크스페이스 목록 조회
   */
  async fetchWorkspaces() {
    const response = await axiosInstance.get('/mock/workspaces');
    return response.data;
  },

  /**
   * 워크스페이스 상세 조회
   * @param {string} workspaceId - 워크스페이스 ID
   */
  async fetchWorkspace(workspaceId) {
    const response = await axiosInstance.get(`/mock/workspaces/${workspaceId}`);
    return response.data;
  },

  async fetchSettings(workspaceId) {
    const response = await axiosInstance.get(`/mock/workspaces/${workspaceId}/settings`);
    return response.data;
  },

  /**
   * 워크스페이스 생성
   * @param {object} data - { name, description }
   */
  async createWorkspace(data) {
    const response = await axiosInstance.post('/mock/workspaces', data);
    return response.data;
  },

  /**
   * 초대 코드로 워크스페이스 참가
   * @param {string} inviteCode - 초대 코드
   */
  async joinByInviteCode(inviteCode) {
    const response = await axiosInstance.post('/mock/workspaces/join', { inviteCode });
    return response.data;
  },

  /**
   * 워크스페이스 업데이트
   * @param {string} workspaceId - 워크스페이스 ID
   * @param {object} data - { name, description }
   */
  async updateWorkspace(workspaceId, data) {
    const response = await axiosInstance.put(`/mock/workspaces/${workspaceId}`, data);
    return response.data;
  },

  /**
   * 워크스페이스 삭제
   * @param {string} workspaceId - 워크스페이스 ID
   */
  async deleteWorkspace(workspaceId) {
    await axiosInstance.delete(`/mock/workspaces/${workspaceId}`);
  },
};
