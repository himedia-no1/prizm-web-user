import React from 'react';
import { useMessages } from 'next-intl';
import styles from './SearchResultsHeader.module.css';

const SearchResultsHeader = ({ statusText, activeTabLabel }) => {
  const messages = useMessages();
  const t = messages?.search;

  return (
    <header className={styles.resultsHeader}>
      <div>
        <h2 className={styles.resultsTitle}>{t?.resultsTitle}</h2>
        <p className={styles.resultsMeta}>{statusText}</p>
      </div>
      <span className={styles.resultsTag}>{activeTabLabel}</span>
    </header>
  );
};

export default SearchResultsHeader;
