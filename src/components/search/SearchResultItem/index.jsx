'use client';

import styles from './SearchResultItem.module.css';

export default function SearchResultItem({ result }) {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <span className={styles.type}>{result.type}</span>
                <span className={styles.source}>{result.source}</span>
                <span className={styles.timestamp}>{result.timestamp}</span>
            </div>
            <div className={styles.content}>
                <p dangerouslySetInnerHTML={{ __html: result.content }}></p>
            </div>
        </div>
    );
}
