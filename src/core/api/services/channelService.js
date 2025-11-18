import api from '../axiosInstance';

/**
 * 카테고리 & 채널 관련 API 서비스
 */
export const channelService = {
  // ========== 카테고리 ==========
  /**
   * 카테고리 생성
   * POST /api/workspaces/{workspaceId}/categories
   */
  async createCategory(workspaceId, data) {
    const response = await api.post(`/api/workspaces/${workspaceId}/categories`, data);
    return response.data;
  },

  /**
   * 카테고리 수정
   * PATCH /api/workspaces/{workspaceId}/categories/{categoryId}
   */
  async updateCategory(workspaceId, categoryId, data) {
    const response = await api.patch(`/api/workspaces/${workspaceId}/categories/${categoryId}`, data);
    return response.data;
  },

  /**
   * 카테고리 위치 변경
   * PATCH /api/workspaces/{workspaceId}/categories/{categoryId}/z-index
   * @param {object} data - { position: 'before'|'after'|'first'|'last', beforeId?: number, afterId?: number }
   */
  async updateCategoryPosition(workspaceId, categoryId, data) {
    await api.patch(`/api/workspaces/${workspaceId}/categories/${categoryId}/z-index`, data);
  },

  /**
   * 카테고리 삭제
   * DELETE /api/workspaces/{workspaceId}/categories/{categoryId}
   */
  async deleteCategory(workspaceId, categoryId) {
    await api.delete(`/api/workspaces/${workspaceId}/categories/${categoryId}`);
  },

  // ========== 채널 ==========
  /**
   * 채널 생성
   * POST /api/workspaces/{workspaceId}/categories/{categoryId}/channels
   * @param {object} data - { name: string, description?: string, type: 'CHAT'|'DM'|'WEBHOOK'|'ASSISTANT' }
   */
  async createChannel(workspaceId, categoryId, data) {
    const response = await api.post(`/api/workspaces/${workspaceId}/categories/${categoryId}/channels`, data);
    return response.data;
  },

  /**
   * 워크스페이스 내 접근 가능한 모든 채널 조회
   * GET /api/workspaces/{workspaceId}/channels/accessible
   */
  async getAccessibleChannels(workspaceId) {
    const response = await api.get(`/api/workspaces/${workspaceId}/channels/accessible`);
    return response.data;
  },

  /**
   * 채널 정보 조회
   * GET /api/workspaces/{workspaceId}/channels/{channelId}
   */
  async getChannel(workspaceId, channelId) {
    const response = await api.get(`/api/workspaces/${workspaceId}/channels/${channelId}`);
    return response.data;
  },

  /**
   * 채널 수정
   * PATCH /api/workspaces/{workspaceId}/channels/{channelId}
   * @param {object} data - { name?: string, description?: string }
   */
  async updateChannel(workspaceId, channelId, data) {
    const response = await api.patch(`/api/workspaces/${workspaceId}/channels/${channelId}`, data);
    return response.data;
  },

  /**
   * 채널 위치 변경
   * PATCH /api/workspaces/{workspaceId}/channels/{channelId}/z-index
   * @param {object} data - { position: 'before'|'after'|'first'|'last', beforeId?: number, afterId?: number }
   */
  async updateChannelPosition(workspaceId, channelId, data) {
    await api.patch(`/api/workspaces/${workspaceId}/channels/${channelId}/z-index`, data);
  },

  /**
   * 채널 알림 설정 변경
   * PATCH /api/workspaces/{workspaceId}/channels/{channelId}/notify
   * @param {string} notifyType - ON | MENTION | OFF
   */
  async updateChannelNotify(workspaceId, channelId, notifyType) {
    await api.patch(`/api/workspaces/${workspaceId}/channels/${channelId}/notify`, { notifyType });
  },

  /**
   * 채널 삭제
   * DELETE /api/workspaces/{workspaceId}/channels/{channelId}
   */
  async deleteChannel(workspaceId, channelId) {
    await api.delete(`/api/workspaces/${workspaceId}/channels/${channelId}`);
  },

  /**
   * 채널 내 사용자 목록 조회
   * GET /api/workspaces/{workspaceId}/channels/{channelId}/users
   */
  async getChannelUsers(workspaceId, channelId) {
    const response = await api.get(`/api/workspaces/${workspaceId}/channels/${channelId}/users`);
    return response.data;
  },
};
