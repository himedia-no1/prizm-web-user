import { useState, useEffect, useMemo } from 'react';
import { LayoutGrid, MessageSquare, FileText, Users as UsersIcon, Search as SearchIcon } from '@/components/common/icons';
import { searchService } from '@/core/api/services';
import SearchForm from './refactored/SearchForm';
import SearchTabs from './refactored/SearchTabs';
import SearchResultsHeader from './refactored/SearchResultsHeader';
import SearchResultsContainer from './refactored/SearchResultsContainer';
import styles from './SearchView.module.css';

const TAB_ITEMS = [
  { id: 'All', label: '전체', icon: LayoutGrid },
  { id: 'Messages', label: '메시지', icon: MessageSquare },
  { id: 'Files', label: '파일', icon: FileText },
  { id: 'Users', label: '멤버', icon: UsersIcon },
];

const typeMap = {
  Messages: 'message',
  Files: 'file',
  Users: 'user',
};

export const SearchView = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState(TAB_ITEMS[0].id);

  useEffect(() => {
    const trimmed = query.trim();
    if (!trimmed) {
      setResults([]);
      setError(null);
      setLoading(false);
      return;
    }

    const controller = new AbortController();
    const filterValue = activeTab === 'All' ? 'all' : typeMap[activeTab] ?? 'all';
    const timeout = setTimeout(() => {
      setLoading(true);
      searchService
        .search(trimmed, filterValue)
        .then((data) => {
          if (!controller.signal.aborted) {
            setResults(Array.isArray(data) ? data : []);
            setError(null);
          }
        })
        .catch((err) => {
          if (!controller.signal.aborted) {
            console.error('Search failed:', err);
            setError('검색 중 오류가 발생했습니다.');
            setResults([]);
          }
        })
        .finally(() => {
          if (!controller.signal.aborted) {
            setLoading(false);
          }
        });
    }, 300);

    return () => {
      controller.abort();
      clearTimeout(timeout);
    };
  }, [query, activeTab]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) {
      return;
    }
    // The useEffect will handle the search
  };

  const handleQueryChange = (event) => {
    setQuery(event.target.value);
  };

  const statusText = useMemo(() => {
    if (loading) return '결과를 불러오고 있어요...';
    if (!query.trim()) return '검색어를 입력해 검색을 시작하세요.';
    if (error) return '검색 중 문제가 발생했습니다.';
    if (results.length === 0) return '일치하는 결과가 없어요. 다른 키워드나 필터를 시도해보세요.';
    return `${results.length}개의 결과가 준비됐어요.`;
  }, [loading, query, results.length, error]);

  return (
    <main className={`main-view ${styles.searchView}`}>
      <section className={styles.heroSection}>
        <div className={styles.heroTopRow}>
          <div className={styles.heroCopy}>
            <span className={styles.heroPill}>
              <SearchIcon size={14} />
              통합 검색
            </span>
          </div>
        </div>
        <SearchForm
          query={query}
          onQueryChange={handleQueryChange}
          onSubmit={handleSubmit}
        />
        <div className={styles.metaRow}>
            <SearchTabs
                tabs={TAB_ITEMS}
                activeTab={activeTab}
                onTabClick={setActiveTab}
            />
        </div>
      </section>
      <section className={styles.resultsSection}>
        <SearchResultsHeader
          statusText={statusText}
          activeTabLabel={TAB_ITEMS.find((tab) => tab.id === activeTab)?.label}
        />
        <div className={styles.resultsBody}>
            <SearchResultsContainer
              loading={loading}
              error={error}
              results={results}
              query={query}
            />
        </div>
      </section>
    </main>
  );
};