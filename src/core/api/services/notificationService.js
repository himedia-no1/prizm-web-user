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

  /**
   * 알림 읽음 처리
   * PATCH /api/notifications
   * @param {number[]} notificationIds - 알림 ID 배열
   */
  async markAsRead(notificationIds) {
    await axiosInstance.patch('/api/notifications', notificationIds);
  },

  /**
   * 알림 삭제
   * DELETE /api/notifications
   * @param {number[]} notificationIds - 알림 ID 배열
   */
  async deleteNotifications(notificationIds) {
    await axiosInstance.delete('/api/notifications', { data: notificationIds });
  },
};
