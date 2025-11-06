import axiosInstance from '../axiosInstance';
import { mockNotifications } from '@/__mocks__';
import { delay } from '../utils';

/**
 * 알림 관련 API 서비스
 */
export const notificationService = {
  /**
   * 알림 목록 조회
   */
  async fetchNotifications() {
    // 🔌 백엔드 연결
    // const response = await axiosInstance.get('/api/v1/notifications');
    // return response.data;
    
    // 📦 Mock 데이터
    console.log('[Mock] notificationService.fetchNotifications');
    await delay(300);
    return mockNotifications;
  },

  /**
   * 알림 읽음 처리
   * @param {string} notificationId - 알림 ID
   */
  async markAsRead(notificationId) {
    // 🔌 백엔드 연결
    // await axiosInstance.put(`/api/v1/notifications/${notificationId}/read`);
    
    // 📦 Mock 데이터
    console.log('[Mock] notificationService.markAsRead:', notificationId);
    await delay(100);
    return { success: true };
  },

  /**
   * 알림 삭제
   * @param {string} notificationId - 알림 ID
   */
  async deleteNotification(notificationId) {
    // 🔌 백엔드 연결
    // await axiosInstance.delete(`/api/v1/notifications/${notificationId}`);
    
    // 📦 Mock 데이터
    console.log('[Mock] notificationService.deleteNotification:', notificationId);
    await delay(100);
    return { success: true };
  },

  /**
   * 모든 알림 읽음 처리
   */
  async markAllAsRead() {
    // 🔌 백엔드 연결
    // await axiosInstance.put('/api/v1/notifications/read-all');
    
    // 📦 Mock 데이터
    console.log('[Mock] notificationService.markAllAsRead');
    await delay(200);
    return { success: true };
  },
};
