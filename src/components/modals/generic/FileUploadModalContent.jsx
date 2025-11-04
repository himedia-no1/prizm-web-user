'use client';

import useStrings from '@/hooks/useStrings';

export const FileUploadModalContent = () => {
    const s = useStrings();

    return (
        <div className="file-upload-modal">
            <div className="file-upload-dropzone">
                <p>{s.fileUploadDropText}</p>
                <input type="file" multiple style={{ display: 'none' }} />
                <button
                    className="profile-modal__save-button"
                    style={{ marginTop: '1rem', width: 'auto', padding: '0.5rem 1rem' }}
                >
                    {s.fileUploadSelectButton}
                </button>
            </div>
            <button className="profile-modal__save-button">{s.fileUploadSubmitButton}</button>
        </div>
    );
};
