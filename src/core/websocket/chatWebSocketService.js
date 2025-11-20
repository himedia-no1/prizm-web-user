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
    // 이미 연결되어 있으면 즉시 onConnect 콜백 실행
    if (stompClient.isActive()) {
      console.log('✅ WebSocket already connected');
      if (onConnect) {
        onConnect();
      }
      return;
    }

    // 연결 중이면 대기
    if (stompClient.isConnecting) {
      console.log('⏳ WebSocket is connecting...');
      return;
    }

    stompClient.connect(
      (frame) => {
        console.log('✅ Chat WebSocket initialized');

        if (onConnect) {
          onConnect(frame);
        }
      },
      (error) => {
        console.error('❌ Chat WebSocket initialization failed:', error?.headers?.message || error?.message || 'Unknown error');
        if (onError) {
          onError(error);
        }
      }
    );
  }

  /**
   * 사용자 전용 큐 구독 (/user/queue/translate)
   * 번역 기능 사용 시 호출
   */
  _subscribeUserQueue() {
    if (this.userQueueSubscription) {
      return;
    }

    try {
      this.userQueueSubscription = stompClient.subscribe(
        '/user/queue/translate',
        (message) => {
          console.log('📨 Translation received:', message);
          if (this.onTranslateCallback) {
            this.onTranslateCallback(message);
          }
        }
      );
      console.log('✅ Subscribed to user queue: /user/queue/translate');
    } catch (error) {
      console.warn('⚠️ Failed to subscribe to user queue (번역 기능 사용 불가):', error);
      this.userQueueSubscription = null;
    }
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

    // WebSocket이 연결되지 않았으면 에러
    if (!stompClient.isActive()) {
      console.error(`Cannot subscribe to channel ${channelId}: WebSocket is not connected`);
      return;
    }

    // RabbitMQ STOMP topic destination
    const destination = `/topic/channel/${channelId}`;
    console.log(`🔍 [DEBUG] Subscribing with channelId: "${channelId}", destination: "${destination}"`);
    console.log(`📍 SUBSCRIBE DESTINATION: ${destination}`);
    
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

    if (subscriptionId) {
      this.channelSubscriptions.set(channelId, subscriptionId);
      console.log(`✅ Subscribed to channel ${channelId}`);
    } else {
      console.error(`Failed to subscribe to channel ${channelId}`);
    }
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

    // 데이터 검증
    if (!channelId || !workspaceUserId || !contentType || !content) {
      console.error('❌ Invalid message data:', data);
      console.error('Required fields: channelId, workspaceUserId, contentType, content');
      return false;
    }

    const messageData = {
      channelId: String(channelId),  // 문자열로 전송 (JavaScript BigInt 정밀도 문제 방지)
      workspaceUserId: String(workspaceUserId),
      contentType,
      content: content.trim(),
    };

    console.log('📤 Sending message:', messageData);

    return stompClient.send('/app/chat.send', messageData);
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

    // 첫 번역 요청 시 user queue 구독
    if (!this.userQueueSubscription) {
      this._subscribeUserQueue();
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
