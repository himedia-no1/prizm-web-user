'use client';

import { useState } from 'react';
import { X, AlertTriangle } from 'lucide-react';
import useStrings from '@/hooks/useStrings';
import testApi from '@/api/test.api';
import './AccountManagementModals.css';

export const DeactivateAccountModal = ({ isOpen, onClose, userId }) => {
  const s = useStrings();
  const [loading, setLoading] = useState(false);

  const handleDeactivate = async () => {
    setLoading(true);
    try {
      await testApi.deactivateAccount(userId);
      onClose();
    } catch (error) {
      console.error('Failed to deactivate account:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="account-modal-overlay" onClick={onClose}>
      <div className="account-modal" onClick={(e) => e.stopPropagation()}>
        <div className="account-modal-header">
          <AlertTriangle size={24} color="#f59e0b" />
          <h2>{s.modals.deactivateAccount.title}</h2>
          <button onClick={onClose} className="account-modal-close">
            <X size={20} />
          </button>
        </div>

        <div className="account-modal-content">
          <p>{s.modals.deactivateAccount.description}</p>
          <div className="account-modal-warning">
            <AlertTriangle size={16} />
            {s.modals.deactivateAccount.warning}
          </div>
        </div>

        <div className="account-modal-footer">
          <button onClick={onClose} className="account-modal-cancel">
            {s.modals.deactivateAccount.cancelButton}
          </button>
          <button onClick={handleDeactivate} className="account-modal-confirm warning" disabled={loading}>
            {loading ? '처리 중...' : s.modals.deactivateAccount.confirmButton}
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
  const language = s.modals.deleteAccount.confirmPlaceholder;
  const isConfirmed = confirmText === language;

  const handleDelete = async () => {
    if (!isConfirmed) return;
    setLoading(true);
    try {
      await testApi.deleteAccount(userId, confirmText);
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
    <div className="account-modal-overlay" onClick={onClose}>
      <div className="account-modal" onClick={(e) => e.stopPropagation()}>
        <div className="account-modal-header">
          <AlertTriangle size={24} color="#ef4444" />
          <h2>{s.modals.deleteAccount.title}</h2>
          <button onClick={onClose} className="account-modal-close">
            <X size={20} />
          </button>
        </div>

        <div className="account-modal-content">
          <p>{s.modals.deleteAccount.description}</p>
          <div className="account-modal-warning danger">
            <AlertTriangle size={16} />
            {s.modals.deleteAccount.warning}
          </div>

          <div className="account-modal-confirm-field">
            <label>{s.modals.deleteAccount.typeToConfirm}</label>
            <input
              type="text"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              placeholder={s.modals.deleteAccount.confirmPlaceholder}
            />
          </div>
        </div>

        <div className="account-modal-footer">
          <button onClick={onClose} className="account-modal-cancel">
            {s.modals.deleteAccount.cancelButton}
          </button>
          <button
            onClick={handleDelete}
            className="account-modal-confirm danger"
            disabled={loading || !isConfirmed}
          >
            {loading ? '삭제 중...' : s.modals.deleteAccount.confirmButton}
          </button>
        </div>
      </div>
    </div>
  );
};
