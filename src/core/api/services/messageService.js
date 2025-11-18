/**
 * 메시지 관련 API 서비스
 * TODO: WebSocket 및 메시지 API 구현 대기
 */
export const messageService = {
  /**
   * 채널의 메시지 목록 조회
   * TODO: API 구현 대기
   */
  async fetchMessages(channelId) {
    return [];
  },

  /**
   * 메시지 전송
   * TODO: WebSocket 구현 대기
   */
  async sendMessage(channelId, data) {
    return null;
  },

  /**
   * 메시지 수정
   * TODO: API 구현 대기
   */
  async updateMessage(messageId, data) {
    return null;
  },

  /**
   * 메시지 삭제
   * TODO: API 구현 대기
   */
  async deleteMessage(messageId) {
    return null;
  },

  /**
   * 메시지 번역
   * TODO: API 구현 대기
   */
  async translateMessage(messageId, targetLang) {
    return null;
  },

  /**
   * 메시지 전달
   * TODO: API 구현 대기
   */
  async forwardMessage(messageId, channelIds) {
    return null;
  },

  /**
   * 이모지 반응 추가
   * TODO: API 구현 대기
   */
  async addReaction(messageId, emoji) {
    return null;
  },

  /**
   * 이모지 반응 제거
   * TODO: API 구현 대기
   */
  async removeReaction(messageId, emoji) {
    return null;
  },

  /**
   * 파일 업로드
   * TODO: API 구현 대기
   */
  async uploadFile(file, messageId, userId) {
    return null;
  },

  /**
   * 메시지의 파일 목록 조회
   * TODO: API 구현 대기
   */
  async getMessageFiles(messageId) {
    return [];
  },

  /**
   * 파일 삭제
   * TODO: API 구현 대기
   */
  async deleteFile(fileId) {
    return null;
  },

  /**
   * 파일 정보 조회
   * TODO: API 구현 대기
   */
  async getFileInfo(fileId) {
    return null;
  },

  /**
   * 메시지 고정
   * TODO: API 구현 대기
   */
  async pinMessage(messageId) {
    return { success: true };
  },

  /**
   * 메시지 고정 해제
   * TODO: API 구현 대기
   */
  async unpinMessage(messageId) {
    return { success: true };
  },
};
