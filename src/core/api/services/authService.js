import axiosInstance from '../axiosInstance';

/**
 * 인증 관련 API 서비스
 */
export const authService = {
  /**
   * 소셜 로그인 (OAuth)
   * @param {string} provider - 'Google' | 'GitHub' | 'Kakao'
   * @param {string} code - OAuth 인증 코드
   */
  async login(provider, code) {
    const response = await axiosInstance.post('/mock/auth/login', {
      provider,
      code,
    });
    return response.data;
  },

  /**
   * 사용자 프로필 조회
   */
  async getProfile() {
    const response = await axiosInstance.post('/mock/auth/refresh');
    return response.data?.user ?? null;
  },

  /**
   * 토큰 갱신
   * @param {string} refreshToken - 갱신 토큰
   */
  async refreshToken() {
    const response = await axiosInstance.post('/mock/auth/refresh');
    return response.data;
  },

  /**
   * 로그아웃
   */
  async logout() {
    await axiosInstance.post('/mock/auth/logout');
  },
};
