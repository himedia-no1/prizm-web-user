'use client';

import { useMessages } from 'next-intl';
import styles from './AddChannelModalContent.module.css';

export const AddChannelModalContent = () => {
    const messages = useMessages();
    const t = messages?.modals?.addChannel ?? {};

    return (
        <div>
            <div className="settings-form-group">
                <label htmlFor="channel-name">{t.nameLabel ?? '채널 이름'}</label>
                <input id="channel-name" type="text" placeholder={t.namePlaceholder ?? '예: design-review'} />
            </div>
            <button className={`profile-modal__save-button ${styles.button}`}>
                {t.submit ?? '채널 만들기'}
            </button>
        </div>
    );
};
