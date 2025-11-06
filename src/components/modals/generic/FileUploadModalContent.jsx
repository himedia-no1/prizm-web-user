'use client';

import React from 'react';
import useStrings from '@/hooks/useStrings';
import styles from './FileUploadModalContent.module.css';

export const FileUploadModalContent = (props) => {
    const s = useStrings();

    return (
        <div className="file-upload-modal">
            <div className="file-upload-dropzone">
                <p>{s.modals.genericModal.fileUploadPrompt}</p>
                <input type="file" multiple className={styles.hidden} />
                <button
                    className={`profile-modal__save-button ${styles.button}`}
                >
                    {s.modals.genericModal.selectFileButton}
                </button>
            </div>
            <button className="profile-modal__save-button">{s.modals.genericModal.uploadButton}</button>
        </div>
    );
};