'use client';

import { Smile } from '@/components/common/icons';

export const EmojiButton = ({ onOpenEmojiPicker }) => {
    return (
        <button onClick={onOpenEmojiPicker}>
            <Smile size={20} />
        </button>
    );
};
