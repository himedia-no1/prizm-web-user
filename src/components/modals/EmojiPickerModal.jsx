'use client';

import EmojiPicker from 'emoji-picker-react';

const EmojiPickerModal = ({ onEmojiSelect, onClose }) => {
    return (
        <div className="emoji-picker-modal-overlay" onClick={onClose}>
            <div className="emoji-picker-modal" onClick={(e) => e.stopPropagation()}>
                <EmojiPicker onEmojiClick={onEmojiSelect} />
            </div>
        </div>
    );
};

export default EmojiPickerModal;
