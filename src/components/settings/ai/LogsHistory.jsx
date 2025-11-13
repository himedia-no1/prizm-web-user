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
                        <th>{ai?.fileNameLabel || 'File Name'}</th>
                        <th>{ai?.statusLabel || 'Status'}</th>
                        <th>{ai?.executorLabel || 'Executor'}</th>
                    </tr>
                </thead>
                <tbody>
                    {logs.map((log) => (
                        <tr key={log.id}>
                            <td>{log.fileName || log.file_name || '-'}</td>
                            <td>
                                <span className={`${styles.statusBadge} ${styles[`status-${log.status}`]}`}>
                                    {log.status}
                                </span>
                            </td>
                            <td>{log.executor}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
