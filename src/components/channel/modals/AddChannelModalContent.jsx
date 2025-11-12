'use client';

import { useMessages } from 'next-intl';
import styles from './AddChannelModalContent.module.css';

export const AddChannelModalContent = () => {
    const messages = useMessages();
    const t = messages?.modals?.addChannel;

    if (!t) {
        return null;
    }

    return (
        <div>
            <div className="settings-form-group">
                <label htmlFor="channel-name">{t.nameLabel}</label>
                <input id="channel-name" type="text" placeholder={t.namePlaceholder} />
            </div>
            <button className={`profile-modal__save-button ${styles.button}`}>
                {t.submit}
            </button>
        </div>
    );
};
