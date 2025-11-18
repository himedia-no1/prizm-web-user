import api from '../axiosInstance';

/**
 * 그룹 관련 API 서비스
 */
export const groupService = {
  /**
   * 그룹 생성
   * POST /api/workspaces/{workspaceId}/groups
   * @param {object} data - { name: string }
   */
  async createGroup(workspaceId, data) {
    const response = await api.post(`/api/workspaces/${workspaceId}/groups`, data);
    return response.data;
  },

  /**
   * 그룹 목록 조회
   * GET /api/workspaces/{workspaceId}/groups
   */
  async getGroups(workspaceId) {
    const response = await api.get(`/api/workspaces/${workspaceId}/groups`);
    return response.data;
  },

  /**
   * 그룹 상세 조회
   * GET /api/workspaces/{workspaceId}/groups/{groupId}
   */
  async getGroup(workspaceId, groupId) {
    const response = await api.get(`/api/workspaces/${workspaceId}/groups/${groupId}`);
    return response.data;
  },

  /**
   * 그룹 수정
   * PATCH /api/workspaces/{workspaceId}/groups/{groupId}
   * @param {object} data - {
   *   name?: string,
   *   userIds?: number[],
   *   channels?: Array<{ channelId: number, permission: 'READ'|'WRITE'|'MANAGE' }>
   * }
   */
  async updateGroup(workspaceId, groupId, data) {
    const response = await api.patch(`/api/workspaces/${workspaceId}/groups/${groupId}`, data);
    return response.data;
  },

  /**
   * 그룹 삭제
   * DELETE /api/workspaces/{workspaceId}/groups/{groupId}
   */
  async deleteGroup(workspaceId, groupId) {
    await api.delete(`/api/workspaces/${workspaceId}/groups/${groupId}`);
  },
};
