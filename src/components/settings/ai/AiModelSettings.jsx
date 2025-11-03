'use client';

import { useState } from 'react';
import styles from './AiModelSettings.module.css';

export default function AiModelSettings() {
    const [embeddingModel, setEmbeddingModel] = useState('text-embedding-3-small');
    const [chunkSize, setChunkSize] = useState(512);
    const [overlap, setOverlap] = useState(50);
    const [topK, setTopK] = useState(5);
    const [schedule, setSchedule] = useState('manual');

    return (
        <div className={styles.container}>
            <div className={styles.formGroup}>
                <label htmlFor="embedding-model">임베딩 모델 선택</label>
                <select id="embedding-model" value={embeddingModel} onChange={(e) => setEmbeddingModel(e.target.value)} className={styles.select}>
                    <option value="text-embedding-3-small">text-embedding-3-small</option>
                    <option value="bge-small">bge-small</option>
                </select>
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="chunk-size">Chunk Size</label>
                <input id="chunk-size" type="number" value={chunkSize} onChange={(e) => setChunkSize(e.target.value)} className={styles.input} />
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="overlap">Overlap</label>
                <input id="overlap" type="number" value={overlap} onChange={(e) => setOverlap(e.target.value)} className={styles.input} />
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="top-k">Top K</label>
                <input id="top-k" type="number" value={topK} onChange={(e) => setTopK(e.target.value)} className={styles.input} />
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="schedule">학습 주기 설정</label>
                <select id="schedule" value={schedule} onChange={(e) => setSchedule(e.target.value)} className={styles.select}>
                    <option value="manual">수동</option>
                    <option value="daily">매일 새벽 4시</option>
                </select>
            </div>
            <div className={styles.permissionInfo}>
                <p>이 탭은 OWNER / MANAGER만 접근 가능</p>
            </div>
        </div>
    );
}
