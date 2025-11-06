'use client';

import { useState } from 'react';
import styles from './ai-search.module.css';

export default function AiSearchPage() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

    const handleSearch = () => {
        // Mock search results
        setResults([
            { id: 1, title: '검색 결과 1', content: '"계획"과 관련된 내용입니다.' },
            { id: 2, title: '검색 결과 2', content: '"계획"에 대한 추가 정보입니다.' },
        ]);
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>AI 검색</h1>
            <div className={styles.searchBar}>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="무엇이든 물어보세요..."
                    className={styles.input}
                />
                <button onClick={handleSearch} className={styles.button}>검색</button>
            </div>
            <div className={styles.results}>
                {results.map(result => (
                    <div key={result.id} className={styles.resultItem}>
                        <h3 className={styles.resultTitle}>{result.title}</h3>
                        <p>{result.content}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
