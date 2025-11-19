'use client';

import React from 'react';
import { Search as SearchIcon } from '@/components/common/icons';
import styles from './SearchForm.module.css';

const SearchForm = ({ query, onQueryChange, onSubmit, placeholder, submitButtonText }) => {
  return (
    <form className={styles.searchForm} onSubmit={onSubmit}>
      <div className={styles.searchField}>
        <SearchIcon size={18} />
        <input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={onQueryChange}
        />
        <div className={styles.kbdHint}>
          <kbd>⌘</kbd>
          <span>F</span>
        </div>
      </div>
      <button type="submit" className={styles.submitButton}>
        {submitButtonText}
      </button>
    </form>
  );
};

export default SearchForm;
