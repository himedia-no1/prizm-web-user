'use client';

import { useRef, useEffect } from 'react';
import { Message } from '@/components/channel/components/MessageList/Message';
import styles from './MessageList.module.css';

export const MessageList = ({
  messages,
  users,
  onStartThread,
  onOpenUserProfile,
  onOpenContextMenu,
  onReply,
  onReactEmoji,
  onTranslateMessage,
  currentUserId,
  searchQuery = '',
  currentSearchIndex = -1
}) => {
  const messageListRef = useRef(null);
  const messageRefs = useRef({});

  // 현재 검색 결과로 스크롤
  useEffect(() => {
    if (!searchQuery || currentSearchIndex < 0) return;

    const matchedMessages = messages.filter(msg =>
      msg.text?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (matchedMessages[currentSearchIndex]) {
      const targetMessageId = matchedMessages[currentSearchIndex].id;
      const targetElement = messageRefs.current[targetMessageId];

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }
    }
  }, [currentSearchIndex, searchQuery, messages]);

  // 답글 클릭 시 원본 메시지로 스크롤
  const handleReplyClick = (replyId) => {
    const targetElement = messageRefs.current[replyId];
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
      // 잠깐 하이라이트 효과
      targetElement.style.backgroundColor = 'rgba(251, 191, 36, 0.2)';
      setTimeout(() => {
        targetElement.style.backgroundColor = '';
      }, 1500);
    }
  };
  
  // workspaceUserId로 사용자 정보 찾기
  const getUserByWorkspaceId = (workspaceUserId, message) => {
    // 메시지에 username이 있으면 직접 사용 (워크스페이스 유저 프로필)
    if (message.username) {
      return {
        id: message.userId || message.workspaceUserId,
        name: message.username,
        avatar: message.userAvatar || null,
      };
    }
    
    // users 객체에서 찾기 (userId나 workspaceUserId로)
    const userById = users[message.userId];
    if (userById) return userById;
    
    const userByWorkspaceId = users[workspaceUserId];
    if (userByWorkspaceId) return userByWorkspaceId;
    
    // users 배열인 경우 (구버전 호환)
    if (Array.isArray(users)) {
      const found = users.find(u => 
        u.id === message.userId || 
        u.id === workspaceUserId ||
        u.workspaceUserId === workspaceUserId
      );
      if (found) return found;
    }
    
    // 찾지 못한 경우 기본값
    return null;
  };

  return (
    <div className={styles.messageList} ref={messageListRef}>
      {messages.map(msg => {
        // 답글인 경우 원본 메시지 찾기
        const replyToMessage = msg.reply_id ? messages.find(m => m.id === msg.reply_id) : null;
        
        // 사용자 정보 조회
        const user = getUserByWorkspaceId(msg.workspaceUserId, msg);
        const replyToUser = replyToMessage ? getUserByWorkspaceId(replyToMessage.workspaceUserId, replyToMessage) : null;

        return (
          <div
            key={msg.id}
            ref={el => messageRefs.current[msg.id] = el}
          >
            <Message
              message={msg}
              user={user}
              onStartThread={onStartThread}
              onOpenUserProfile={onOpenUserProfile}
              onOpenContextMenu={onOpenContextMenu}
              onReply={onReply}
              onReactEmoji={onReactEmoji}
              onTranslateMessage={onTranslateMessage}
              currentUserId={currentUserId}
              searchQuery={searchQuery}
              replyToMessage={replyToMessage}
              replyToUser={replyToUser}
              onReplyClick={handleReplyClick}
            />
          </div>
        );
      })}
    </div>
  );
};
