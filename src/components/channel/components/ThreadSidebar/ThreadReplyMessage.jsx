'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { useMessages, useLocale } from 'next-intl';
import { useUIStore } from '@/core/store/shared';
import { messageService } from '@/core/api/services';
import { getPlaceholderImage } from '@/shared/utils/imagePlaceholder';
import styles from './ThreadReplyMessage.module.css';

const getTranslationText = (translation) => {
  if (!translation) {
    return '';
  }

  if (typeof translation === 'string') {
    return translation;
  }

  if (typeof translation === 'object') {
    return translation.text || translation.translatedText || '';
  }

  return '';
};

export const ThreadReplyMessage = React.memo(({ reply, user, onOpenContextMenu }) => {
  const autoTranslateEnabled = useUIStore((state) => state.autoTranslateEnabled);
  const locale = useLocale();
  const messages = useMessages();
  const messageStrings = messages?.message ?? {};

  const [translationState, setTranslationState] = useState('none'); // 'none' | 'loading' | 'done'
  const [translatedText, setTranslatedText] = useState('');
  const [isOriginalVisible, setIsOriginalVisible] = useState(false);

  const handleAutoTranslate = useCallback(async () => {
    setTranslationState('loading');

    setTimeout(async () => {
      try {
        const result = await messageService.translateMessage(reply.id, locale);
        setTranslatedText(result.translatedText);
        setTranslationState('done');
        setIsOriginalVisible(false);
      } catch (error) {
        console.error('Translation failed:', error);
        setTranslationState('none');
      }
    }, 500);
  }, [reply.id, locale]);

  // 자동번역 설정 변경 또는 메시지 변경 시 상태 업데이트
  useEffect(() => {
    setIsOriginalVisible(false);

    // 자동번역이 꺼져있으면 항상 원문만 표시
    if (!autoTranslateEnabled) {
      setTranslatedText('');
      setTranslationState('none');
      return;
    }

    // 자동번역이 켜져있을 때만 캐시된 번역 확인
    const cachedTranslation = getTranslationText(reply.translations?.[locale]);

    if (cachedTranslation) {
      setTranslatedText(cachedTranslation);
      setTranslationState('done');
    } else {
      setTranslatedText('');
      setTranslationState('none');

      // 자동번역이 켜져있고 메시지 언어가 다르면 번역 요청
      if (reply.language && reply.language !== locale) {
        handleAutoTranslate();
      }
    }
  }, [reply.id, locale, autoTranslateEnabled, reply.translations, reply.language, handleAutoTranslate]);

  // 번역된 텍스트를 기본으로 표시할지 결정
  const shouldShowTranslation =
    autoTranslateEnabled &&
    reply.language &&
    reply.language !== locale &&
    translationState === 'done' &&
    translatedText;

  const primaryText = shouldShowTranslation ? translatedText : reply.text;

  const avatarSrc = user.avatar || getPlaceholderImage(32, user?.name?.[0] ?? '?');

  return (
    <div 
      key={reply.id}
      className="thread-reply"
      onContextMenu={(e) => {
        e.preventDefault();
        onOpenContextMenu(reply, { x: e.clientX, y: e.clientY });
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
              onClick={(event) => {
                event.stopPropagation();
                setIsOriginalVisible((prev) => !prev);
              }}
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