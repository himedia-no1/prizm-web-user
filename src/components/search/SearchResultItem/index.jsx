'use client';

import styles from './SearchResultItem.module.css';

export default function SearchResultItem({ result }) {
  const typeLabels = {
    message: '메시지',
    file: '파일',
    user: '멤버',
  };

  const typeLabel = typeLabels[result.type] || result.type;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.type}>{typeLabel}</span>
        <span className={styles.dot} />
        <span className={styles.source}>{result.source}</span>
        <span className={styles.timestamp}>{result.timestamp}</span>
      </div>
      {result.title && <h3 className={styles.title}>{result.title}</h3>}
      <div className={styles.content}>
        <p dangerouslySetInnerHTML={{ __html: result.content }} />
      </div>
    </div>
  );
}
