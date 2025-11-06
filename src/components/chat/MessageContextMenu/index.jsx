'use client';

import { useState, useEffect, useRef } from 'react';
import {
  Smile,
  CornerDownRight,
  MessageSquare,
  Bookmark,
  Send,
  Share,
  Edit,
  Trash,
  Translate,
  AlertTriangle,
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
  onReport
}) => {
  const menuRef = useRef(null);
  const [showFullMenu, setShowFullMenu] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  if (!position) {
    return null;
  }

  const commonActions = [
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

  const fullMenuActions = isMyMessage
    ? [
        { key: 'pin', icon: <Bookmark size={16} />, text: '고정하기', handler: () => { onPin(message); onClose(); } },
        { key: 'threadFull', icon: <MessageSquare size={16} />, text: '스레드 시작', handler: () => { onStartThread(message); onClose(); } },
        { key: 'replyFull', icon: <CornerDownRight size={16} />, text: '답글달기', handler: () => { onReply(message); onClose(); } },
        { key: 'forward', icon: <Send size={16} />, text: '전달하기', handler: () => { onForward(message); onClose(); } },
        { divider: true },
        { key: 'edit', icon: <Edit size={16} />, text: '수정', handler: () => { onEdit(message); onClose(); } },
        { key: 'delete', icon: <Trash size={16} />, text: '삭제', danger: true, handler: () => { onDelete(message); onClose(); } },
      ]
    : [
        { key: 'pin', icon: <Bookmark size={16} />, text: '고정하기', handler: () => { onPin(message); onClose(); } },
        { key: 'threadFull', icon: <MessageSquare size={16} />, text: '스레드 시작', handler: () => { onStartThread(message); onClose(); } },
        { key: 'replyFull', icon: <CornerDownRight size={16} />, text: '답글달기', handler: () => { onReply(message); onClose(); } },
        { key: 'forward', icon: <Send size={16} />, text: '전달하기', handler: () => { onForward(message); onClose(); } },
        { divider: true },
        { key: 'translate', icon: <Translate size={16} />, text: '번역하기', handler: () => { onTranslate(message); onClose(); } },
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
          {!isMyMessage && (
            <button
              onClick={() => {
                onTranslate(message);
                onClose();
              }}
            >
              <Translate size={18} />
            </button>
          )}
          <button onClick={() => setShowFullMenu(true)} className="more-button">
            <MoreVertical size={18} />
          </button>
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
