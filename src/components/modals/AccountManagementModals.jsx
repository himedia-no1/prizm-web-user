'use client';

import { useState } from 'react';
import { X, AlertTriangle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { userService } from '@/core/api/services';
import styles from './AccountManagementModals.module.css';

export const DeactivateAccountModal = ({ isOpen, onClose, userId }) => {
  const t = useTranslations('modals.deactivateAccount');
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
          <h2>{t('title')}</h2>
          <button onClick={onClose} className={styles.close}>
            <X size={20} />
          </button>
        </div>

        <div className={styles.content}>
          <p>{t('description')}</p>
          <div className={styles.warning}>
            <AlertTriangle size={16} />
            {t('warning')}
          </div>
        </div>

        <div className={styles.footer}>
          <button onClick={onClose} className={styles.cancel}>
            {t('cancelButton')}
          </button>
          <button onClick={handleDeactivate} className={`${styles.confirm} ${styles.warning}`} disabled={loading}>
            {loading ? '처리 중...' : t('confirmButton')}
          </button>
        </div>
      </div>
    </div>
  );
};

export const DeleteAccountModal = ({ isOpen, onClose, userId }) => {
  const t = useTranslations('modals.deleteAccount');
  const [loading, setLoading] = useState(false);
  const [confirmText, setConfirmText] = useState('');
  const confirmPlaceholder = t('confirmPlaceholder');
  const isConfirmed = confirmText === confirmPlaceholder;

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
          <h2>{t('title')}</h2>
          <button onClick={onClose} className={styles.close}>
            <X size={20} />
          </button>
        </div>

        <div className={styles.content}>
          <p>{t('description')}</p>
          <div className={`${styles.warning} ${styles.danger}`}>
            <AlertTriangle size={16} />
            {t('warning')}
          </div>

          <div className={styles.confirmField}>
            <label>{t('typeToConfirm')}</label>
            <input
              type="text"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              placeholder={t('confirmPlaceholder')}
            />
          </div>
        </div>

        <div className={styles.footer}>
          <button onClick={onClose} className={styles.cancel}>
            {t('cancelButton')}
          </button>
          <button
            onClick={handleDelete}
            className={`${styles.confirm} ${styles.danger}`}
            disabled={loading || !isConfirmed}
          >
            {loading ? '삭제 중...' : t('confirmButton')}
          </button>
        </div>
      </div>
    </div>
  );
};
