'use client';

import { useEffect, useState } from 'react';
import { useMessages } from 'next-intl';
import styles from './LogsHistory.module.css';
import { aiService } from '@/core/api/services';

export default function LogsHistory() {
    const messages = useMessages();
    const ai = messages?.workspaceManagement?.ai?.logs;
    const [logs, setLogs] = useState([]);
    const [showDetails, setShowDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let active = true;

        const loadLogs = async () => {
            try {
                const payload = await aiService.fetchLogs();
                if (!active) {
                    return;
                }
                setLogs(Array.isArray(payload) ? payload : []);
                setError(null);
            } catch (err) {
                if (!active) {
                    return;
                }
                console.error('Failed to load logs:', err);
                setError(ai.loadError);
                setLogs([]);
            } finally {
                if (active) {
                    setLoading(false);
                }
            }
        };

        loadLogs();

        return () => {
            active = false;
        };
    }, [ai.loadError]);

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

    if (!ai) {
        return null;
    }

    if (loading) {
        return <div className={styles.container}>{ai.loadingMessage}</div>;
    }

    if (error) {
        return <div className={styles.container}>{error}</div>;
    }

    const activeLog = logs.find((log) => log.id === showDetails);

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
                    {logs.map((log) => (
                        <tr key={log.id}>
                            <td>{log.status}</td>
                            <td>{log.executor}</td>
                            <td>{log.duration}</td>
                            <td>
                                <button onClick={() => setShowDetails(log.id)} className={styles.detailsButton}>
                                    {ai.viewDetailsButton}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button onClick={handleDownload} className={styles.downloadButton}>
                {ai.downloadButton}
            </button>
            {showDetails && activeLog && (
                <div className={styles.detailsModalOverlay}>
                    <div className={styles.detailsModal}>
                        <h3>{ai.logDetailsTitle}</h3>
                        <pre>{JSON.stringify(activeLog.details, null, 2)}</pre>
                        <button onClick={() => setShowDetails(null)}>{ai.closeButton}</button>
                    </div>
                </div>
            )}
        </div>
    );
}
