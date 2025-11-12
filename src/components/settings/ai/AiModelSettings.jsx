'use client';

import { useState } from 'react';
import { useMessages } from 'next-intl';
import styles from './AiModelSettings.module.css';

export default function AiModelSettings() {
    const messages = useMessages();
    const ai = messages?.workspaceManagement?.ai?.modelSettings ?? {};

    const [embeddingModel, setEmbeddingModel] = useState('text-embedding-3-small');
    const [chunkSize, setChunkSize] = useState(512);
    const [overlap, setOverlap] = useState(50);
    const [topK, setTopK] = useState(5);
    return (
        <div className={styles.container}>
            <div className={styles.formGroup}>
                <label htmlFor="embedding-model">{ai.embeddingModel ?? '임베딩 모델 선택'}</label>
                <select id="embedding-model" value={embeddingModel} onChange={(e) => setEmbeddingModel(e.target.value)} className={styles.select}>
                    <option value="text-embedding-3-small">text-embedding-3-small</option>
                    <option value="bge-small">bge-small</option>
                </select>
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="chunk-size">Chunk Size</label>
                <input id="chunk-size" type="number" value={chunkSize} onChange={(e) => setChunkSize(e.target.value)} className={styles.input} placeholder="512" />
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="overlap">Overlap</label>
                <input id="overlap" type="number" value={overlap} onChange={(e) => setOverlap(e.target.value)} className={styles.input} placeholder="50" />
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="top-k">Top K</label>
                <input id="top-k" type="number" value={topK} onChange={(e) => setTopK(e.target.value)} className={styles.input} placeholder="5" />
            </div>
        </div>
    );
}
