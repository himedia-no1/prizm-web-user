import axiosInstance from '../axiosInstance';
import chatWebSocketService from '@/core/websocket/chatWebSocketService';

/**
 * 메시지 관련 API 서비스
 */
export const messageService = {
  /**
   * 채널의 메시지 목록 조회
   * GET /api/messages?channelId={channelId}&limit={limit}
   */
  async fetchMessages(channelId, limit = 50) {
    try {
      const response = await axiosInstance.get('/api/messages', {
        params: { channelId, limit }
      });
      return response.data;
    } catch (error) {
      console.error('Failed to fetch messages:', error);
      return [];
    }
  },

  /**
   * 메시지 전송 (WebSocket)
   * WebSocket: /app/chat.send
   * @param {number} channelId - 채널 ID
   * @param {object} data - {
   *   workspaceUserId: number,
   *   contentType: string,
   *   content: string
   * }
   * @returns {boolean} 전송 성공 여부
   */
  sendMessage(channelId, data) {
    if (!chatWebSocketService.isConnected()) {
      console.error('WebSocket is not connected');
      return false;
    }

    return chatWebSocketService.sendMessage({
      channelId,
      ...data,
    });
  },

  /**
   * 메시지 수정
   * TODO: API 구현 대기 (백엔드 API 명세에 없음)
   */
  async updateMessage(messageId, data) {
    // TODO: 백엔드 API가 제공되면 구현
    console.warn('updateMessage API not implemented yet');
    return null;
  },

  /**
   * 메시지 삭제
   * TODO: API 구현 대기 (백엔드 API 명세에 없음)
   */
  async deleteMessage(messageId) {
    // TODO: 백엔드 API가 제공되면 구현
    console.warn('deleteMessage API not implemented yet');
    return null;
  },

  /**
   * 메시지 번역 (REST API)
   * POST /api/translate
   * @param {number} messageId - 번역할 메시지 ID
   * @param {string} targetLang - 대상 언어 (ko, en, ja, fr)
   * @param {boolean} useWebSocket - WebSocket 사용 여부 (기본: false)
   * @param {function} onTranslate - WebSocket 사용 시 번역 결과 콜백
   * @returns {object|boolean} REST: { messageId, translatedMessage, originalMessage, targetLang }, WebSocket: success boolean
   */
  async translateMessage(messageId, targetLang, useWebSocket = false, onTranslate = null) {
    if (useWebSocket) {
      // WebSocket을 통한 번역 (응답은 /user/queue/translate로 수신)
      if (!chatWebSocketService.isConnected()) {
        console.error('WebSocket is not connected');
        return false;
      }
      return chatWebSocketService.translateMessage(messageId, targetLang, onTranslate);
    } else {
      // REST API를 통한 번역
      const response = await axiosInstance.post('/api/translate', {
        messageId,
        targetLang,
      });
      return response.data;
    }
  },

  /**
   * 메시지 전달
   * TODO: API 구현 대기 (백엔드 API 명세에 없음)
   */
  async forwardMessage(messageId, channelIds) {
    // TODO: 백엔드 API가 제공되면 구현
    console.warn('forwardMessage API not implemented yet');
    return null;
  },

  /**
   * 이모지 반응 추가
   * TODO: API 구현 대기 (백엔드 API 명세에 없음)
   */
  async addReaction(messageId, emoji) {
    // TODO: 백엔드 API가 제공되면 구현
    console.warn('addReaction API not implemented yet');
    return null;
  },

  /**
   * 이모지 반응 제거
   * TODO: API 구현 대기 (백엔드 API 명세에 없음)
   */
  async removeReaction(messageId, emoji) {
    // TODO: 백엔드 API가 제공되면 구현
    console.warn('removeReaction API not implemented yet');
    return null;
  },

  /**
   * 파일 업로드
   * TODO: API 구현 대기 (백엔드 API 명세에 없음)
   */
  async uploadFile(file, messageId, userId) {
    // TODO: 백엔드 API가 제공되면 구현
    console.warn('uploadFile API not implemented yet');
    return null;
  },

  /**
   * 메시지의 파일 목록 조회
   * TODO: API 구현 대기 (백엔드 API 명세에 없음)
   */
  async getMessageFiles(messageId) {
    // TODO: 백엔드 API가 제공되면 구현
    console.warn('getMessageFiles API not implemented yet');
    return [];
  },

  /**
   * 파일 삭제
   * TODO: API 구현 대기 (백엔드 API 명세에 없음)
   */
  async deleteFile(fileId) {
    // TODO: 백엔드 API가 제공되면 구현
    console.warn('deleteFile API not implemented yet');
    return null;
  },

  /**
   * 파일 정보 조회
   * TODO: API 구현 대기 (백엔드 API 명세에 없음)
   */
  async getFileInfo(fileId) {
    // TODO: 백엔드 API가 제공되면 구현
    console.warn('getFileInfo API not implemented yet');
    return null;
  },

  /**
   * 메시지 고정
   * TODO: API 구현 대기 (백엔드 API 명세에 없음)
   */
  async pinMessage(messageId) {
    // TODO: 백엔드 API가 제공되면 구현
    console.warn('pinMessage API not implemented yet');
    return { success: true };
  },

  /**
   * 메시지 고정 해제
   * TODO: API 구현 대기 (백엔드 API 명세에 없음)
   */
  async unpinMessage(messageId) {
    // TODO: 백엔드 API가 제공되면 구현
    console.warn('unpinMessage API not implemented yet');
    return { success: true };
  },

  // ========== WebSocket 관련 헬퍼 메서드 ==========

  /**
   * WebSocket 연결 초기화
   * @param {function} onConnect - 연결 성공 시 콜백
   * @param {function} onError - 에러 발생 시 콜백
   */
  initializeWebSocket(onConnect, onError) {
    chatWebSocketService.initialize(onConnect, onError);
  },

  /**
   * 채널 구독
   * @param {number} channelId - 채널 ID
   * @param {function} onMessage - 메시지 수신 시 콜백
   */
  subscribeToChannel(channelId, onMessage) {
    chatWebSocketService.subscribeToChannel(channelId, onMessage);
  },

  /**
   * 채널 구독 해제
   * @param {number} channelId - 채널 ID
   */
  unsubscribeFromChannel(channelId) {
    chatWebSocketService.unsubscribeFromChannel(channelId);
  },

  /**
   * WebSocket 연결 해제
   */
  disconnectWebSocket() {
    chatWebSocketService.disconnect();
  },

  /**
   * WebSocket 연결 상태 확인
   * @returns {boolean} 연결 여부
   */
  isWebSocketConnected() {
    return chatWebSocketService.isConnected();
  },
};
