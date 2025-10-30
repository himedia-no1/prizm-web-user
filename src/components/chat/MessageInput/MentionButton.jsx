'use client';

import { AtSign } from '@/components/common/icons';
import useStore from '@/store/useStore';

export const MentionButton = () => {
    const { openModal } = useStore();

    return (
        <button
            onClick={() => openModal('generic', { type: 'mention' })}
            className="message-input__mention-button"
        >
            <AtSign size={20} />
        </button>
    );
};
