'use client';

import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useMessages } from 'next-intl';
import { FileText } from '@/components/common/icons';
import styles from './LearningControl.module.css';

export default function LearningControl() {
    const messages = useMessages();
    const ai = messages?.workspaceManagement?.ai?.learningControl;

    const [uploadQueue, setUploadQueue] = useState([]);
    const [learningStatus, setLearningStatus] = useState('idle');
    const [progress, setProgress] = useState(0);

    const onDrop = (acceptedFiles) => {
        const newFiles = acceptedFiles.map((file) => ({
            id: `file-${Date.now()}-${Math.random()}`,
            name: file.name,
            size: file.size,
            status: 'pending',
            file
        }));
        setUploadQueue((prev) => [...prev, ...newFiles]);
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'application/pdf': ['.pdf'],
            'application/msword': ['.doc'],
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
            'text/plain': ['.txt']
        },
        multiple: true
    });

    const handleRunLearning = async () => {
        setLearningStatus('processing');
        setProgress(0);

        // Simulate learning progress
        let currentProgress = 0;
        const interval = setInterval(() => {
            currentProgress += 10;
            setProgress(currentProgress);
            if (currentProgress >= 100) {
                clearInterval(interval);
                setLearningStatus('completed');

                // Move successful files from queue to completed state
                setUploadQueue((prev) =>
                    prev.map((file) => ({
                        ...file,
                        status: 'completed'
                    }))
                );
            }
        }, 500);
    };

    if (!ai) {
        return null;
    }

    return (
        <div className={styles.container}>
            <div
                {...getRootProps()}
                className={`${styles.dropzone} ${isDragActive ? styles.dropzoneActive : ''}`}
            >
                <input {...getInputProps()} />
                <FileText size={32} className={styles.dropzoneIcon} />
                {isDragActive ? (
                    <p className={styles.dropzoneText}>
                        {ai?.dropHereText || 'Drop files here...'}
                    </p>
                ) : (
                    <p className={styles.dropzoneText}>
                        {ai?.dragDropText || 'Drag & drop files here, or click to select'}
                    </p>
                )}
                <p className={styles.dropzoneHint}>
                    {ai?.supportedFormats || 'Supported formats: PDF, DOC, DOCX, TXT'}
                </p>
            </div>

            <div className={styles.controls}>
                <button
                    onClick={handleRunLearning}
                    className={styles.runButton}
                    disabled={learningStatus === 'processing' || uploadQueue.length === 0}
                >
                    {ai?.buttonRunLearning || 'Run AI Learning'}
                </button>
            </div>

            {uploadQueue.length > 0 && (
                <div className={styles.queue}>
                    <h4>{ai?.queueLabel || 'Upload Queue'}:</h4>
                    <ul className={styles.queueList}>
                        {uploadQueue.map((file) => (
                            <li key={file.id} className={styles.queueItem}>
                                <span className={styles.fileName}>{file.name}</span>
                                <span className={styles.fileStatus}>{file.status}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {learningStatus === 'processing' && (
                <div className={styles.status}>
                    <div className={styles.progressBarContainer}>
                        <div className={styles.progressBar} style={{ width: `${progress}%` }}></div>
                    </div>
                    <div className={styles.statusText}>{progress}%</div>
                </div>
            )}
        </div>
    );
}
