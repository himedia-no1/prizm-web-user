import api from '../axiosInstance';

/**
 * 초대 관련 API 서비스
 */
export const inviteService = {
  /**
   * 워크스페이스 초대 코드 생성
   * POST /api/workspaces/{workspaceId}/invites
   * @param {object} data - {
   *   expiresInSeconds: number,
   *   maxUses: number,
   *   allowedUserId?: number,
   *   allowedUserIds?: number[],
   *   autoJoinGroupIds?: number[],
   *   channelId?: number
   * }
   */
  async createInvite(workspaceId, data) {
    const response = await api.post(`/api/workspaces/${workspaceId}/invites`, data);
    return response.data;
  },

  /**
   * 워크스페이스 초대 목록 조회
   * GET /api/workspaces/{workspaceId}/invites
   */
  async getInvites(workspaceId) {
    const response = await api.get(`/api/workspaces/${workspaceId}/invites`);
    return response.data;
  },

  /**
   * 초대 코드 삭제
   * DELETE /api/workspaces/{workspaceId}/invites/{code}
   */
  async deleteInvite(workspaceId, code) {
    await api.delete(`/api/workspaces/${workspaceId}/invites/${code}`);
  },

  /**
   * 초대 코드로 워크스페이스 정보 조회 (공개)
   * GET /api/invites/{code}
   */
  async getInviteInfo(code) {
    const response = await api.get(`/api/invites/${code}`);
    return response.data;
  },

  /**
   * 초대 코드로 워크스페이스 참여 (공개)
   * POST /api/invites/{code}/join
   */
  async joinByInvite(code) {
    const response = await api.post(`/api/invites/${code}/join`);
    return response.data;
  },
};
