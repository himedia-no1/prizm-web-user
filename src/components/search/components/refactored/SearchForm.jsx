import React from 'react';
import { Search as SearchIcon } from '@/components/common/icons';
import styles from './SearchForm.module.css';

const SearchForm = ({ query, onQueryChange, onSubmit }) => {
  return (
    <form className={styles.searchForm} onSubmit={onSubmit}>
      <div className={styles.searchField}>
        <SearchIcon size={18} />
        <input
          type="text"
          placeholder="워크스페이스 전체에서 메시지, 파일, 멤버를 검색해보세요"
          value={query}
          onChange={onQueryChange}
        />
        <div className={styles.kbdHint}>
          <kbd>⌘</kbd>
          <span>F</span>
        </div>
      </div>
      <button type="submit" className={styles.submitButton}>
        검색
      </button>
    </form>
  );
};

export default SearchForm;
