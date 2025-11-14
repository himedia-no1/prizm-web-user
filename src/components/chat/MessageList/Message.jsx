import { useState } from 'react';

export const Message = ({ message, user, onStartThread, onOpenUserProfile, onOpenContextMenu }) => {
  const hasThread = message.threadId;
  const replyCount = hasThread ? 2 : 0; // TODO: Get actual count

  const handleClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const rect = event.currentTarget.getBoundingClientRect();
    onOpenContextMenu(message, { x: rect.left, y: rect.top - 40 });
  };

  // Fallback for missing user
  const safeUser = user || { id: 'unknown', name: '알 수 없는 사용자', avatar: 'https://placehold.co/40x40/cccccc/FFFFFF?text=?' };

  return (
    <div className="message-container" onClick={handleClick}>
      <img
        src={safeUser.avatar}
        alt={safeUser.name}
        className="message__avatar"
        onClick={(e) => {
          e.stopPropagation();
          if (safeUser.id !== 'unknown') {
            onOpenUserProfile(safeUser.id);
          }
        }}
        style={{ cursor: safeUser.id !== 'unknown' ? 'pointer' : 'default' }}
      />
      <div className="message__content">
        <div className="message__header">
          <span
            className="message__username"
            onClick={(e) => {
              e.stopPropagation();
              if (safeUser.id !== 'unknown') {
                onOpenUserProfile(safeUser.id);
              }
            }}
            style={{ cursor: safeUser.id !== 'unknown' ? 'pointer' : 'default' }}
          >
            {safeUser.name}
          </span>
          <span className="message__timestamp">{message.timestamp}</span>
        </div>
        <p className="message__text">{message.text}</p>

        {message.translatedText && (
          <div className="message-translation">
            <p>{message.translatedText}</p>
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
