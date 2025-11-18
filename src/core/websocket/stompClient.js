import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { useAuthStore } from '@/core/store/authStore';

/**
 * STOMP WebSocket 클라이언트 설정
 * - STOMP over SockJS를 사용
 * - 자동 재연결 지원
 * - 인증 토큰 자동 주입
 */

class StompClientManager {
  constructor() {
    this.client = null;
    this.subscriptions = new Map();
    this.isConnecting = false;
    this.isConnected = false;
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 5;
    this.reconnectDelay = 3000;
  }

  /**
   * STOMP 클라이언트 초기화 및 연결
   * @param {function} onConnect - 연결 성공 시 콜백
   * @param {function} onError - 에러 발생 시 콜백
   */
  connect(onConnect, onError) {
    if (this.isConnected || this.isConnecting) {
      console.warn('WebSocket is already connected or connecting');
      return;
    }

    this.isConnecting = true;

    const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8080';
    const wsURL = `${baseURL}/ws`;

    this.client = new Client({
      webSocketFactory: () => new SockJS(wsURL),

      connectHeaders: this._getConnectHeaders(),

      debug: (str) => {
        if (process.env.NODE_ENV === 'development') {
          console.log('[STOMP]', str);
        }
      },

      reconnectDelay: this.reconnectDelay,
      heartbeatIncoming: 10000,
      heartbeatOutgoing: 10000,

      onConnect: (frame) => {
        console.log('✅ WebSocket Connected:', frame);
        this.isConnected = true;
        this.isConnecting = false;
        this.reconnectAttempts = 0;

        if (onConnect) {
          onConnect(frame);
        }
      },

      onStompError: (frame) => {
        console.error('❌ STOMP Error:', frame);
        this.isConnected = false;
        this.isConnecting = false;

        if (onError) {
          onError(frame);
        }
      },

      onWebSocketError: (event) => {
        console.error('❌ WebSocket Error:', event);
        this.isConnected = false;
        this.isConnecting = false;
      },

      onDisconnect: () => {
        console.log('🔌 WebSocket Disconnected');
        this.isConnected = false;
        this.isConnecting = false;
        this._handleReconnect();
      },
    });

    this.client.activate();
  }

  /**
   * 연결 헤더 생성 (인증 토큰 포함)
   */
  _getConnectHeaders() {
    const token = useAuthStore.getState().accessToken;
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  /**
   * 재연결 처리
   */
  _handleReconnect() {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.error('Max reconnect attempts reached. Giving up.');
      return;
    }

    this.reconnectAttempts++;
    console.log(`🔄 Reconnecting... (Attempt ${this.reconnectAttempts}/${this.maxReconnectAttempts})`);
  }

  /**
   * 채널 구독
   * @param {string} destination - 구독할 경로 (예: /topic/channel/1)
   * @param {function} callback - 메시지 수신 시 콜백
   * @returns {string} subscription ID
   */
  subscribe(destination, callback) {
    if (!this.client || !this.isConnected) {
      console.error('Cannot subscribe: WebSocket is not connected');
      return null;
    }

    const subscription = this.client.subscribe(destination, (message) => {
      try {
        const body = JSON.parse(message.body);
        callback(body);
      } catch (error) {
        console.error('Failed to parse message:', error);
        callback(message.body);
      }
    });

    const subscriptionId = subscription.id;
    this.subscriptions.set(subscriptionId, subscription);

    console.log(`📡 Subscribed to ${destination} (ID: ${subscriptionId})`);
    return subscriptionId;
  }

  /**
   * 구독 해제
   * @param {string} subscriptionId - 구독 ID
   */
  unsubscribe(subscriptionId) {
    const subscription = this.subscriptions.get(subscriptionId);
    if (subscription) {
      subscription.unsubscribe();
      this.subscriptions.delete(subscriptionId);
      console.log(`🔕 Unsubscribed (ID: ${subscriptionId})`);
    }
  }

  /**
   * 메시지 전송
   * @param {string} destination - 전송할 경로 (예: /app/chat.send)
   * @param {object} body - 전송할 데이터
   * @param {object} headers - 추가 헤더 (선택)
   */
  send(destination, body, headers = {}) {
    if (!this.client || !this.isConnected) {
      console.error('Cannot send message: WebSocket is not connected');
      return false;
    }

    try {
      this.client.publish({
        destination,
        body: JSON.stringify(body),
        headers: {
          ...this._getConnectHeaders(),
          ...headers,
        },
      });
      console.log(`📤 Sent message to ${destination}:`, body);
      return true;
    } catch (error) {
      console.error('Failed to send message:', error);
      return false;
    }
  }

  /**
   * 연결 해제
   */
  disconnect() {
    if (this.client) {
      // 모든 구독 해제
      this.subscriptions.forEach((subscription) => {
        subscription.unsubscribe();
      });
      this.subscriptions.clear();

      // 연결 해제
      this.client.deactivate();
      this.client = null;
      this.isConnected = false;
      this.isConnecting = false;
      console.log('🔌 WebSocket Disconnected');
    }
  }

  /**
   * 연결 상태 확인
   */
  isActive() {
    return this.isConnected && this.client?.connected;
  }
}

// 싱글톤 인스턴스 생성
const stompClient = new StompClientManager();

export default stompClient;
