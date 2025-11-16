'use client';

import Image from 'next/image';
import { Copy, Smile, CornerDownRight, MoreVertical } from '@/components/common/icons';
import styles from './Message.module.css';

export const InlineActions = ({
  isVisible,
  position,
  onCopy,
  onEmoji,
  onReply,
  onTranslate,
  onMore,
  showTranslateButton,
}) => (
  <div
    className={`${styles.inlineActions} ${isVisible ? styles.inlineActionsVisible : ''}`}
    style={
      position
        ? {
            top: position.top,
            right: position.right,
          }
        : undefined
    }
  >
    <button type="button" className={styles.inlineActionButton} onClick={onCopy} aria-label="Copy message">
      <Copy size={16} />
    </button>
    <button
      type="button"
      className={styles.inlineActionButton}
      onClick={onEmoji}
      aria-label="React with emoji"
    >
      <Smile size={16} />
    </button>
    <button type="button" className={styles.inlineActionButton} onClick={onReply} aria-label="Reply">
      <CornerDownRight size={16} />
    </button>
    {showTranslateButton && (
      <button
        type="button"
        className={styles.inlineActionButton}
        onClick={onTranslate}
        aria-label="Translate message"
      >
        <Image src="/icon.png" alt="Translate" width={16} height={16} />
      </button>
    )}
    <button type="button" className={styles.inlineActionButton} onClick={onMore} aria-label="More actions">
      <MoreVertical size={16} />
    </button>
  </div>
);

export default InlineActions;
