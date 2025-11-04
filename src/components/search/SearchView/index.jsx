import { useState, useEffect, useMemo } from 'react';
import useStore from '@/store/useStore';
import { LayoutGrid, MessageSquare, FileText, Users as UsersIcon, Search as SearchIcon, AIIcon } from '@/components/common/icons';
import SearchResultsList from '../SearchResultsList';
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
  const { isAiSearchEnabled, toggleAiSearch } = useStore();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(TAB_ITEMS[0].id);

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      if (!query.trim()) {
        setResults([]);
        setLoading(false);
        return;
      }

      setLoading(true);

      setTimeout(() => {
        const allResults = [
          { id: 1, type: 'message', source: '#general', timestamp: '2025-11-04', title: 'Search Result 1', content: `This is a mock search result for <strong>${query}</strong>.` },
          { id: 2, type: 'file', source: 'document.pdf', timestamp: '2025-11-03', title: 'Search Result 2', content: `This is another mock search result for <strong>${query}</strong>.` },
          { id: 3, type: 'user', source: 'User 1', timestamp: '2025-11-02', title: 'User 1', content: `This is a user search result for <strong>${query}</strong>.` },
        ];

        const filteredResults = activeTab === 'All'
          ? allResults
          : allResults.filter((result) => result.type === typeMap[activeTab]);

        setResults(filteredResults);
        setLoading(false);
      }, 500);
    }, 280);

    return () => clearTimeout(debounceTimeout);
  }, [query, activeTab]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const trimmed = query.trim();
    if (!trimmed) {
      return;
    }

  };

  const statusText = useMemo(() => {
    if (loading) {
      return '결과를 불러오고 있어요...';
    }

    if (!query.trim()) {
      return '검색어를 입력해 검색을 시작하세요.';
    }

    if (results.length === 0) {
      return '일치하는 결과가 없어요. 다른 키워드나 필터를 시도해보세요.';
    }

    return `${results.length}개의 결과가 준비됐어요.`;
  }, [loading, query, results.length]);

  const renderResults = () => {
    if (loading) {
      return (
        <div className={styles.emptyState}>
          <AIIcon size={28} />
          <h3>검색 중이에요</h3>
          <p>AI가 팀의 지식을 살펴보고 있어요. 잠시만 기다려주세요.</p>
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

  return (
    <main className={`main-view ${styles.searchView}`}>
      <section className={styles.heroSection}>
        <div className={styles.heroTopRow}>
          <div className={styles.heroCopy}>
            <span className={styles.heroPill}>
              <AIIcon size={14} />
              통합 검색
            </span>
            <h1 className={styles.heroTitle}>필요한 대화와 파일을 한 번에 찾아보세요</h1>
            <p className={styles.heroDescription}>
              스마트 제안과 필터로 워크스페이스의 모든 정보를 빠르게 탐색할 수 있어요.
            </p>
          </div>
          <label
            className={`${styles.aiToggle} ${isAiSearchEnabled ? styles.aiToggleActive : ''}`}
            htmlFor="ai-search-toggle"
          >
            <input
              id="ai-search-toggle"
              type="checkbox"
              checked={isAiSearchEnabled}
              onChange={toggleAiSearch}
            />
            <span className={styles.aiToggleTrack}>
              <AIIcon size={16} />
              AI 검색
            </span>
            <span className={styles.aiToggleThumb} />
          </label>
        </div>
        <form className={styles.searchForm} onSubmit={handleSubmit}>
          <div className={styles.searchField}>
            <SearchIcon size={18} />
            <input
              type="text"
              placeholder={isAiSearchEnabled ? 'AI가 요약한 검색 결과를 받아보세요...' : '워크스페이스 전체에서 메시지, 파일, 멤버를 검색해보세요'}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
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
        <div className={styles.metaRow}>
          <div className={styles.tabGroup}>
            {TAB_ITEMS.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  type="button"
                  className={`${styles.filterChip} ${activeTab === tab.id ? styles.filterChipActive : ''}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <Icon size={14} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>
      <section className={styles.resultsSection}>
        <header className={styles.resultsHeader}>
          <div>
            <h2 className={styles.resultsTitle}>검색 결과</h2>
            <p className={styles.resultsMeta}>{statusText}</p>
          </div>
          <span className={styles.resultsTag}>{TAB_ITEMS.find((tab) => tab.id === activeTab)?.label}</span>
        </header>
        <div className={styles.resultsBody}>{renderResults()}</div>
      </section>
    </main>
  );
};
