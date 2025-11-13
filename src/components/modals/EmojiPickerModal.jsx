'use client';

import EmojiPicker from 'emoji-picker-react';
import { X } from '@/components/common/icons';
import styles from './EmojiPickerModal.module.css';

const EmojiPickerModal = ({ onEmojiSelect, onClose }) => {
    const handleEmojiClick = (emojiData) => {
        onEmojiSelect?.(emojiData);
        onClose?.();
    };

    return (
        <div className="profile-modal-overlay" onClick={onClose}>
            <div className={`profile-modal ${styles.emojiModal}`} onClick={(e) => e.stopPropagation()}>
                <header className="profile-modal__header">
                    <h3>이모지 선택</h3>
                    <button onClick={onClose} className="profile-modal__close-button">
                        <X size={18} />
                    </button>
                </header>
                <div className={styles.pickerWrapper}>
                    <EmojiPicker
                        onEmojiClick={handleEmojiClick}
                        width="100%"
                        height="400px"
                    />
                </div>
            </div>
        </div>
    );
};

export default EmojiPickerModal;
