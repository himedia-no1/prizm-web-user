'use client';

import React from 'react';
import useStrings from '@/hooks/useStrings';

export const FileUploadModalContent = (props) => {
    const s = useStrings();

    return (
        <div className="file-upload-modal">
            <div className="file-upload-dropzone">
                <p>{s.modals.genericModal.fileUploadPrompt}</p>
                <input type="file" multiple style={{ display: 'none' }} />
                <button
                    className="profile-modal__save-button"
                    style={{ marginTop: '1rem', width: 'auto', padding: '0.5rem 1rem' }}
                >
                    {s.modals.genericModal.selectFileButton}
                </button>
            </div>
            <button className="profile-modal__save-button">{s.modals.genericModal.uploadButton}</button>
        </div>
    );
};