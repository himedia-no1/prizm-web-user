'use client';

import { useState, useEffect, useRef } from 'react';
import { useMessages } from 'next-intl';
import {
  Smile,
  CornerDownRight,
  MessageSquare,
  Bookmark,
  Send,
  Edit,
  Trash,
  Translate,
  MoreVertical,
  Copy
} from '@/components/common/icons';
import styles from './MessageContextMenu.module.css';

export const MessageContextMenu = ({
  message,
  isMyMessage,
  position,
  onClose,
  onPin,
  onStartThread,
  onReply,
  onForward,
  onShare,
  onEdit,
  onDelete,
  onReactEmoji,
  onTranslate,
  onAnalyze,
  onReport,
  context = 'main',
}) => {
  const menuRef = useRef(null);
  const [showFullMenu, setShowFullMenu] = useState(false);
  const messages = useMessages();
  const t = messages.message?.actions;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const isThread = context === 'thread';

  if (!position || !t) {
    return null;
  }

  const threadActions = [
    {
      key: 'copy',
      icon: <Copy size={18} />,
      handler: () => {
        navigator.clipboard.writeText(message.text);
        onClose();
      }
    },
    {
      key: 'react',
      icon: <Smile size={18} />,
      handler: () => {
        onReactEmoji(message);
        onClose();
      }
    },
    {
      key: 'translate',
      icon: <Translate size={18} />,
      handler: () => {
        onTranslate(message);
        onClose();
      }
    }
  ];

  const mainChatActions = [
    {
      key: 'copy',
      icon: <Copy size={18} />,
      handler: () => {
        navigator.clipboard.writeText(message.text);
        onClose();
      }
    },
    {
      key: 'react',
      icon: <Smile size={18} />,
      handler: () => {
        onReactEmoji(message);
        onClose();
      }
    },
    {
      key: 'reply',
      icon: <CornerDownRight size={18} />,
      handler: () => {
        onReply(message);
        onClose();
      }
    },
    {
      key: 'thread',
      icon: <MessageSquare size={18} />,
      handler: () => {
        onStartThread(message);
        onClose();
      }
    },
  ];

  const commonActions = isThread ? threadActions : mainChatActions;

  const fullMenuActions = isMyMessage
    ? [
        { key: 'pin', icon: <Bookmark size={16} />, text: t.pin, handler: () => { onPin(message); onClose(); } },
        { key: 'startThread', icon: <MessageSquare size={16} />, text: t.startThread, handler: () => { onStartThread(message); onClose(); } },
        { key: 'reply', icon: <CornerDownRight size={16} />, text: t.reply, handler: () => { onReply(message); onClose(); } },
        { key: 'forward', icon: <Send size={16} />, text: t.forward, handler: () => { onForward(message); onClose(); } },
        { divider: true },
        { key: 'edit', icon: <Edit size={16} />, text: t.edit, handler: () => { onEdit(message); onClose(); } },
        { key: 'delete', icon: <Trash size={16} />, text: t.delete, danger: true, handler: () => { onDelete(message); onClose(); } },
      ]
    : [
        { key: 'pin', icon: <Bookmark size={16} />, text: t.pin, handler: () => { onPin(message); onClose(); } },
        { key: 'startThread', icon: <MessageSquare size={16} />, text: t.startThread, handler: () => { onStartThread(message); onClose(); } },
        { key: 'reply', icon: <CornerDownRight size={16} />, text: t.reply, handler: () => { onReply(message); onClose(); } },
        { key: 'forward', icon: <Send size={16} />, text: t.forward, handler: () => { onForward(message); onClose(); } },
        { divider: true },
        { key: 'translate', icon: <Translate size={16} />, text: t.translate, handler: () => { onTranslate(message); onClose(); } },
      ];

  return (
    <div
      ref={menuRef}
      className={`message-context-menu ${showFullMenu ? 'full' : 'action-bar'} ${styles.menu}`}
      style={{ '--top': `${position.y}px`, '--left': `${position.x}px` }}
      onClick={(e) => e.stopPropagation()}
    >
      {!showFullMenu ? (
        <div className="message-action-bar">
          {commonActions.map(action => (
            <button key={action.key} onClick={action.handler}>
              {action.icon}
            </button>
          ))}
          {!isMyMessage && !isThread && (
            <button
              onClick={() => {
                onTranslate(message);
                onClose();
              }}
            >
              <Translate size={18} />
            </button>
          )}
          {!isThread && <button onClick={() => setShowFullMenu(true)} className="more-button">
            <MoreVertical size={18} />
          </button>}
        </div>
      ) : (
        <>
          {fullMenuActions.map((action, index) =>
            action.divider ? (
              <div key={`divider-${index}`} className="context-menu-divider"></div>
            ) : (
              <button
                key={action.key}
                onClick={action.handler}
                className={action.danger ? 'danger' : ''}
              >
                {action.icon}
                <span>{action.text}</span>
              </button>
            )
          )}
        </>
      )}
    </div>
  );
};
