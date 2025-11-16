'use client';

import SearchResultItem from './SearchResultItem';
import styles from './SearchResultsList.module.css';

export default function SearchResultsList({ results }) {
    return (
        <div className={styles.container}>
            {results.map(result => (
                <SearchResultItem key={result.id} result={result} />
            ))}
        </div>
    );
}
