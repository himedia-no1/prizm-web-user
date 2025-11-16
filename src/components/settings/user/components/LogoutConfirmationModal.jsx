'use client';

import { X } from '@/components/common/icons';
import styles from '../../UserSettingsPage.module.css';

export const LogoutConfirmationModal = ({
  open,
  onCancel,
  onConfirm,
  labels,
  isProcessing,
}) => {
  if (!open) {
    return null;
  }

  return (
    <div className="channel-modal-overlay" onClick={onCancel}>
      <div className={`channel-modal ${styles.modal}`} onClick={(event) => event.stopPropagation()}>
        <header className="channel-modal__header">
          <h3>{labels.modalTitle}</h3>
          <button onClick={onCancel} className="channel-modal__close-button">
            <X size={18} />
          </button>
        </header>
        <div className="channel-modal__content">
          <p className={styles.modalDescription}>{labels.modalDescription}</p>
          <div className={styles.modalActions}>
            <button
              type="button"
              className={`profile-action-button ${styles.cancelButton}`}
              onClick={onCancel}
            >
              {labels.cancel}
            </button>
            <button
              type="button"
              className={`profile-modal__save-button ${styles.logoutButton} ${
                isProcessing ? styles.loggingOut : ''
              }`}
              onClick={onConfirm}
              disabled={isProcessing}
            >
              {isProcessing ? labels.inProgress : labels.confirm}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoutConfirmationModal;
