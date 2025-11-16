'use client';

import { useState } from 'react';
import { useChatStore } from '@/core/store/chat';

/**
 * Thread 상태 관리 Hook
 * - 현재 열린 스레드
 * - 스레드 열기/닫기
 * - 스레드 메시지 입력
 */
export const useThreadState = () => {
  const { currentThread, openThread, closeThread } = useChatStore();
  const [message, setMessage] = useState('');

  const handleStartThread = (selectedMessage) => {
    openThread(selectedMessage);
  };

  return {
    currentThread,
    openThread,
    closeThread,
    handleStartThread,
    message,
    setMessage,
  };
};
