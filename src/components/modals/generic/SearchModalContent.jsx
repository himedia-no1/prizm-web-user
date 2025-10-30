'use client';

import useStrings from '@/hooks/useStrings';

export const SearchModalContent = () => {
    const s = useStrings();

    return (
        <div className="channel-modal__search">
            <div className="settings-form-group">
                <input id="channel-search" type="text" placeholder={s.searchModalInputPlaceholder} />
            </div>
        </div>
    );
};
