import axiosInstance from '../axiosInstance';

/**
 * 사용자 관련 API 서비스
 */
export const userService = {
  /**
   * 현재 사용자 프로필 조회
   * GET /api/users/profile
   */
  async getProfile() {
    const response = await axiosInstance.get('/api/users/profile');
    return response.data;
  },

  /**
   * 사용자 프로필 수정
   * PATCH /api/users/profile
   * @param {object} data - { profileImage: File, name: string }
   */
  async updateProfile(data) {
    const formData = new FormData();
    if (data.profileImage) {
      formData.append('profileImage', data.profileImage);
    }
    if (data.name) {
      formData.append('name', data.name);
    }
    const response = await axiosInstance.patch('/api/users/profile', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  /**
   * 사용자 언어 설정 변경
   * PATCH /api/users/language
   * @param {string} language - KO | EN | JA | FR
   */
  async updateLanguage(language) {
    const response = await axiosInstance.patch('/api/users/language', { language });
    return response.data;
  },

  /**
   * 사용자 마지막 방문 경로 저장
   * POST /api/users/last-path
   * @param {string} path - 경로
   */
  async saveLastPath(path) {
    await axiosInstance.post('/api/users/last-path', { path });
  },

  /**
   * 사용자 마지막 방문 경로 조회
   * GET /api/users/last-path
   */
  async getLastPath() {
    const response = await axiosInstance.get('/api/users/last-path');
    return response.data;
  },
};
