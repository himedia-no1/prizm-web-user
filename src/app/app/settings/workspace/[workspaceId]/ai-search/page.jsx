'use client';

import { useState } from 'react';
import styles from './ai-search.module.css';

export default function AiSearchSettingsPage() {
    const [schedule, setSchedule] = useState('daily');
    const [scheduleTime, setScheduleTime] = useState('04:00');

    return (
        <div className={styles.container}>
            <div className={styles.section}>
                <h2 className={styles.sectionTitle}>AI 검색 학습 스케줄</h2>
                <div className={styles.formGroup}>
                    <label htmlFor="schedule">학습 주기 설정</label>
                    <select id="schedule" value={schedule} onChange={(e) => setSchedule(e.target.value)} className={styles.select}>
                        <option value="manual">수동</option>
                        <option value="daily">매일</option>
                    </select>
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="schedule-time">학습 시간</label>
                    <input id="schedule-time" type="time" value={scheduleTime} onChange={(e) => setScheduleTime(e.target.value)} className={styles.input} disabled={schedule === 'manual'} />
                </div>
            </div>
        </div>
    );
}
