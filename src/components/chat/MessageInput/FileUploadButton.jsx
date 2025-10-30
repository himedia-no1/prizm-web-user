'use client';

import { Paperclip } from '@/components/common/icons';
import useStore from '@/store/useStore';

export const FileUploadButton = () => {
    const { openModal } = useStore();

    return (
        <button
            className="message-input__attach-button"
            onClick={() => openModal('generic', { type: 'fileUpload' })}
        >
            <Paperclip size={22} />
        </button>
    );
};
