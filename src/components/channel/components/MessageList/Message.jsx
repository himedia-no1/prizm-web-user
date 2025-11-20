'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useMessages, useLocale } from 'next-intl';
import { useUIStore } from '@/core/store/shared';
import { getPlaceholderImage } from '@/shared/utils/imagePlaceholder';
import { useMessageTranslation } from '@/components/channel/hooks/useMessageTranslation';
import { InlineActions } from './InlineActions';
import { ReplyPreview } from './ReplyPreview';
import styles from './Message.module.css';

// 텍스트에서 검색어를 하이라이트하는 함수
const highlightText = (text, searchQuery) => {
  if (!searchQuery || !text) return text;

  const parts = text.split(new RegExp(`(${searchQuery})`, 'gi'));
  return parts.map((part, index) =>
    part.toLowerCase() === searchQuery.toLowerCase() ? (
      <mark key={index} style={{ backgroundColor: '#fef08a', padding: '2px 0' }}>
        {part}
      </mark>
    ) : (
      part
    )
  );
};

export const Message = ({
  message,
  user,
  onStartThread,
  onOpenUserProfile,
  onOpenContextMenu,
  onReply,
  onReactEmoji,
  onTranslateMessage,
  currentUserId = 'u1',
  searchQuery = '',
  replyToMessage = null,
  replyToUser = null,
  onReplyClick
}) => {
  const fallbackUser = {
    id: 'unknown-user',
    name: 'Unknown User',
    avatar: null,
  };
  const displayUser = user || fallbackUser;
  
  const hasThread = message.threadId;
  const threadCount = message.threadCount || 0;
  const { autoTranslateEnabled } = useUIStore();
  const locale = useLocale();
  const messages = useMessages();
  const messageStrings = messages?.message ?? {};
  const [inlineActionsState, setInlineActionsState] = useState({ visible: false, position: null });
  const messageRef = useRef(null);
  const isMyMessage = message.userId === currentUserId;
  const canManualTranslate = !isMyMessage && !autoTranslateEnabled;
  const canShowInlineActions = !autoTranslateEnabled;
  const {
    translationState,
    translatedText,
    shouldShowTranslation,
    isOriginalVisible,
    toggleOriginalVisibility,
    handleManualTranslate,
  } = useMessageTranslation({
    message,
    locale,
    autoTranslateEnabled,
    manualTranslateCallback: onTranslateMessage,
  });

  useEffect(() => {
    if (!inlineActionsState.visible) return;

    const handleClickOutside = (event) => {
      if (messageRef.current && !messageRef.current.contains(event.target)) {
        setInlineActionsState({ visible: false, position: null });
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [inlineActionsState.visible]);

  useEffect(() => {
    if (autoTranslateEnabled && inlineActionsState.visible) {
      setInlineActionsState({ visible: false, position: null });
    }
  }, [autoTranslateEnabled, inlineActionsState.visible]);

  const shouldShowInlineActionsTranslate = canManualTranslate && Boolean(onTranslateMessage);

  const primaryText = shouldShowTranslation ? translatedText : message.text;

  const handleMessageClick = (event) => {
    if (canShowInlineActions) {
      event.preventDefault();
      event.stopPropagation();
      const rect = messageRef.current?.getBoundingClientRect();
      setInlineActionsState((prev) => ({
        visible: !prev.visible,
        position: rect ? { top: event.clientY - rect.top, right: rect.right - event.clientX } : null,
      }));
      return;
    }
    onOpenContextMenu(message, { x: event.clientX, y: event.clientY }, { defaultFullMenu: false });
  };

  const handleCopy = (event) => {
    event.stopPropagation();
    if (message.text && typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(message.text);
    }
  };

  const handleInlineReply = (event) => {
    event.stopPropagation();
    onReply?.(message);
  };

  const handleInlineEmoji = (event) => {
    event.stopPropagation();
    onReactEmoji?.(message);
  };

  const handleInlineMore = (event) => {
    event.stopPropagation();
    const rect = event.currentTarget.getBoundingClientRect();
    onOpenContextMenu(message, { x: rect.right, y: rect.bottom }, { defaultFullMenu: true });
    setInlineActionsState({ visible: false, position: null });
  };

  const avatarSrc = displayUser.avatar || getPlaceholderImage(40, displayUser.name?.[0] ?? '?');

  return (
    <div
      ref={messageRef}
      data-message-id={message.id}
      className={styles.messageContainer}
      onClick={handleMessageClick}
    >
      <Image
        src={avatarSrc}
        alt={displayUser.name}
        width={40}
        height={40}
        className={`${styles.avatar} ${styles.clickable}`}
        onClick={(e) => {
          e.stopPropagation();
          onOpenUserProfile(displayUser.id);
        }}
      />
      <div className={styles.content}>
        <div className={styles.header}>
          <span
            className={`${styles.username} ${styles.clickable}`}
            onClick={(e) => {
              e.stopPropagation();
              onOpenUserProfile(displayUser.id);
            }}
          >
            {displayUser.name}
          </span>
          <span className={styles.timestamp}>{message.timestamp}</span>
        </div>

        <ReplyPreview replyToMessage={replyToMessage} replyToUser={replyToUser} onReplyClick={onReplyClick} />

        <p className={`${styles.text}${shouldShowTranslation ? ` ${styles.textTranslated}` : ''}`}>
          {searchQuery ? highlightText(primaryText, searchQuery) : primaryText}
        </p>

        {shouldShowTranslation && (
          <div className={styles.translationMeta}>
            <button
              type="button"
              className={styles.translationToggle}
              onClick={toggleOriginalVisibility}
            >
              {isOriginalVisible ? messageStrings.hideOriginal : messageStrings.showOriginal}
            </button>
          </div>
        )}

        {shouldShowTranslation && isOriginalVisible && (
          <div className={styles.original}>
            <span>{message.text}</span>
          </div>
        )}

        {autoTranslateEnabled && translationState === 'loading' && (
          <div className={styles.translation}>
            <span className={styles.translationLoading}>
              {messageStrings.translating ?? 'Translating...'}
            </span>
          </div>
        )}

        {Object.keys(message.reactions || {}).length > 0 && (
          <div className={styles.reactions}>
            {Object.entries(message.reactions).map(([emoji, count]) => (
              <button key={emoji} className={styles.reactionButton}>
                <span>{emoji}</span>
                <span className={styles.reactionButtonCount}>{count}</span>
              </button>
            ))}
          </div>
        )}

        {hasThread && threadCount > 0 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onStartThread(message);
            }}
            className={styles.threadReply}
          >
            {threadCount} {threadCount === 1 ? 'thread' : 'threads'}
          </button>
        )}
      </div>

      {canShowInlineActions && (
        <InlineActions
          isVisible={inlineActionsState.visible}
          position={inlineActionsState.position}
          onCopy={handleCopy}
          onEmoji={handleInlineEmoji}
          onReply={handleInlineReply}
          onTranslate={handleManualTranslate}
          onMore={handleInlineMore}
          showTranslateButton={shouldShowInlineActionsTranslate}
        />
      )}
    </div>
  );
};
