import axiosInstance from '../axiosInstance';

/**
 * 알림 관련 API 서비스
 */
export const notificationService = {
  /**
   * 알림 목록 조회
   */
  async fetchNotifications() {
    const response = await axiosInstance.get('/mock/notifications');
    return response.data;
  },

  /**
   * 알림 읽음 처리
   * @param {string} notificationId - 알림 ID
   */
  async markAsRead(notificationId) {
    const response = await axiosInstance.put('/mock/notifications', { notificationId });
    return response.data;
  },

  /**
   * 알림 삭제
   * @param {string} notificationId - 알림 ID
   */
  async deleteNotification(notificationId) {
    const response = await axiosInstance.delete('/mock/notifications', {
      params: { notificationId },
    });
    return response.data;
  },

  /**
   * 모든 알림 읽음 처리
   */
  async markAllAsRead() {
    const response = await axiosInstance.put('/mock/notifications/read-all');
    return response.data;
  },
};
