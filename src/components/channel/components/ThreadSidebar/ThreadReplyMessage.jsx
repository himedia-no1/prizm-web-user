'use client';

import React from 'react';
import Image from 'next/image';
import { useMessages, useLocale } from 'next-intl';
import { useUIStore } from '@/core/store/shared';
import { useMessageTranslation } from '@/components/channel/hooks/useMessageTranslation';
import { getPlaceholderImage } from '@/shared/utils/imagePlaceholder';
import styles from './ThreadReplyMessage.module.css';

export const ThreadReplyMessage = React.memo(({ reply, user, onOpenContextMenu }) => {
  const autoTranslateEnabled = useUIStore((state) => state.autoTranslateEnabled);
  const locale = useLocale();
  const messages = useMessages();
  const messageStrings = messages?.message ?? {};
  const {
    translationState,
    translatedText,
    shouldShowTranslation,
    isOriginalVisible,
    toggleOriginalVisibility,
  } = useMessageTranslation({
    message: reply,
    locale,
    autoTranslateEnabled,
  });

  const primaryText = shouldShowTranslation ? translatedText : reply.text;

  const avatarSrc = user.avatar || getPlaceholderImage(32, user?.name?.[0] ?? '?');

  return (
    <div 
      key={reply.id}
      className="thread-reply"
      onContextMenu={(e) => {
        e.preventDefault();
        onOpenContextMenu(reply, { x: e.clientX, y: e.clientY }, { defaultFullMenu: false });
      }}
    >
      <Image
        src={avatarSrc}
        alt={user.name}
        width={32}
        height={32}
        className="message__avatar"
      />
      <div>
        <div className="message__header">
          <span className="message__username">{user.name}</span>
          <span className="message__timestamp">{reply.timestamp}</span>
        </div>
        <p className="message__text">{primaryText}</p>
        {shouldShowTranslation && (
          <div className={styles.translationMeta}>
            <button
              type="button"
              className={styles.translationToggle}
              onClick={toggleOriginalVisibility}
            >
              {isOriginalVisible
                ? messageStrings.hideOriginal
                : messageStrings.showOriginal}
            </button>
          </div>
        )}

        {shouldShowTranslation && isOriginalVisible && (
          <div className={styles.original}>
            <span>{reply.text}</span>
          </div>
        )}

        {autoTranslateEnabled && translationState === 'loading' && (
          <div className={styles.translation}>
            <span className={styles.translationLoading}>
              {messageStrings.translating}
            </span>
          </div>
        )}

        {Object.keys(reply.reactions || {}).length > 0 && (
          <div className={styles.reactions}>
            {Object.entries(reply.reactions).map(([emoji, count]) => (
              <button key={emoji} className={styles.reactionButton}>
                <span>{emoji}</span>
                <span className={styles.reactionButtonCount}>{count}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
});
