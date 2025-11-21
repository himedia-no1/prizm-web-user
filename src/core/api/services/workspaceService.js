import axiosInstance from '../axiosInstance';

/**
 * 워크스페이스 관련 API 서비스
 */
export const workspaceService = {
  /**
   * 사용자가 속한 모든 워크스페이스 조회
   * GET /api/workspaces
   */
  async getWorkspaces() {
    const response = await axiosInstance.get('/api/workspaces');
    return response.data;
  },

  /**
   * 워크스페이스 생성
   * POST /api/workspaces
   * @param {object} data - { name: string, imageId?: number }
   */
  async createWorkspace(data) {
    const response = await axiosInstance.post('/api/workspaces', data);
    return response.data;
  },

  /**
   * 워크스페이스 상세 조회
   * GET /api/workspaces/{workspaceId}
   */
  async getWorkspace(workspaceId) {
    const response = await axiosInstance.get(`/api/workspaces/${workspaceId}`);
    return response.data;
  },

  /**
   * 워크스페이스 수정
   * PATCH /api/workspaces/{workspaceId}
   * @param {number} workspaceId
   * @param {object} data - { image?: File, name?: string }
   */
  async updateWorkspace(workspaceId, data) {
    const formData = new FormData();
    if (data.image) {
      formData.append('image', data.image);
    }
    if (data.name) {
      formData.append('name', data.name);
    }
    const response = await axiosInstance.patch(`/api/workspaces/${workspaceId}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  /**
   * 워크스페이스 삭제
   * DELETE /api/workspaces/{workspaceId}
   */
  async deleteWorkspace(workspaceId) {
    await axiosInstance.delete(`/api/workspaces/${workspaceId}`);
  },

  /**
   * 워크스페이스 멤버 목록 조회
   * GET /api/workspaces/{workspaceId}/users
   * @param {number} workspaceId
   * @param {string} role - OWNER | MANAGER | MEMBER | GUEST (optional)
   */
  async getWorkspaceUsers(workspaceId, role = null) {
    const params = role ? { role } : {};
    const response = await axiosInstance.get(`/api/workspaces/${workspaceId}/users`, { params });
    return response.data;
  },

  /**
   * 현재 사용자의 워크스페이스 프로필 조회
   * GET /api/workspaces/{workspaceId}/profile
   */
  async getMyProfile(workspaceId) {
    const response = await axiosInstance.get(`/api/workspaces/${workspaceId}/profile`);
    return response.data;
  },

  /**
   * 다른 사용자의 워크스페이스 프로필 조회
   * GET /api/workspaces/{workspaceId}/users/{targetUserId}/profile
   */
  async getUserProfile(workspaceId, targetUserId) {
    const response = await axiosInstance.get(`/api/workspaces/${workspaceId}/users/${targetUserId}/profile`);
    return response.data;
  },

  /**
   * 워크스페이스 프로필 수정
   * PATCH /api/workspaces/{workspaceId}/profile
   * @param {number} workspaceId
   * @param {object} data - { image?: File, name?: string, phone?: string, introduction?: string }
   */
  async updateMyProfile(workspaceId, data) {
    const formData = new FormData();
    if (data.image) {
      formData.append('image', data.image);
    }
    if (data.name) {
      formData.append('name', data.name);
    }
    if (data.phone) {
      formData.append('phone', data.phone);
    }
    if (data.introduction) {
      formData.append('introduction', data.introduction);
    }
    await axiosInstance.patch(`/api/workspaces/${workspaceId}/profile`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },

  /**
   * 알림 설정 변경
   * PATCH /api/workspaces/{workspaceId}/notify
   * @param {number} workspaceId
   * @param {string} notifyType - ON | MENTION | OFF
   */
  async updateNotify(workspaceId, notifyType) {
    await axiosInstance.patch(`/api/workspaces/${workspaceId}/notify`, { notifyType });
  },

  /**
   * 상태 메시지 변경
   * PATCH /api/workspaces/{workspaceId}/state
   * @param {number} workspaceId
   * @param {string} state - ONLINE | AWAY | BUSY | OFFLINE
   */
  async updateState(workspaceId, state) {
    await axiosInstance.patch(`/api/workspaces/${workspaceId}/state`, { state });
  },

  /**
   * 사용자 역할 변경
   * PATCH /api/workspaces/{workspaceId}/users/{targetUserId}/role
   * @param {number} workspaceId
   * @param {number} targetUserId
   * @param {string} role - OWNER | MANAGER | MEMBER | GUEST
   */
  async updateUserRole(workspaceId, targetUserId, role) {
    await axiosInstance.patch(`/api/workspaces/${workspaceId}/users/${targetUserId}/role`, { role });
  },

  /**
   * 워크스페이스에서 사용자 추방
   * DELETE /api/workspaces/{workspaceId}/users/{targetUserId}
   */
  async removeUser(workspaceId, targetUserId) {
    await axiosInstance.delete(`/api/workspaces/${workspaceId}/users/${targetUserId}`);
  },

  /**
   * 사용자 차단
   * POST /api/workspaces/{workspaceId}/users/{targetUserId}/ban
   */
  async banUser(workspaceId, targetUserId) {
    await axiosInstance.post(`/api/workspaces/${workspaceId}/users/${targetUserId}/ban`);
  },

  /**
   * 사용자 차단 해제
   * DELETE /api/workspaces/{workspaceId}/users/{targetUserId}/ban
   */
  async unbanUser(workspaceId, targetUserId) {
    await axiosInstance.delete(`/api/workspaces/${workspaceId}/users/${targetUserId}/ban`);
  },

  /**
   * 워크스페이스 나가기
   * DELETE /api/workspaces/{workspaceId}/leave
   */
  async leaveWorkspace(workspaceId) {
    await axiosInstance.delete(`/api/workspaces/${workspaceId}/leave`);
  },

  /**
   * 워크스페이스 설정 데이터 조회 (집계)
   * 여러 API를 호출하여 설정 페이지에 필요한 데이터 수집
   */
  async fetchSettings(workspaceId) {
    try {
      console.log('🔍 Fetching workspace settings:', workspaceId);
      
      // Promise.allSettled로 변경하여 일부 실패해도 계속 진행
      const results = await Promise.allSettled([
        this.getWorkspace(workspaceId),
        this.getWorkspaceUsers(workspaceId),
        import('./groupService').then(({ groupService }) => groupService.getGroups(workspaceId)),
        import('./inviteService').then(({ inviteService }) => inviteService.getInvites(workspaceId)),
      ]);

      console.log('📊 Settings fetch results:', results.map((r, i) => ({
        index: i,
        status: r.status,
        hasValue: r.status === 'fulfilled'
      })));

      // 성공한 결과만 추출
      const [workspaceResult, usersResult, groupsResult, invitesResult] = results;

      return {
        workspace: workspaceResult.status === 'fulfilled' ? workspaceResult.value : null,
        users: usersResult.status === 'fulfilled' ? usersResult.value : [],
        groups: groupsResult.status === 'fulfilled' ? (groupsResult.value || []) : [],
        invites: invitesResult.status === 'fulfilled' ? (invitesResult.value || []) : [],
        // 실패한 API들 기록
        errors: {
          workspace: workspaceResult.status === 'rejected' ? workspaceResult.reason?.message : null,
          users: usersResult.status === 'rejected' ? usersResult.reason?.message : null,
          groups: groupsResult.status === 'rejected' ? groupsResult.reason?.message : null,
          invites: invitesResult.status === 'rejected' ? invitesResult.reason?.message : null,
        }
      };
    } catch (error) {
      console.error('Failed to fetch workspace settings:', error);
      throw error;
    }
  },
};
