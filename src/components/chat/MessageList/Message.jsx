import { useState, useEffect, useCallback } from 'react';
import useStore from '@/store/useStore';
import testApi from '@/api/test.api';
import { strings } from '@/constants/strings';
import './Message.css';

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
  const { language, autoTranslateEnabled } = useStore();
  const localeStrings = strings[language] ?? strings.en;
  const messageStrings = localeStrings.message;
  
  const [translationState, setTranslationState] = useState('none'); // 'none' | 'loading' | 'done'
  const [translatedText, setTranslatedText] = useState('');
  const [isOriginalVisible, setIsOriginalVisible] = useState(false);

  const handleAutoTranslate = useCallback(async () => {
    setTranslationState('loading');
    
    // 실제로는 서버에서 WebSocket으로 번역 완료 이벤트를 받지만,
    // 테스트 환경에서는 API로 직접 호출
    setTimeout(async () => {
      try {
        const result = await testApi.translateMessage(message.id, language);
        setTranslatedText(result.translatedText);
        setTranslationState('done');
        setIsOriginalVisible(false);
      } catch (error) {
        console.error('Translation failed:', error);
        setTranslationState('none');
      }
    }, 500); // 번역 중 상태를 보여주기 위한 지연
  }, [message.id, language]);

  useEffect(() => {
    setIsOriginalVisible(false);
    const cachedTranslation = getTranslationText(message.translations?.[language]);

    if (cachedTranslation) {
      setTranslatedText(cachedTranslation);
      setTranslationState('done');
    } else {
      setTranslatedText('');
      setTranslationState('none');
    }
  }, [message.id, language, message.translations]);

  useEffect(() => {
    // 자동 번역이 활성화되어 있고, 메시지 언어가 사용자 언어와 다를 때만 번역
    const shouldTranslate = 
      autoTranslateEnabled && 
      message.language && 
      message.language !== language &&
      translationState === 'none';
    
    if (shouldTranslate) {
      handleAutoTranslate();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message.id, message.language, language, autoTranslateEnabled]);

  const shouldTranslate =
    autoTranslateEnabled &&
    message.language &&
    message.language !== language;

  const hasTranslatedResult = translationState === 'done' && translatedText;
  const showTranslationAsPrimary = shouldTranslate && hasTranslatedResult;
  const primaryText = showTranslationAsPrimary ? translatedText : message.text;

  const handleClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const rect = event.currentTarget.getBoundingClientRect();
    onOpenContextMenu(message, { x: rect.left, y: rect.top - 40 });
  };

  return (
    <div className="message-container" onClick={handleClick}>
      <img
        src={user.avatar}
        alt={user.name}
        className="message__avatar"
        onClick={(e) => {
          e.stopPropagation();
          onOpenUserProfile(user.id);
        }}
        style={{ cursor: 'pointer' }}
      />
      <div className="message__content">
        <div className="message__header">
          <span
            className="message__username"
            onClick={(e) => {
              e.stopPropagation();
              onOpenUserProfile(user.id);
            }}
            style={{ cursor: 'pointer' }}
          >
            {user.name}
          </span>
          <span className="message__timestamp">{message.timestamp}</span>
        </div>
        <p className={`message__text${showTranslationAsPrimary ? ' message__text--translated' : ''}`}>
          {primaryText}
        </p>

        {showTranslationAsPrimary && (
          <div className="message__translation-meta">
            <span>{messageStrings.translationNotice ?? 'Translated automatically.'}</span>
            <button
              type="button"
              className="message__translation-toggle"
              onClick={(event) => {
                event.stopPropagation();
                setIsOriginalVisible((prev) => !prev);
              }}
            >
              {isOriginalVisible
                ? (messageStrings.hideOriginal ?? 'Hide original')
                : (messageStrings.showOriginal ?? 'View original')}
            </button>
          </div>
        )}

        {showTranslationAsPrimary && isOriginalVisible && (
          <div className="message__original">
            <span>{message.text}</span>
          </div>
        )}

        {!showTranslationAsPrimary && shouldTranslate && translationState === 'loading' && (
          <div className="message__translation">
            <span className="message__translation-loading">
              {messageStrings.translating ?? 'Translating...'}
            </span>
          </div>
        )}

        {Object.keys(message.reactions || {}).length > 0 && (
          <div className="message__reactions">
            {Object.entries(message.reactions).map(([emoji, count]) => (
              <button key={emoji} className="reaction-button">
                <span>{emoji}</span>
                <span className="reaction-button__count">{count}</span>
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
            className="message__thread-reply"
          >
            {replyCount} {replyCount > 1 ? 'replies' : 'reply'}
          </button>
        )}
      </div>
    </div>
  );
};
