'use client';

import { useState } from 'react';
import { useMessages } from 'next-intl';
import { X, AlertTriangle } from '@/components/common/icons';
import styles from './LeaveWorkspaceModal.module.css';

export const LeaveWorkspaceModal = ({ isOpen, onClose, onConfirm, workspaceName }) => {
  const messages = useMessages();
  const t = messages?.modals?.leaveWorkspace;
  const [isLeaving, setIsLeaving] = useState(false);

  if (!isOpen) return null;

  const handleConfirm = async () => {
    setIsLeaving(true);
    try {
      await onConfirm();
    } finally {
      setIsLeaving(false);
    }
  };

  return (
    <div className="profile-modal-overlay" onClick={onClose}>
      <div className={`profile-modal ${styles.leaveModal}`} onClick={(e) => e.stopPropagation()}>
        <header className="profile-modal__header">
          <button onClick={onClose} className="profile-modal__close-button" disabled={isLeaving}>
            <X size={18} />
          </button>
        </header>

        <div className={styles.content}>
          <div className={styles.iconWrapper}>
            <AlertTriangle size={48} className={styles.warningIcon} />
          </div>

          <h3 className={styles.title}>{t?.title || '워크스페이스 탈퇴'}</h3>

          <p className={styles.description}>
            {t?.description || `정말 "${workspaceName}" 워크스페이스를 영구적으로 탈퇴하시겠습니까?`}
          </p>

          <div className={styles.warningBox}>
            <p className={styles.warningText}>
              {t?.warning || '이 작업은 되돌릴 수 없으며, 워크스페이스의 모든 메시지 및 파일에 대한 접근 권한을 잃게 됩니다.'}
            </p>
          </div>

          <div className={styles.actions}>
            <button
              className={styles.cancelButton}
              onClick={onClose}
              disabled={isLeaving}
            >
              {t?.cancelButton || '취소'}
            </button>
            <button
              className={styles.confirmButton}
              onClick={handleConfirm}
              disabled={isLeaving}
            >
              {isLeaving ? (t?.leaving || '탈퇴 중...') : (t?.confirmButton || '영구 탈퇴')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
