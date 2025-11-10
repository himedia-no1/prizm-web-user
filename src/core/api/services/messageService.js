import axiosInstance from '../axiosInstance';

/**
 * 메시지 관련 API 서비스
 */
export const messageService = {
  /**
   * 채널의 메시지 목록 조회
   * @param {string} channelId - 채널 ID
   * @param {object} options - { limit, before }
   */
  async fetchMessages(channelId) {
    const response = await axiosInstance.get('/mock/messages', {
      params: { channelId },
    });
    return response.data;
  },

  /**
   * 메시지 전송
   * @param {string} channelId - 채널 ID
   * @param {object} data - { text, attachments, mentions }
   */
  async sendMessage(channelId, data) {
    const response = await axiosInstance.post('/mock/messages', {
      channelId,
      ...data,
    });
    return response.data;
  },

  /**
   * 메시지 수정
   * @param {string} messageId - 메시지 ID
   * @param {object} data - { text }
   */
  async updateMessage(messageId, data) {
    const response = await axiosInstance.put(`/mock/messages/${messageId}`, data);
    return response.data;
  },

  /**
   * 메시지 삭제
   * @param {string} messageId - 메시지 ID
   */
  async deleteMessage(messageId) {
    await axiosInstance.delete(`/mock/messages/${messageId}`);
  },

  /**
   * 메시지 번역
   * @param {string} messageId - 메시지 ID
   * @param {string} targetLang - 목표 언어 (ko, en)
   */
  async translateMessage(messageId, targetLang) {
    const response = await axiosInstance.post('/mock/messages/translate', {
      messageId,
      targetLanguage: targetLang,
    });
    return response.data;
  },

  /**
   * 메시지 전달
   * @param {string} messageId - 메시지 ID
   * @param {string[]} channelIds - 대상 채널 ID 배열
   */
  async forwardMessage(messageId, channelIds) {
    const response = await axiosInstance.post('/mock/messages/forward', {
      messageId,
      channelIds,
    });
    return response.data;
  },

  /**
   * 이모지 반응 추가
   * @param {string} messageId - 메시지 ID
   * @param {string} emoji - 이모지
   */
  async addReaction(messageId, emoji) {
    const response = await axiosInstance.post(`/mock/messages/${messageId}/reactions`, {
      emoji,
    });
    return response.data;
  },

  /**
   * 이모지 반응 제거
   * @param {string} messageId - 메시지 ID
   * @param {string} emoji - 이모지
   */
  async removeReaction(messageId, emoji) {
    await axiosInstance.delete(`/mock/messages/${messageId}/reactions`, {
      data: { emoji },
    });
  },
};
