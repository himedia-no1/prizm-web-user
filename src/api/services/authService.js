import axiosInstance from '../axiosInstance';
import { mockUsers } from '@/__mocks__';
import { delay } from '../utils';

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
    // 🔌 백엔드 연결 (준비시 주석 해제)
    // const response = await axiosInstance.post('/api/v1/auth/oauth', {
    //   provider,
    //   code,
    // });
    // return response.data;
    
    // 📦 Mock 데이터 (백엔드 연결시 삭제)
    console.log('[Mock] authService.login:', provider, code);
    await delay(500);
    return {
      accessToken: `mock-access-${provider}-${Date.now()}`,
      refreshToken: `mock-refresh-${Date.now()}`,
      userId: 'u1',
      workspaceId: 'ws1',
    };
  },

  /**
   * 사용자 프로필 조회
   */
  async getProfile() {
    // 🔌 백엔드 연결
    // const response = await axiosInstance.get('/api/v1/auth/me');
    // return response.data;
    
    // 📦 Mock 데이터
    console.log('[Mock] authService.getProfile');
    await delay(300);
    return mockUsers['u1'];
  },

  /**
   * 토큰 갱신
   * @param {string} refreshToken - 갱신 토큰
   */
  async refreshToken(refreshToken) {
    // 🔌 백엔드 연결
    // const response = await axiosInstance.post('/api/v1/auth/refresh', {
    //   refreshToken,
    // });
    // return response.data;
    
    // 📦 Mock 데이터
    console.log('[Mock] authService.refreshToken');
    await delay(200);
    return {
      accessToken: `mock-access-refresh-${Date.now()}`,
      refreshToken: `mock-refresh-${Date.now()}`,
    };
  },

  /**
   * 로그아웃
   */
  async logout() {
    // 🔌 백엔드 연결
    // await axiosInstance.post('/api/v1/auth/logout');
    
    // 📦 Mock 데이터
    console.log('[Mock] authService.logout');
    await delay(200);
  },
};
