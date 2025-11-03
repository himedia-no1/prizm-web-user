'use client';

import { useState } from 'react';
import styles from './LearningControl.module.css';

export default function LearningControl() {
    const [learningStatus, setLearningStatus] = useState('대기중');
    const [progress, setProgress] = useState(0);
    const [lastTrained, setLastTrained] = useState('2025-11-03 02:00');

    const [nextScheduledRun, setNextScheduledRun] = useState('내일 새벽 4:00');

    const handleRunLearning = () => {
        setLearningStatus('처리중');
        // Simulate learning progress
        let currentProgress = 0;
        const interval = setInterval(() => {
            currentProgress += 10;
            setProgress(currentProgress);
            if (currentProgress >= 100) {
                clearInterval(interval);
                setLearningStatus('완료');
                setLastTrained(new Date().toLocaleString());
            }
        }, 500);
    };

    const handleCancelLearning = () => {
        setLearningStatus('취소');
        setProgress(0);
    };

    return (
        <div className={styles.container}>
            <div className={styles.controls}>
                <button onClick={handleRunLearning} className={styles.runButton} disabled={learningStatus === '처리중'}>
                    AI 학습 실행
                </button>
                <button onClick={handleCancelLearning} className={styles.cancelButton} disabled={learningStatus !== '처리중'}>
                    학습 중단
                </button>
            </div>
            <div className={styles.status}>
                <div className={styles.progressBarContainer}>
                    <div className={styles.progressBar} style={{ width: `${progress}%` }}></div>
                </div>
                <div className={styles.statusText}>{learningStatus}</div>
            </div>
            <div className={styles.timestamp}>최근 학습 일시: {lastTrained}</div>
            <div className={styles.timestamp}>다음 학습 예정: {nextScheduledRun}</div>
        </div>
    );
}
