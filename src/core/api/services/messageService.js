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

  /**
   * 파일 업로드 (ERD: message_files)
   * @param {File} file - 업로드할 파일
   * @param {string} messageId - 메시지 ID
   * @param {string} userId - 업로드 사용자 ID
   */
  async uploadFile(file, messageId, userId) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('messageId', messageId);
    formData.append('userId', userId);

    const response = await axiosInstance.post('/mock/messages/files', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  /**
   * 메시지의 파일 목록 조회
   * @param {string} messageId - 메시지 ID
   */
  async getMessageFiles(messageId) {
    const response = await axiosInstance.get('/mock/messages/files', {
      params: { messageId },
    });
    return response.data;
  },

  /**
   * 파일 삭제
   * @param {string} fileId - 파일 ID
   */
  async deleteFile(fileId) {
    const response = await axiosInstance.delete(`/mock/messages/files/${fileId}`);
    return response.data;
  },

  /**
   * 파일 정보 조회
   * @param {string} fileId - 파일 ID
   */
  async getFileInfo(fileId) {
    const response = await axiosInstance.get(`/mock/messages/files/${fileId}`);
    return response.data;
  },

  /**
   * 메시지 고정
   * @param {string|number} messageId - 메시지 ID
   */
  async pinMessage(messageId) {
    const response = await axiosInstance.post(`/mock/messages/${messageId}/pin`);
    return response.data;
  },

  /**
   * 메시지 고정 해제
   * @param {string|number} messageId - 메시지 ID
   */
  async unpinMessage(messageId) {
    const response = await axiosInstance.delete(`/mock/messages/${messageId}/pin`);
    return response.data;
  },
};
