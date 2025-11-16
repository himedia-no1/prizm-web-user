'use client';

import { useState } from 'react';
import { useMessages } from 'next-intl';
import styles from './SystemManagement.module.css';

export default function SystemManagement() {
    const messages = useMessages();
    const ai = messages?.workspaceManagement?.ai?.system;

    const [vectorDbStatus] = useState({
        capacity: '1.2GB',
        documents: 152,
        model: 'text-embedding-3-small'
    });

    if (!ai) {
        return null;
    }

    return (
        <div className={styles.container}>
            <div className={styles.status}>
                <p><strong>{ai?.capacityLabel || 'Capacity'}:</strong> {vectorDbStatus.capacity}</p>
                <p><strong>{ai?.documentsLabel || 'Documents'}:</strong> {vectorDbStatus.documents}</p>
                <p><strong>{ai?.modelLabel || 'Model'}:</strong> {vectorDbStatus.model}</p>
            </div>
        </div>
    );
}
