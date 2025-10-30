import { Hash, Users, Search, Bookmark, MessageSquare, Folder, Info } from '@/components/common/icons';
import './ChatHeader.module.css';

export const ChatHeader = ({ channel, onOpenModal, onOpenUserProfile }) => {
  if (!channel) return null;

  const isDirectMessage = channel.name?.startsWith('dm-');

  return (
    <header className="chat-header">
      <div>
        <h2 className="chat-header__title">
          {isDirectMessage ? <Users size={20} /> : <Hash size={20} />}
          <span>{channel.name || 'Unknown Channel'}</span>
        </h2>
        <p className="chat-header__topic">3 members | Topic: General discussion</p>
      </div>

      <div className="chat-header__actions">
        <button onClick={() => onOpenModal('search')}>
          <Search size={20} />
        </button>
        <button onClick={() => onOpenModal('members')}>
          <Users size={20} />
        </button>
        <button onClick={() => onOpenModal('pinned')}>
          <Bookmark size={20} />
        </button>
        <button onClick={() => onOpenModal('threads')}>
          <MessageSquare size={20} />
        </button>
        <button onClick={() => onOpenModal('channelFiles')}>
          <Folder size={20} />
        </button>
        <button onClick={() => onOpenModal('info')}>
          <Info size={20} />
        </button>
      </div>
    </header>
  );
};
