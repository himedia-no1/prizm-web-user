'use client';

import React from 'react';
import useStrings from '@/hooks/useStrings';

export const SearchModalContent = (props) => {
    const s = useStrings();

    return (
        <div className="channel-modal__search">
            <div className="settings-form-group">
                <input id="channel-search" type="text" placeholder={s.modals.genericModal.searchPlaceholder} />
            </div>
        </div>
    );
};