'use client';

import React from 'react';
import useStrings from '@/hooks/useStrings';

export const CreateCategoryModalContent = (props) => {
    const s = useStrings();

    return (
        <div>
            <div className="settings-form-group">
                <label htmlFor="cat-name">{s.modals.genericModal.categoryNameLabel}</label>
                <input id="cat-name" type="text" placeholder={s.modals.genericModal.categoryNamePlaceholder} />
            </div>
            <button className="profile-modal__save-button" style={{ marginTop: 0 }}>
                {s.modals.genericModal.createButton}
            </button>
        </div>
    );
};