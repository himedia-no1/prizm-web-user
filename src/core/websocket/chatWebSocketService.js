import stompClient from './stompClient';

/**
 * 채팅 WebSocket 서비스
 * - 메시지 전송/수신
 * - 채널 구독 관리
 * - 번역 요청
 */

class ChatWebSocketService {
  constructor() {
    this.channelSubscriptions = new Map();
    this.userQueueSubscription = null;
    this.onMessageCallbacks = new Map();
    this.onTranslateCallback = null;
  }

  /**
   * WebSocket 연결 초기화
   * @param {function} onConnect - 연결 성공 시 콜백
   * @param {function} onError - 에러 발생 시 콜백
   */
  initialize(onConnect, onError) {
    stompClient.connect(
      (frame) => {
        console.log('Chat WebSocket initialized');

        // 사용자 전용 큐 구독 (번역 응답 수신용)
        this._subscribeUserQueue();

        if (onConnect) {
          onConnect(frame);
        }
      },
      (error) => {
        console.error('Chat WebSocket initialization failed:', error);
        if (onError) {
          onError(error);
        }
      }
    );
  }

  /**
   * 사용자 전용 큐 구독 (/user/queue/translate)
   */
  _subscribeUserQueue() {
    if (this.userQueueSubscription) {
      return;
    }

    this.userQueueSubscription = stompClient.subscribe(
      '/user/queue/translate',
      (message) => {
        console.log('📨 Translation received:', message);
        if (this.onTranslateCallback) {
          this.onTranslateCallback(message);
        }
      }
    );
  }

  /**
   * 채널 구독
   * @param {number} channelId - 채널 ID
   * @param {function} onMessage - 메시지 수신 시 콜백
   */
  subscribeToChannel(channelId, onMessage) {
    if (this.channelSubscriptions.has(channelId)) {
      console.warn(`Already subscribed to channel ${channelId}`);
      return;
    }

    const destination = `/topic/channel/${channelId}`;
    const subscriptionId = stompClient.subscribe(destination, (message) => {
      console.log(`📨 Message received in channel ${channelId}:`, message);
      if (onMessage) {
        onMessage(message);
      }

      // 콜백 맵에서 해당 채널의 콜백 실행
      const callbacks = this.onMessageCallbacks.get(channelId);
      if (callbacks) {
        callbacks.forEach(cb => cb(message));
      }
    });

    this.channelSubscriptions.set(channelId, subscriptionId);
    console.log(`✅ Subscribed to channel ${channelId}`);
  }

  /**
   * 채널 구독 해제
   * @param {number} channelId - 채널 ID
   */
  unsubscribeFromChannel(channelId) {
    const subscriptionId = this.channelSubscriptions.get(channelId);
    if (subscriptionId) {
      stompClient.unsubscribe(subscriptionId);
      this.channelSubscriptions.delete(channelId);
      this.onMessageCallbacks.delete(channelId);
      console.log(`✅ Unsubscribed from channel ${channelId}`);
    }
  }

  /**
   * 메시지 전송
   * WebSocket: /app/chat.send
   * @param {object} data - {
   *   channelId: number,
   *   workspaceUserId: number,
   *   contentType: string,
   *   content: string
   * }
   * @returns {boolean} 전송 성공 여부
   */
  sendMessage(data) {
    const { channelId, workspaceUserId, contentType, content } = data;

    if (!channelId || !workspaceUserId || !contentType || !content) {
      console.error('Invalid message data:', data);
      return false;
    }

    return stompClient.send('/app/chat.send', {
      channelId,
      workspaceUserId,
      contentType,
      content,
    });
  }

  /**
   * 메시지 번역 요청 (WebSocket)
   * WebSocket: /app/chat.translate
   * 응답은 /user/queue/translate로 수신
   * @param {number} messageId - 번역할 메시지 ID
   * @param {string} targetLang - 대상 언어 (ko, en, ja, fr)
   * @param {function} onTranslate - 번역 결과 수신 시 콜백
   * @returns {boolean} 요청 성공 여부
   */
  translateMessage(messageId, targetLang, onTranslate) {
    if (!messageId || !targetLang) {
      console.error('Invalid translation request:', { messageId, targetLang });
      return false;
    }

    // 번역 응답 콜백 설정
    if (onTranslate) {
      this.onTranslateCallback = onTranslate;
    }

    return stompClient.send('/app/chat.translate', {
      messageId,
      targetLang,
    });
  }

  /**
   * 채널 메시지 수신 콜백 등록
   * @param {number} channelId - 채널 ID
   * @param {function} callback - 메시지 수신 시 콜백
   */
  addMessageCallback(channelId, callback) {
    if (!this.onMessageCallbacks.has(channelId)) {
      this.onMessageCallbacks.set(channelId, new Set());
    }
    this.onMessageCallbacks.get(channelId).add(callback);
  }

  /**
   * 채널 메시지 수신 콜백 제거
   * @param {number} channelId - 채널 ID
   * @param {function} callback - 제거할 콜백
   */
  removeMessageCallback(channelId, callback) {
    const callbacks = this.onMessageCallbacks.get(channelId);
    if (callbacks) {
      callbacks.delete(callback);
    }
  }

  /**
   * 모든 구독 해제 및 연결 종료
   */
  disconnect() {
    // 모든 채널 구독 해제
    this.channelSubscriptions.forEach((subscriptionId, channelId) => {
      stompClient.unsubscribe(subscriptionId);
    });
    this.channelSubscriptions.clear();
    this.onMessageCallbacks.clear();

    // 사용자 큐 구독 해제
    if (this.userQueueSubscription) {
      stompClient.unsubscribe(this.userQueueSubscription);
      this.userQueueSubscription = null;
    }

    this.onTranslateCallback = null;

    // WebSocket 연결 해제
    stompClient.disconnect();
  }

  /**
   * 연결 상태 확인
   */
  isConnected() {
    return stompClient.isActive();
  }
}

// 싱글톤 인스턴스 생성
const chatWebSocketService = new ChatWebSocketService();

export default chatWebSocketService;
