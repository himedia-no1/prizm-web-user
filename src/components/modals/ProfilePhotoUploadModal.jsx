'use client';

import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useMessages } from 'next-intl';
import { Image as ImageIcon, X } from '@/components/common/icons';
import Image from 'next/image';
import styles from './ProfilePhotoUploadModal.module.css';

export const ProfilePhotoUploadModal = ({ isOpen, onClose, onUpload, currentAvatar }) => {
  const messages = useMessages();
  const t = messages?.modals?.profilePhotoUpload;

  const [preview, setPreview] = useState(currentAvatar || null);
  const [selectedFile, setSelectedFile] = useState(null);

  const onDrop = (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setSelectedFile(file);

      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp']
    }
  });

  const handleRemove = () => {
    setPreview(currentAvatar);
    setSelectedFile(null);
  };

  const handleUpload = () => {
    if (selectedFile) {
      onUpload?.(selectedFile);
      onClose?.();
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <header className={styles.header}>
          <h3>{t?.title || 'Change Profile Photo'}</h3>
          <button onClick={onClose} className={styles.closeButton}>
            <X size={18} />
          </button>
        </header>

        <div className={styles.content}>
          {preview && selectedFile ? (
            <div className={styles.previewContainer}>
              <div className={styles.previewImageWrapper}>
                <Image
                  src={preview}
                  alt="Profile preview"
                  width={200}
                  height={200}
                  className={styles.previewImage}
                />
                <button
                  onClick={handleRemove}
                  className={styles.removeButton}
                  type="button"
                  aria-label="Remove image"
                >
                  <X size={20} />
                </button>
              </div>
              <p className={styles.previewText}>
                {t?.previewText || 'Preview'}
              </p>
            </div>
          ) : (
            <div
              {...getRootProps()}
              className={`${styles.dropzone} ${isDragActive ? styles.dropzoneActive : ''}`}
            >
              <input {...getInputProps()} />
              <ImageIcon size={48} className={styles.dropzoneIcon} />
              {isDragActive ? (
                <p className={styles.dropzoneText}>
                  {t?.dropHereText || 'Drop your photo here...'}
                </p>
              ) : (
                <>
                  <p className={styles.dropzoneText}>
                    {t?.dragDropText || 'Drag & drop your photo here'}
                  </p>
                  <p className={styles.dropzoneHint}>
                    {t?.clickToSelect || 'or click to select from your computer'}
                  </p>
                  <p className={styles.dropzoneFormats}>
                    {t?.supportedFormats || 'Supported: PNG, JPG, GIF, WEBP'}
                  </p>
                </>
              )}
            </div>
          )}
        </div>

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
            disabled={!selectedFile}
            type="button"
          >
            {t?.upload || 'Upload'}
          </button>
        </div>
      </div>
    </div>
  );
};
