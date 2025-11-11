'use client';

import { useState } from 'react';
import { X, AlertTriangle } from 'lucide-react';
import useStrings from '@/shared/hooks/useStrings';
import { userService } from '@/core/api/services';
import styles from './AccountManagementModals.module.css';

export const DeactivateAccountModal = ({ isOpen, onClose, userId }) => {
  const s = useStrings();
  const [loading, setLoading] = useState(false);

  const handleDeactivate = async () => {
    setLoading(true);
    try {
      await userService.deactivateAccount(userId);
      onClose();
    } catch (error) {
      console.error('Failed to deactivate account:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <AlertTriangle size={24} color="#f59e0b" />
          <h2>{s.modals?.deactivateAccount?.title ?? 'Deactivate Account'}</h2>
          <button onClick={onClose} className={styles.close}>
            <X size={20} />
          </button>
        </div>

        <div className={styles.content}>
          <p>{s.modals?.deactivateAccount?.description ?? 'Are you sure you want to deactivate your account?'}</p>
          <div className={styles.warning}>
            <AlertTriangle size={16} />
            {s.modals?.deactivateAccount?.warning ?? 'This action can be reversed by contacting support.'}
          </div>
        </div>

        <div className={styles.footer}>
          <button onClick={onClose} className={styles.cancel}>
            {s.modals?.deactivateAccount?.cancelButton ?? 'Cancel'}
          </button>
          <button onClick={handleDeactivate} className={`${styles.confirm} ${styles.warning}`} disabled={loading}>
            {loading ? '처리 중...' : (s.modals?.deactivateAccount?.confirmButton ?? 'Deactivate')}
          </button>
        </div>
      </div>
    </div>
  );
};

export const DeleteAccountModal = ({ isOpen, onClose, userId }) => {
  const s = useStrings();
  const [loading, setLoading] = useState(false);
  const [confirmText, setConfirmText] = useState('');
  const language = s.modals?.deleteAccount?.confirmPlaceholder ?? 'DELETE';
  const isConfirmed = confirmText === language;

  const handleDelete = async () => {
    if (!isConfirmed) return;
    setLoading(true);
    try {
      await userService.deleteAccount(userId, confirmText);
      onClose();
    } catch (error) {
      console.error('Failed to delete account:', error);
      alert('계정 삭제에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <AlertTriangle size={24} color="#ef4444" />
          <h2>{s.modals?.deleteAccount?.title ?? 'Delete Account'}</h2>
          <button onClick={onClose} className={styles.close}>
            <X size={20} />
          </button>
        </div>

        <div className={styles.content}>
          <p>{s.modals?.deleteAccount?.description ?? 'Are you sure you want to permanently delete your account?'}</p>
          <div className={`${styles.warning} ${styles.danger}`}>
            <AlertTriangle size={16} />
            {s.modals?.deleteAccount?.warning ?? 'All your data will be permanently removed.'}
          </div>

          <div className={styles.confirmField}>
            <label>{s.modals?.deleteAccount?.typeToConfirm ?? 'Type "DELETE" to confirm'}</label>
            <input
              type="text"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              placeholder={s.modals?.deleteAccount?.confirmPlaceholder ?? 'DELETE'}
            />
          </div>
        </div>

        <div className={styles.footer}>
          <button onClick={onClose} className={styles.cancel}>
            {s.modals?.deleteAccount?.cancelButton ?? 'Cancel'}
          </button>
          <button
            onClick={handleDelete}
            className={`${styles.confirm} ${styles.danger}`}
            disabled={loading || !isConfirmed}
          >
            {loading ? '삭제 중...' : (s.modals?.deleteAccount?.confirmButton ?? 'Delete permanently')}
          </button>
        </div>
      </div>
    </div>
  );
};
