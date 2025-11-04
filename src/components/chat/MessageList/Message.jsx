import { useState } from 'react';

export const Message = ({ message, user, onStartThread, onOpenUserProfile, onOpenContextMenu }) => {
  const hasThread = message.threadId;
  const replyCount = hasThread ? 2 : 0; // TODO: Get actual count
  const [showTranslation, setShowTranslation] = useState(false);
  const [translatedText, setTranslatedText] = useState(null);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);

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
        <p className="message__text">{message.text}</p>

        {showTranslation && (
          <div className="message-translation">
            {translatedText ? (
              <>
                <p>{translatedText}</p>
                <button>더 자연스럽게 번역 (AI)</button>
              </>
            ) : (
              <p className="loading-text">번역 중...</p>
            )}
          </div>
        )}

        {showAnalysis && (
          <div className="message-analysis">
            {analysisResult ? (
              <p>
                <strong>AI 분석:</strong> {analysisResult}
              </p>
            ) : (
              <p className="loading-text">분석 중...</p>
            )}
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
