'use client';

import { useState } from 'react';
import { useMessages } from 'next-intl';
import styles from './SystemManagement.module.css';

export default function SystemManagement() {
    const messages = useMessages();
    const ai = messages?.workspaceManagement?.ai?.system ?? {};

    const [vectorDbStatus, setVectorDbStatus] = useState({ capacity: '1.2GB', documents: 152, model: 'text-embedding-3-small' });
    const [privacyFilter, setPrivacyFilter] = useState(true);

    const handleResetData = () => {
        if (confirm(ai.resetConfirm ?? 'Are you sure you want to reset all data?')) {
            console.log('Resetting all data...');
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.status}>
                <h4>{ai.vectorDbStatusLabel ?? '벡터DB 상태'}</h4>
                <p>{ai.capacityLabel ?? '용량'}: {vectorDbStatus.capacity}</p>
                <p>{ai.documentsLabel ?? '문서 수'}: {vectorDbStatus.documents}</p>
                <p>{ai.modelLabel ?? '모델'}: {vectorDbStatus.model}</p>
            </div>
            <div className={styles.actions}>
                <div className={styles.formGroup}>
                    <label>{ai.privacyFilterLabel ?? '개인정보 필터'}</label>
                    <label className={styles.switch}>
                        <input type="checkbox" checked={privacyFilter} onChange={() => setPrivacyFilter(!privacyFilter)} />
                        <span className={styles.slider}></span>
                    </label>
                </div>
                <button onClick={handleResetData} className={styles.resetButton}>{ai.resetButton ?? '데이터 초기화'}</button>
            </div>
        </div>
    );
}
