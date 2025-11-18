import axiosInstance from '../axiosInstance';

/**
 * 알림 관련 API 서비스
 */
export const notificationService = {
  /**
   * 사용자 알림 목록 조회
   * GET /api/notifications
   */
  async getNotifications() {
    const response = await axiosInstance.get('/api/notifications');
    return response.data;
  },
};
