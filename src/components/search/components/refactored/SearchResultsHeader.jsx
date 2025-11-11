import React from 'react';
import styles from './SearchResultsHeader.module.css';

const SearchResultsHeader = ({ statusText, activeTabLabel }) => {
  return (
    <header className={styles.resultsHeader}>
      <div>
        <h2 className={styles.resultsTitle}>검색 결과</h2>
        <p className={styles.resultsMeta}>{statusText}</p>
      </div>
      <span className={styles.resultsTag}>{activeTabLabel}</span>
    </header>
  );
};

export default SearchResultsHeader;
