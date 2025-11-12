'use client';

import { useEffect, useState } from 'react';
import { useMessages } from 'next-intl';
import styles from './LearningDataManagement.module.css';
import { aiService } from '@/core/api/services';

export default function LearningDataManagement() {
    const messages = useMessages();
    const ai = messages?.workspaceManagement?.ai?.learningData ?? {};
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [actionFeedback, setActionFeedback] = useState(null);

    useEffect(() => {
        let active = true;

        const loadLearningData = async () => {
            try {
                const payload = await aiService.fetchLearningData();
                if (!active) {
                    return;
                }
                setData(Array.isArray(payload) ? payload : []);
                setError(null);
            } catch (err) {
                if (!active) {
                    return;
                }
                console.error('Failed to load learning data:', err);
                setError(ai.loadError ?? '학습 데이터를 불러오지 못했습니다.');
                setData([]);
            } finally {
                if (active) {
                    setLoading(false);
                }
            }
        };

        loadLearningData();

        return () => {
            active = false;
        };
    }, []);

    const handleToggleApproval = async (id) => {
        const target = data.find((item) => item.id === id);
        if (!target) {
            return;
        }
        const nextApproved = !target.approved;
        const snapshot = data.map((item) => ({ ...item }));
        setData((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, approved: nextApproved } : item,
            ),
        );
        try {
            await aiService.updateLearningDataApproval(id, nextApproved);
            setActionFeedback(ai.approveSuccess ?? '승인 상태가 업데이트되었습니다.');
        } catch (err) {
            console.error('Failed to update learning data approval:', err);
            setData(snapshot);
            setActionFeedback(ai.approveError ?? '승인 상태를 변경하지 못했습니다.');
        }
    };

    const handleRemoveData = async (id) => {
        const snapshot = data.map((item) => ({ ...item }));
        setData((prev) => prev.filter((item) => item.id !== id));
        try {
            await aiService.deleteLearningData(id);
            setActionFeedback(ai.deleteSuccess ?? '데이터가 삭제되었습니다.');
        } catch (err) {
            console.error('Failed to delete learning data:', err);
            setData(snapshot);
            setActionFeedback(ai.deleteError ?? '데이터 삭제에 실패했습니다.');
        }
    };

    const handleReinspectData = async (id) => {
        try {
            const response = await aiService.reinspectLearningData(id);
            if (response?.item) {
                setData((prev) =>
                    prev.map((item) =>
                        item.id === id ? { ...item, ...response.item } : item,
                    ),
                );
            }
            setActionFeedback(ai.reinspectSuccess ?? '재검토를 요청했습니다.');
        } catch (err) {
            console.error('Failed to request reinspection:', err);
            setActionFeedback(ai.reinspectError ?? '재검토 요청에 실패했습니다.');
        }
    };

    if (loading) {
        return <div className={styles.container}>학습 데이터를 불러오는 중입니다...</div>;
    }

    if (error) {
        return <div className={styles.container}>{error}</div>;
    }

    return (
        <div className={styles.container}>
            {actionFeedback && <div className={styles.feedback}>{actionFeedback}</div>}
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
                            <td>{item.createdAt}</td>
                            <td>
                                <label className={styles.switch}>
                                    <input type="checkbox" checked={item.approved} onChange={() => handleToggleApproval(item.id)} />
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
