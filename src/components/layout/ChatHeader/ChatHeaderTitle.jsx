'use client';

import useStrings from '@/hooks/useStrings';
import { Hash, Users } from '@/components/common/icons';

export const ChatHeaderTitle = ({ channel }) => {
    const s = useStrings();
    const isDirectMessage = channel.name?.startsWith('dm-');

    return (
        <div>
            <h2 className="chat-header__title">
                {isDirectMessage ? <Users size={20} /> : <Hash size={20} />}
                <span>{channel.name || s.chatUnknownChannel}</span>
            </h2>
            <p className="chat-header__topic">{s.chatTopicSummary}</p>
        </div>
    );
};
