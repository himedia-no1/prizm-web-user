'use client';

import { useState } from 'react';
import styles from './LearningDataManagement.module.css';

const mockData = [
    { id: 1, source: 'document.pdf', author: 'User 1', created_at: '2025-10-28', is_approved: true },
    { id: 2, source: 'chat_channel_general', author: 'User 2', created_at: '2025-10-29', is_approved: false },
    { id: 3, source: 'note_20251030', author: 'User 3', created_at: '2025-10-30', is_approved: true },
];

export default function LearningDataManagement() {
    const [data, setData] = useState(mockData);

    const handleToggleApproval = (id) => {
        setData(data.map(item => item.id === id ? { ...item, is_approved: !item.is_approved } : item));
    };

    const handleRemoveData = (id) => {
        setData(data.filter(item => item.id !== id));
    };

    const handleReinspectData = (id) => {
        console.log(`Reinspecting data with id: ${id}`);
    };

    return (
        <div className={styles.container}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Source</th>
                        <th>Author</th>
                        <th>Created At</th>
                        <th>Approved</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(item => (
                        <tr key={item.id}>
                            <td>{item.source}</td>
                            <td>{item.author}</td>
                            <td>{item.created_at}</td>
                            <td>
                                <label className={styles.switch}>
                                    <input type="checkbox" checked={item.is_approved} onChange={() => handleToggleApproval(item.id)} />
                                    <span className={styles.slider}></span>
                                </label>
                            </td>
                            <td>
                                <button onClick={() => handleRemoveData(item.id)} className={styles.actionButton}>🗑️</button>
                                <button onClick={() => handleReinspectData(item.id)} className={styles.actionButton}>🔄</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
