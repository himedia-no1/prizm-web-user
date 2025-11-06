import { Message } from '@/components/chat/MessageList/Message';
import styles from './MessageList.module.css';

export const MessageList = ({ messages, users, onStartThread, onOpenUserProfile, onOpenContextMenu }) => {
  return (
    <div className={styles.messageList}>
      {messages.map(msg => (
        <Message
          key={msg.id}
          message={msg}
          user={users[msg.userId]}
          onStartThread={onStartThread}
          onOpenUserProfile={onOpenUserProfile}
          onOpenContextMenu={onOpenContextMenu}
        />
      ))}
    </div>
  );
};
