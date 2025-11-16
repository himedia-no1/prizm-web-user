'use client';

import styles from './Message.module.css';

export const ReplyPreview = ({ replyToMessage, replyToUser, onReplyClick }) => {
  if (!replyToMessage || !replyToUser) {
    return null;
  }

  return (
    <div
      className={styles.replyPreview}
      onClick={(event) => {
        event.stopPropagation();
        onReplyClick?.(replyToMessage.id);
      }}
    >
      <div className={styles.replyLine} />
      <div className={styles.replyContent}>
        <span className={styles.replyUsername}>{replyToUser.name}</span>
        <span className={styles.replyText}>
          {replyToMessage.text?.substring(0, 50)}
          {replyToMessage.text?.length > 50 ? '...' : ''}
        </span>
      </div>
    </div>
  );
};

export default ReplyPreview;
