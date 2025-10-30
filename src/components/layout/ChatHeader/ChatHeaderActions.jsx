'use client';

import { Search, Users, Bookmark, MessageSquare, Folder, Info } from '@/components/common/icons';
import useStore from '@/store/useStore';

export const ChatHeaderActions = () => {
    const { openModal } = useStore();

    return (
        <div className="chat-header__actions">
            <button onClick={() => openModal('generic', { type: 'search' })}>
                <Search size={20} />
            </button>
            <button onClick={() => openModal('generic', { type: 'members' })}>
                <Users size={20} />
            </button>
            <button onClick={() => openModal('generic', { type: 'pinned' })}>
                <Bookmark size={20} />
            </button>
            <button onClick={() => openModal('generic', { type: 'threads' })}>
                <MessageSquare size={20} />
            </button>
            <button onClick={() => openModal('generic', { type: 'channelFiles' })}>
                <Folder size={20} />
            </button>
            <button onClick={() => openModal('generic', { type: 'info' })}>
                <Info size={20} />
            </button>
        </div>
    );
};
