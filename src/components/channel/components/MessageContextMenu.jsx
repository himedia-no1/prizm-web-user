'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useMessages, useLocale } from 'next-intl';
import { useUIStore } from '@/core/store/shared';
import {
  Smile,
  CornerDownRight,
  MessageSquare,
  Pin,
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
  defaultFullMenu = false,
}) => {
  const menuRef = useRef(null);
  const [showFullMenu, setShowFullMenu] = useState(defaultFullMenu);
  const [adjustedPosition, setAdjustedPosition] = useState(position);
  const messages = useMessages();
  const t = messages.message?.actions ?? {};
  const { autoTranslateEnabled } = useUIStore();
  const locale = useLocale();

  // 번역 버튼 표시 조건: 자동번역이 꺼져있고 + 메시지 언어가 사용자 언어와 다를 때
  const shouldShowTranslateButton = !autoTranslateEnabled && !isMyMessage;
  const translateIcon = shouldShowTranslateButton ? (
    <Image src="/icon.png" alt="Translate" width={18} height={18} />
  ) : null;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  // 화면 경계를 벗어나지 않도록 위치 조정
  useEffect(() => {
    if (!menuRef.current || !position) return;

    const menu = menuRef.current;
    const menuRect = menu.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    let { x, y } = position;

    // 오른쪽 경계 체크
    if (x + menuRect.width > viewportWidth) {
      x = viewportWidth - menuRect.width - 10;
    }

    // 왼쪽 경계 체크
    if (x < 10) {
      x = 10;
    }

    // 하단 경계 체크
    if (y + menuRect.height > viewportHeight) {
      y = y - menuRect.height - 10;
    }

    // 상단 경계 체크
    if (y < 10) {
      y = 10;
    }

    setAdjustedPosition({ x, y });
  }, [position, showFullMenu]);

  useEffect(() => {
    setShowFullMenu(defaultFullMenu);
  }, [defaultFullMenu]);

  const isThread = context === 'thread';

  if (!position) {
    return null;
  }

  // 스레드 컨텍스트 액션바: 복사/이모지/(번역)
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
    ...(shouldShowTranslateButton
      ? [
          {
            key: 'translate',
            icon: translateIcon,
            handler: () => {
              onTranslate(message);
              onClose();
            }
          }
        ]
      : []),
  ];

  // 메인 채팅 액션바: 복사/이모지/답글/(번역)/더보기
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
    ...(shouldShowTranslateButton
      ? [
          {
            key: 'translate',
            icon: translateIcon,
            handler: () => {
              onTranslate(message);
              onClose();
            }
          }
        ]
      : []),
  ];

  const commonActions = isThread ? threadActions : mainChatActions;

  const baseFullMenuActions = [
    {
      key: 'copyFull',
      icon: <Copy size={16} />,
      text: t?.copy || 'Copy',
      handler: () => {
        if (message?.text && typeof navigator !== 'undefined') {
          navigator.clipboard.writeText(message.text);
        }
        onClose();
      },
    },
    {
      key: 'reactFull',
      icon: <Smile size={16} />,
      text: t?.react || 'Add reaction',
      handler: () => {
        onReactEmoji(message);
        onClose();
      },
    },
    ...(!isThread
      ? [
          {
            key: 'replyFull',
            icon: <CornerDownRight size={16} />,
            text: t?.reply || 'Reply',
            handler: () => {
              onReply(message);
              onClose();
            },
          },
        ]
      : []),
    ...(shouldShowTranslateButton
      ? [
          {
            key: 'translateFull',
            icon: <Image src="/icon.png" alt="Translate" width={16} height={16} />,
            text: t?.translate || 'Translate',
            handler: () => {
              onTranslate(message);
              onClose();
            },
          },
        ]
      : []),
  ];

  const moderationActions = [
    {
      key: 'pin',
      icon: <Pin size={16} />,
      text: t?.pin || 'Pin',
      handler: () => {
        onPin(message);
        onClose();
      },
    },
    ...(!isThread
      ? [
          {
            key: 'startThread',
            icon: <MessageSquare size={16} />,
            text: t?.startThread || 'Open thread',
            handler: () => {
              onStartThread(message);
              onClose();
            },
          },
        ]
      : []),
    ...(isMyMessage
      ? [
          {
            key: 'edit',
            icon: <Edit size={16} />,
            text: t?.edit || 'Edit',
            handler: () => {
              onEdit(message);
              onClose();
            },
          },
          {
            key: 'delete',
            icon: <Trash size={16} />,
            text: t?.delete || 'Delete',
            danger: true,
            handler: () => {
              onDelete(message);
              onClose();
            },
          },
        ]
      : []),
  ];

  const fullMenuActions = [...baseFullMenuActions, ...moderationActions];

  return (
    <div
      ref={menuRef}
      className={`message-context-menu ${showFullMenu ? 'full' : 'action-bar'} ${styles.menu}`}
      style={{ '--top': `${adjustedPosition.y}px`, '--left': `${adjustedPosition.x}px` }}
      onClick={(e) => e.stopPropagation()}
    >
      {!showFullMenu ? (
        <div className="message-action-bar">
          {commonActions.map(action => (
            <button key={action.key} onClick={action.handler}>
              {action.icon}
            </button>
          ))}
          {!isThread && (
            <button onClick={() => setShowFullMenu(true)} className="more-button">
              <MoreVertical size={18} />
            </button>
          )}
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
