import { useEffect, useRef, useCallback } from 'react';
import { messageService } from '@/core/api/services/messageService';

/**
 * WebSocket 연결 및 채널 구독 관리 Hook
 * @param {number} channelId - 구독할 채널 ID (선택)
 * @param {function} onMessage - 메시지 수신 시 콜백 (선택)
 * @param {object} options - 옵션
 * @param {boolean} options.autoConnect - 자동 연결 여부 (기본: true)
 * @param {boolean} options.autoSubscribe - 자동 구독 여부 (기본: true, channelId가 있을 때만)
 * @returns {object} { isConnected, sendMessage, translateMessage, subscribe, unsubscribe }
 */
export function useWebSocket(channelId = null, onMessage = null, options = {}) {
  const { autoConnect = true, autoSubscribe = true } = options;

  const isConnectedRef = useRef(false);
  const subscribedChannelsRef = useRef(new Set());

  // WebSocket 연결 초기화
  useEffect(() => {
    if (!autoConnect) return;

    const handleConnect = () => {
      console.log('✅ WebSocket connected');
      isConnectedRef.current = true;

      // 자동 구독이 활성화되어 있고 channelId가 있으면 구독
      if (autoSubscribe && channelId && onMessage) {
        messageService.subscribeToChannel(channelId, onMessage);
        subscribedChannelsRef.current.add(channelId);
      }
    };

    const handleError = (error) => {
      console.error('❌ WebSocket connection error:', error?.headers?.message || error?.message || 'Unknown error', error);
      isConnectedRef.current = false;
    };

    // WebSocket 초기화
    if (!messageService.isWebSocketConnected()) {
      messageService.initializeWebSocket(handleConnect, handleError);
    } else {
      isConnectedRef.current = true;

      // 이미 연결되어 있으면 바로 구독
      if (autoSubscribe && channelId && onMessage) {
        messageService.subscribeToChannel(channelId, onMessage);
        subscribedChannelsRef.current.add(channelId);
      }
    }

    // Cleanup: 컴포넌트 언마운트 시 구독 해제
    return () => {
      if (channelId && subscribedChannelsRef.current.has(channelId)) {
        messageService.unsubscribeFromChannel(channelId);
        subscribedChannelsRef.current.delete(channelId);
      }
    };
  }, [channelId, onMessage, autoConnect, autoSubscribe]);

  // 메시지 전송
  const sendMessage = useCallback((data) => {
    if (!channelId) {
      console.error('channelId is required to send message');
      return false;
    }

    return messageService.sendMessage(channelId, data);
  }, [channelId]);

  // 메시지 번역
  const translateMessage = useCallback((messageId, targetLang, useWebSocket = false, onTranslate = null) => {
    return messageService.translateMessage(messageId, targetLang, useWebSocket, onTranslate);
  }, []);

  // 채널 구독
  const subscribe = useCallback((targetChannelId, callback) => {
    messageService.subscribeToChannel(targetChannelId, callback);
    subscribedChannelsRef.current.add(targetChannelId);
  }, []);

  // 채널 구독 해제
  const unsubscribe = useCallback((targetChannelId) => {
    messageService.unsubscribeFromChannel(targetChannelId);
    subscribedChannelsRef.current.delete(targetChannelId);
  }, []);

  return {
    isConnected: isConnectedRef.current,
    sendMessage,
    translateMessage,
    subscribe,
    unsubscribe,
  };
}

/**
 * 채팅 채널 Hook
 * useWebSocket의 간편한 래퍼
 * @param {number} channelId - 채널 ID
 * @param {function} onMessage - 메시지 수신 시 콜백
 * @returns {object} { sendMessage, translateMessage }
 */
export function useChat(channelId, onMessage) {
  const { sendMessage, translateMessage } = useWebSocket(channelId, onMessage);

  return {
    sendMessage,
    translateMessage,
  };
}
