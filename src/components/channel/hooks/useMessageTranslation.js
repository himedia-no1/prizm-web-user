'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { messageService } from '@/core/api/services';

export const getTranslationText = (translation) => {
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

export const useMessageTranslation = ({
  message,
  locale,
  autoTranslateEnabled,
  manualTranslateCallback,
}) => {
  const [translationState, setTranslationState] = useState('none'); // 'none' | 'loading' | 'done'
  const [translatedText, setTranslatedText] = useState('');
  const [isOriginalVisible, setIsOriginalVisible] = useState(false);

  const manualTranslatedText = useMemo(
    () => getTranslationText(message.manualTranslations?.[locale]),
    [message.manualTranslations, locale],
  );

  const requestAutoTranslation = useCallback(async () => {
    setTranslationState('loading');

    setTimeout(async () => {
      try {
        const result = await messageService.translateMessage(message.id, locale);
        setTranslatedText(result.translatedMessage || result.translatedText);
        setTranslationState('done');
        setIsOriginalVisible(false);
      } catch (error) {
        console.error('Translation failed:', error);
        setTranslationState('none');
      }
    }, 500);
  }, [message.id, locale]);

  useEffect(() => {
    setIsOriginalVisible(false);

    if (!autoTranslateEnabled) {
      if (manualTranslatedText) {
        setTranslatedText(manualTranslatedText);
        setTranslationState('done');
      } else {
        setTranslatedText('');
        setTranslationState('none');
      }
      return;
    }

    // 자동 번역 활성화 상태
    const cachedTranslation = getTranslationText(message.translations?.[locale]);

    if (cachedTranslation) {
      setTranslatedText(cachedTranslation);
      setTranslationState('done');
    } else {
      setTranslatedText('');
      setTranslationState('none');

      // 자동 번역: message.language 체크 제거 (항상 번역 시도)
      // 내 메시지가 아니면 자동 번역 시도
      requestAutoTranslation();
    }
  }, [
    autoTranslateEnabled,
    locale,
    manualTranslatedText,
    message.id,
    message.translations,
    requestAutoTranslation,
  ]);

  const handleManualTranslate = useCallback(
    async (event) => {
      event?.stopPropagation?.();
      if (!manualTranslateCallback) return;
      setTranslationState('loading');
      try {
        const result = await manualTranslateCallback(message);
        if (result?.translatedMessage) {
          setTranslatedText(result.translatedMessage);
          setTranslationState('done');
        } else {
          setTranslationState('none');
        }
      } catch (error) {
        console.error('Manual translation failed:', error);
        setTranslationState('none');
        throw error;
      }
    },
    [manualTranslateCallback, message],
  );

  const toggleOriginalVisibility = useCallback((event) => {
    event?.stopPropagation?.();
    setIsOriginalVisible((prev) => !prev);
  }, []);

  return {
    translationState,
    translatedText,
    shouldShowTranslation: Boolean(translatedText) && translationState === 'done',
    isOriginalVisible,
    toggleOriginalVisibility,
    handleManualTranslate,
  };
};

export default useMessageTranslation;
