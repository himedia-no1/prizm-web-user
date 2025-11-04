'use client';

import { useState } from 'react';
import styles from './LogsHistory.module.css';

const mockLogs = [
    { id: 1, status: '완료', executor: 'User 1', duration: '5.2s', details: { chunks: 102, documents: 5, errors: 0 } },
    { id: 2, status: '실패', executor: 'User 1', duration: '1.2s', details: { chunks: 10, documents: 1, errors: 1, error_reason: 'Invalid document format' } },
    { id: 3, status: '완료', executor: 'User 2', duration: '10.5s', details: { chunks: 250, documents: 15, errors: 0 } },
];

export default function LogsHistory() {
    const [logs, setLogs] = useState(mockLogs);
    const [showDetails, setShowDetails] = useState(null);

    const handleDownload = () => {
        const data = JSON.stringify(logs, null, 2);
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'logs.json';
        a.click();
        URL.revokeObjectURL(url);
    };

    // const handleRollback = (id) => {
    //     if (confirm(`Are you sure you want to rollback to this version?`)) {
    //         console.log(`Rolling back to version ${id}`);
    //     }
    // };

    return (
        <div className={styles.container}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Status</th>
                        <th>Executor</th>
                        <th>Duration</th>
                        <th>Details</th>
                    </tr>
                </thead>
                <tbody>
                    {logs.map(log => (
                        <tr key={log.id}>
                            <td>{log.status}</td>
                            <td>{log.executor}</td>
                            <td>{log.duration}</td>
                            <td>
                                <button onClick={() => setShowDetails(log.id)} className={styles.detailsButton}>세부 로그 보기</button>
                                {/* <button onClick={() => handleRollback(log.id)} className={styles.rollbackButton}>롤백</button> */}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button onClick={handleDownload} className={styles.downloadButton}>다운로드</button>
            {showDetails && (
                <div className={styles.detailsModalOverlay}>
                    <div className={styles.detailsModal}>
                        <h3>Log Details</h3>
                        <pre>{JSON.stringify(logs.find(log => log.id === showDetails).details, null, 2)}</pre>
                        <button onClick={() => setShowDetails(null)}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
}
