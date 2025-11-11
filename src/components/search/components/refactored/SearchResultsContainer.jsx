import React from 'react';
import { Search as SearchIcon } from '@/components/common/icons';
import SearchResultsList from '../SearchResultsList';
import styles from './SearchResultsContainer.module.css';

const SearchResultsContainer = ({ loading, error, results, query }) => {
  if (loading) {
    return (
      <div className={styles.emptyState}>
        <SearchIcon size={28} />
        <h3>검색 중이에요</h3>
        <p>팀의 지식을 살펴보고 있어요. 잠시만 기다려주세요.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.emptyState}>
        <SearchIcon size={28} />
        <h3>문제가 발생했어요</h3>
        <p>{error}</p>
      </div>
    );
  }

  if (!query.trim()) {
    return (
      <div className={styles.emptyState}>
        <SearchIcon size={28} />
        <h3>필요한 정보를 찾아보세요</h3>
        <p>팀 대화와 파일, 멤버 정보를 통합 검색으로 한 번에 찾을 수 있어요.</p>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className={styles.emptyState}>
        <SearchIcon size={28} />
        <h3>검색 결과가 없어요</h3>
        <p>키워드나 필터를 변경해 다시 시도해보세요.</p>
      </div>
    );
  }

  return <SearchResultsList results={results} />;
};

export default SearchResultsContainer;
