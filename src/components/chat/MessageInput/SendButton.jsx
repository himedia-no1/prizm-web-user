'use client';

import { Send } from '@/components/common/icons';

export const SendButton = ({ message }) => {
    return (
        <button className="message-input__send-button" disabled={!message.trim()}>
            <Send size={20} />
        </button>
    );
};
