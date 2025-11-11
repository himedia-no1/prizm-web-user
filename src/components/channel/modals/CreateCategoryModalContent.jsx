'use client';

import React from 'react';
import { useMessages } from 'next-intl';
import styles from './CreateCategoryModalContent.module.css';

export const CreateCategoryModalContent = (props) => {
    const messages = useMessages();
    const s = { ...(messages?.common ?? {}), ...messages };

    return (
        <div>
            <div className="settings-form-group">
                <label htmlFor="cat-name">{s.modals.genericModal.categoryNameLabel}</label>
                <input id="cat-name" type="text" placeholder={s.modals.genericModal.categoryNamePlaceholder} />
            </div>
            <button className={`profile-modal__save-button ${styles.button}`}>
                {s.modals.genericModal.createButton}
            </button>
        </div>
    );
};
