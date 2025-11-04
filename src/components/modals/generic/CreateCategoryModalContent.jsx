'use client';

import useStrings from '@/hooks/useStrings';

export const CreateCategoryModalContent = () => {
    const s = useStrings();

    return (
        <div>
            <div className="settings-form-group">
                <label htmlFor="cat-name">{s.createCategoryLabel}</label>
                <input id="cat-name" type="text" placeholder={s.createCategoryPlaceholder} />
            </div>
            <button className="profile-modal__save-button" style={{ marginTop: 0 }}>
                {s.createCategoryButton}
            </button>
        </div>
    );
};
