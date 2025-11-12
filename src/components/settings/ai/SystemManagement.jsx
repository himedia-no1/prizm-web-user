'use client';

import { useState } from 'react';
import { useMessages } from 'next-intl';
import styles from './SystemManagement.module.css';

export default function SystemManagement() {
    const messages = useMessages();
    const ai = messages?.workspaceManagement?.ai?.system;

    const [vectorDbStatus, setVectorDbStatus] = useState({ capacity: '1.2GB', documents: 152, model: 'text-embedding-3-small' });
    const [privacyFilter, setPrivacyFilter] = useState(true);

    const handleResetData = () => {
        if (confirm(ai.resetConfirm)) {
            console.log('Resetting all data...');
        }
    };

    if (!ai) {
        return null;
    }

    return (
        <div className={styles.container}>
            <div className={styles.status}>
                <h4>{ai.vectorDbStatusLabel}</h4>
                <p>{ai.capacityLabel}: {vectorDbStatus.capacity}</p>
                <p>{ai.documentsLabel}: {vectorDbStatus.documents}</p>
                <p>{ai.modelLabel}: {vectorDbStatus.model}</p>
            </div>
            <div className={styles.actions}>
                <div className={styles.formGroup}>
                    <label>{ai.privacyFilterLabel}</label>
                    <label className={styles.switch}>
                        <input type="checkbox" checked={privacyFilter} onChange={() => setPrivacyFilter(!privacyFilter)} />
                        <span className={styles.slider}></span>
                    </label>
                </div>
                <button onClick={handleResetData} className={styles.resetButton}>{ai.resetButton}</button>
            </div>
        </div>
    );
}
