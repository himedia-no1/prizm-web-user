import React from 'react';
import { Search as SearchIcon } from '@/components/common/icons';
import SearchResultsList from '../SearchResultsList';
import styles from './SearchResultsContainer.module.css';

const SearchResultsContainer = ({ loading, error, results, query, translations: t }) => {
  if (loading) {
    return (
      <div className={styles.emptyState}>
        <SearchIcon size={28} />
        <h3>{t.loading.title}</h3>
        <p>{t.loading.description}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.emptyState}>
        <SearchIcon size={28} />
        <h3>{t.error.title}</h3>
        <p>{error}</p>
      </div>
    );
  }

  if (!query.trim()) {
    return (
      <div className={styles.emptyState}>
        <SearchIcon size={28} />
        <h3>{t.empty.title}</h3>
        <p>{t.empty.description}</p>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className={styles.emptyState}>
        <SearchIcon size={28} />
        <h3>{t.noResults.title}</h3>
        <p>{t.noResults.description}</p>
      </div>
    );
  }

  return <SearchResultsList results={results} />;
};

export default SearchResultsContainer;
