import axiosInstance from '../axiosInstance';
import { mockMessages } from '@/__mocks__';
import { delay } from '../utils';

/**
 * 메시지 관련 API 서비스
 */
export const messageService = {
  /**
   * 채널의 메시지 목록 조회
   * @param {string} channelId - 채널 ID
   * @param {object} options - { limit, before }
   */
  async fetchMessages(channelId, { limit = 50, before } = {}) {
    // 🔌 백엔드 연결
    // const response = await axiosInstance.get(
    //   `/api/v1/channels/${channelId}/messages`,
    //   { params: { limit, before } }
    // );
    // return response.data;
    
    // 📦 Mock 데이터
    console.log('[Mock] messageService.fetchMessages:', channelId);
    await delay(300);
    return mockMessages.filter(m => m.channelId === channelId);
  },

  /**
   * 메시지 전송
   * @param {string} channelId - 채널 ID
   * @param {object} data - { text, attachments, mentions }
   */
  async sendMessage(channelId, data) {
    // 🔌 백엔드 연결
    // const response = await axiosInstance.post(
    //   `/api/v1/channels/${channelId}/messages`,
    //   data
    // );
    // return response.data;
    
    // 📦 Mock 데이터
    console.log('[Mock] messageService.sendMessage:', channelId, data);
    await delay(200);
    return {
      id: `m${Date.now()}`,
      channelId,
      userId: 'u1',
      text: data.text,
      attachments: data.attachments || [],
      mentions: data.mentions || [],
      createdAt: new Date().toISOString(),
      reactions: [],
      threadId: null,
    };
  },

  /**
   * 메시지 수정
   * @param {string} messageId - 메시지 ID
   * @param {object} data - { text }
   */
  async updateMessage(messageId, data) {
    // 🔌 백엔드 연결
    // const response = await axiosInstance.put(
    //   `/api/v1/messages/${messageId}`,
    //   data
    // );
    // return response.data;
    
    // 📦 Mock 데이터
    console.log('[Mock] messageService.updateMessage:', messageId, data);
    await delay(200);
    return {
      id: messageId,
      text: data.text,
      updatedAt: new Date().toISOString(),
    };
  },

  /**
   * 메시지 삭제
   * @param {string} messageId - 메시지 ID
   */
  async deleteMessage(messageId) {
    // 🔌 백엔드 연결
    // await axiosInstance.delete(`/api/v1/messages/${messageId}`);
    
    // 📦 Mock 데이터
    console.log('[Mock] messageService.deleteMessage:', messageId);
    await delay(200);
  },

  /**
   * 메시지 번역
   * @param {string} messageId - 메시지 ID
   * @param {string} targetLang - 목표 언어 (ko, en)
   */
  async translateMessage(messageId, targetLang) {
    // 🔌 백엔드 연결
    // const response = await axiosInstance.post(
    //   `/api/v1/messages/${messageId}/translate`,
    //   { targetLanguage: targetLang }
    // );
    // return response.data;
    
    // 📦 Mock 데이터
    console.log('[Mock] messageService.translateMessage:', messageId, targetLang);
    await delay(500);
    return {
      id: messageId,
      translatedText: targetLang === 'ko' ? '번역된 메시지입니다' : 'This is translated message',
      targetLanguage: targetLang,
    };
  },

  /**
   * 메시지 전달
   * @param {string} messageId - 메시지 ID
   * @param {string[]} channelIds - 대상 채널 ID 배열
   */
  async forwardMessage(messageId, channelIds) {
    // 🔌 백엔드 연결
    // const response = await axiosInstance.post(
    //   `/api/v1/messages/${messageId}/forward`,
    //   { channelIds }
    // );
    // return response.data;
    
    // 📦 Mock 데이터
    console.log('[Mock] messageService.forwardMessage:', messageId, channelIds);
    await delay(300);
    return {
      success: true,
      forwardedCount: channelIds.length,
    };
  },

  /**
   * 이모지 반응 추가
   * @param {string} messageId - 메시지 ID
   * @param {string} emoji - 이모지
   */
  async addReaction(messageId, emoji) {
    // 🔌 백엔드 연결
    // const response = await axiosInstance.post(
    //   `/api/v1/messages/${messageId}/reactions`,
    //   { emoji }
    // );
    // return response.data;
    
    // 📦 Mock 데이터
    console.log('[Mock] messageService.addReaction:', messageId, emoji);
    await delay(150);
    return {
      messageId,
      emoji,
      userId: 'u1',
      count: 1,
    };
  },

  /**
   * 이모지 반응 제거
   * @param {string} messageId - 메시지 ID
   * @param {string} emoji - 이모지
   */
  async removeReaction(messageId, emoji) {
    // 🔌 백엔드 연결
    // await axiosInstance.delete(
    //   `/api/v1/messages/${messageId}/reactions/${emoji}`
    // );
    
    // 📦 Mock 데이터
    console.log('[Mock] messageService.removeReaction:', messageId, emoji);
    await delay(150);
  },
};
