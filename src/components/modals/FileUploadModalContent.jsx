'use client';

import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useMessages } from 'next-intl';
import { FileText, X } from '@/components/common/icons';
import { fileService } from '@/core/api/services';
import styles from './FileUploadModalContent.module.css';

export const FileUploadModalContent = ({ 
  onClose, 
  onUpload, 
  channelId, 
  workspaceUserId 
}) => {
  const messages = useMessages();
  const t = messages?.modals?.fileUpload;

  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});

  const onDrop = (acceptedFiles) => {
    const newFiles = acceptedFiles.map((file) => ({
      id: `${Date.now()}-${Math.random()}`,
      file,
      name: file.name,
      size: formatFileSize(file.size),
      rawSize: file.size,
      type: file.type
    }));
    setFiles((prev) => [...prev, ...newFiles]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
    maxSize: 10485760, // 10MB
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

  const handleUpload = async () => {
    if (files.length === 0 || !channelId || !workspaceUserId) {
      console.error('Missing required parameters:', { channelId, workspaceUserId });
      return;
    }

    setUploading(true);

    try {
      const uploadedMessages = [];

      for (const fileItem of files) {
        const fileId = fileItem.id;
        
        try {
          // 파일 업로드 (Presigned URL 방식)
          const result = await fileService.uploadFile(
            fileItem.file,
            channelId,
            workspaceUserId,
            (progressData) => {
              setUploadProgress(prev => ({
                ...prev,
                [fileId]: progressData.progress
              }));
            }
          );

          uploadedMessages.push(result);
          console.log('File uploaded successfully:', result);

          // DOCUMENT 타입인 경우 자동으로 분석 트리거
          if (result.type === 'DOCUMENT' && result.messageId) {
            try {
              await fileService.analyzeDocument(result.messageId);
              console.log('Document analysis triggered for messageId:', result.messageId);
            } catch (analysisError) {
              console.warn('Failed to trigger document analysis:', analysisError);
              // 분석 실패해도 업로드는 성공으로 처리
            }
          }

        } catch (error) {
          console.error(`Failed to upload ${fileItem.name}:`, error);
          // 개별 파일 업로드 실패 시 계속 진행
        }
      }

      // 업로드 완료 콜백 호출
      if (onUpload) {
        onUpload(uploadedMessages);
      }

      // 모달 닫기
      onClose?.();
    } catch (error) {
      console.error('Upload process failed:', error);
    } finally {
      setUploading(false);
      setUploadProgress({});
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
                <span className={styles.fileSize}>
                  {file.size}
                  {uploadProgress[file.id] !== undefined && 
                    ` - ${uploadProgress[file.id]}%`}
                </span>
              </div>
              {!uploading && (
                <button
                  onClick={() => removeFile(file.id)}
                  className={styles.removeButton}
                  type="button"
                  disabled={uploading}
                >
                  <X size={16} />
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      <div className={styles.actions}>
        <button
          onClick={onClose}
          className={styles.cancelButton}
          type="button"
          disabled={uploading}
        >
          {t?.cancel || 'Cancel'}
        </button>
        <button
          onClick={handleUpload}
          className={styles.uploadButton}
          disabled={files.length === 0 || uploading}
          type="button"
        >
          {uploading 
            ? (t?.uploading || 'Uploading...') 
            : (t?.upload || 'Upload')
          } {files.length > 0 && !uploading && `(${files.length})`}
        </button>
      </div>
    </div>
  );
};
