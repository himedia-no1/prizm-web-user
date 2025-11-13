'use client';

import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useMessages } from 'next-intl';
import { FileText, X } from '@/components/common/icons';
import styles from './FileUploadModalContent.module.css';

export const FileUploadModalContent = ({ onClose, onUpload }) => {
  const messages = useMessages();
  const t = messages?.modals?.fileUpload;

  const [files, setFiles] = useState([]);

  const onDrop = (acceptedFiles) => {
    const newFiles = acceptedFiles.map((file) => ({
      id: `${Date.now()}-${Math.random()}`,
      file,
      name: file.name,
      size: formatFileSize(file.size),
      type: file.type
    }));
    setFiles((prev) => [...prev, ...newFiles]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true
  });

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const removeFile = (fileId) => {
    setFiles((prev) => prev.filter((f) => f.id !== fileId));
  };

  const handleUpload = () => {
    if (files.length > 0) {
      onUpload?.(files);
      onClose?.();
    }
  };

  return (
    <div className={styles.container}>
      <div
        {...getRootProps()}
        className={`${styles.dropzone} ${isDragActive ? styles.dropzoneActive : ''}`}
      >
        <input {...getInputProps()} />
        <FileText size={48} className={styles.dropzoneIcon} />
        {isDragActive ? (
          <p className={styles.dropzoneText}>
            {t?.dropHereText || 'Drop files here...'}
          </p>
        ) : (
          <>
            <p className={styles.dropzoneText}>
              {t?.dragDropText || 'Drag & drop files here, or click to select'}
            </p>
            <p className={styles.dropzoneHint}>
              {t?.supportedFormats || 'All file types supported'}
            </p>
          </>
        )}
      </div>

      {files.length > 0 && (
        <div className={styles.fileList}>
          <h4 className={styles.fileListTitle}>
            {t?.selectedFiles || 'Selected Files'} ({files.length})
          </h4>
          {files.map((file) => (
            <div key={file.id} className={styles.fileItem}>
              <FileText size={20} className={styles.fileIcon} />
              <div className={styles.fileInfo}>
                <span className={styles.fileName}>{file.name}</span>
                <span className={styles.fileSize}>{file.size}</span>
              </div>
              <button
                onClick={() => removeFile(file.id)}
                className={styles.removeButton}
                type="button"
              >
                <X size={16} />
              </button>
            </div>
          ))}
        </div>
      )}

      <div className={styles.actions}>
        <button
          onClick={onClose}
          className={styles.cancelButton}
          type="button"
        >
          {t?.cancel || 'Cancel'}
        </button>
        <button
          onClick={handleUpload}
          className={styles.uploadButton}
          disabled={files.length === 0}
          type="button"
        >
          {t?.upload || 'Upload'} {files.length > 0 && `(${files.length})`}
        </button>
      </div>
    </div>
  );
};
