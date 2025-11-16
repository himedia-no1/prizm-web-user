import { useRef, useEffect } from 'react';
import { Message } from '@/components/channel/components/MessageList/Message';
import styles from './MessageList.module.css';

export const MessageList = ({
  messages,
  users,
  onStartThread,
  onOpenUserProfile,
  onOpenContextMenu,
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

  return (
    <div className={styles.messageList} ref={messageListRef}>
      {messages.map(msg => {
        const isMatch = searchQuery && msg.text?.toLowerCase().includes(searchQuery.toLowerCase());
        const matchedMessages = searchQuery ? messages.filter(m =>
          m.text?.toLowerCase().includes(searchQuery.toLowerCase())
        ) : [];
        const isCurrentMatch = isMatch && matchedMessages[currentSearchIndex]?.id === msg.id;

        return (
          <div
            key={msg.id}
            ref={el => messageRefs.current[msg.id] = el}
            className={isCurrentMatch ? styles.currentSearchMatch : ''}
          >
            <Message
              message={msg}
              user={users[msg.userId]}
              onStartThread={onStartThread}
              onOpenUserProfile={onOpenUserProfile}
              onOpenContextMenu={onOpenContextMenu}
              searchQuery={searchQuery}
              isSearchMatch={isMatch}
              isCurrentSearchMatch={isCurrentMatch}
            />
          </div>
        );
      })}
    </div>
  );
};
