import { Message } from './Message';
import './MessageList.module.css';

export const MessageList = ({ messages, users, onStartThread, onOpenUserProfile, onOpenContextMenu }) => {
  return (
    <div className="message-list">
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
