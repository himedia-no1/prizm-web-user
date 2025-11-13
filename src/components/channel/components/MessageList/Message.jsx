import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { useMessages, useLocale } from 'next-intl';
import { useUIStore } from '@/core/store/shared';
import { messageService } from '@/core/api/services';
import { getPlaceholderImage } from '@/shared/utils/imagePlaceholder';
import styles from './Message.module.css';

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

export const Message = ({ message, user, onStartThread, onOpenUserProfile, onOpenContextMenu }) => {
  const hasThread = message.threadId;
  const replyCount = hasThread ? 2 : 0;
  const { autoTranslateEnabled } = useUIStore();
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
        const result = await messageService.translateMessage(message.id, locale);
        setTranslatedText(result.translatedText);
        setTranslationState('done');
        setIsOriginalVisible(false);
      } catch (error) {
        console.error('Translation failed:', error);
        setTranslationState('none');
      }
    }, 500);
  }, [message.id, locale]);

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
    const cachedTranslation = getTranslationText(message.translations?.[locale]);

    if (cachedTranslation) {
      setTranslatedText(cachedTranslation);
      setTranslationState('done');
    } else {
      setTranslatedText('');
      setTranslationState('none');

      // 자동번역이 켜져있고 메시지 언어가 다르면 번역 요청
      if (message.language && message.language !== locale) {
        handleAutoTranslate();
      }
    }
  }, [message.id, locale, autoTranslateEnabled, message.translations, message.language, handleAutoTranslate]);

  // 번역된 텍스트를 기본으로 표시할지 결정
  const shouldShowTranslation =
    autoTranslateEnabled &&
    message.language &&
    message.language !== locale &&
    translationState === 'done' &&
    translatedText;

  const primaryText = shouldShowTranslation ? translatedText : message.text;

  const handleClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    // 사용자가 클릭한 실제 위치 사용 (디스코드/슬랙 방식)
    onOpenContextMenu(message, { x: event.clientX, y: event.clientY });
  };

  const avatarSrc = user.avatar || getPlaceholderImage(40, user?.name?.[0] ?? '?');

  return (
    <div className={styles.messageContainer} onClick={handleClick}>
      <Image
        src={avatarSrc}
        alt={user.name}
        width={40}
        height={40}
        className={`${styles.avatar} ${styles.clickable}`}
        onClick={(e) => {
          e.stopPropagation();
          onOpenUserProfile(user.id);
        }}
      />
      <div className={styles.content}>
        <div className={styles.header}>
          <span
            className={`${styles.username} ${styles.clickable}`}
            onClick={(e) => {
              e.stopPropagation();
              onOpenUserProfile(user.id);
            }}
          >
            {user.name}
          </span>
          <span className={styles.timestamp}>{message.timestamp}</span>
        </div>
        <p className={`${styles.text}${shouldShowTranslation ? ` ${styles.textTranslated}` : ''}`}>
          {primaryText}
        </p>

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

        {hasThread && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onStartThread(message);
            }}
            className={styles.threadReply}
          >
            {replyCount} {replyCount > 1 ? 'replies' : 'reply'}
          </button>
        )}
      </div>
    </div>
  );
};
