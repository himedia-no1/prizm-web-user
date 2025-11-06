'use client';

import React from 'react';
import { X } from '@/components/common/icons';
import './Modals.css';
import styles from './GenericModal.module.css';

export const GenericModal = ({ isOpen, onClose, title, children, maxWidth = '520px' }) => {
    if (!isOpen) return null;

    return (
        <div className="channel-modal-overlay" onClick={onClose}>
            <div
                className={`channel-modal ${styles.modal}`}
                style={{ '--max-width': maxWidth }}
                onClick={(e) => e.stopPropagation()}
            >
                <header className="channel-modal__header">
                    <h3>{title}</h3>
                    <button onClick={onClose} className="channel-modal__close-button">
                        <X size={18} />
                    </button>
                </header>
                <div className="channel-modal__content">
                    {children}
                </div>
            </div>
        </div>
    );
};
