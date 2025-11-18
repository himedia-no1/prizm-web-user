import axiosInstance from '../axiosInstance';

/**
 * 인증 관련 API 서비스
 */
export const authService = {
  /**
   * 토큰 갱신
   * POST /api/auth/refresh
   */
  async refreshToken() {
    const response = await axiosInstance.post('/api/auth/refresh');
    return response.data;
  },

  /**
   * 로그아웃
   * POST /api/auth/logout
   */
  async logout() {
    await axiosInstance.post('/api/auth/logout');
  },

  /**
   * 회원 탈퇴
   * DELETE /api/auth/withdraw
   */
  async withdraw() {
    await axiosInstance.delete('/api/auth/withdraw');
  },
};
