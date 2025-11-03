import { useState, useEffect } from 'react';
import useStore from '@/store/useStore';
import SearchResultsList from '../SearchResultsList';
import styles from './SearchView.module.css';

const TABS = ['All', 'Messages', 'Files', 'Users'];

export const SearchView = () => {
  const { isAiSearchEnabled, toggleAiSearch } = useStore();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(TABS[0]);

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      if (query) {
        setLoading(true);
        // Mock search results
        setTimeout(() => {
          const allResults = [
            { id: 1, type: 'message', source: '#general', timestamp: '2025-11-04', title: 'Search Result 1', content: `This is a mock search result for <strong>${query}</strong>.` },
            { id: 2, type: 'file', source: 'document.pdf', timestamp: '2025-11-03', title: 'Search Result 2', content: `This is another mock search result for <strong>${query}</strong>.` },
            { id: 3, type: 'user', source: 'User 1', timestamp: '2025-11-02', title: 'User 1', content: `This is a user search result for <strong>${query}</strong>.` },
          ];

          const filteredResults = activeTab === 'All' 
            ? allResults 
            : allResults.filter(r => r.type === activeTab.toLowerCase().slice(0, -1));

          setResults(filteredResults);
          setLoading(false);
        }, 500);
      }
    }, 300); // 300ms debounce

    return () => clearTimeout(debounceTimeout);
  }, [query, activeTab]);

  return (
    <main className={`main-view ${styles.searchView}`}>
      <header className="view-header">
        <div className={styles.searchBar}>
            <input type="text" placeholder={isAiSearchEnabled ? "AI 기반으로 검색..." : "워크스페이스 전체에서 메시지, 파일 검색..."} value={query} onChange={(e) => setQuery(e.target.value)} />
            <div className={styles.aiToggle}>
                <label htmlFor="ai-search-toggle">AI 검색</label>
                <input id="ai-search-toggle" type="checkbox" checked={isAiSearchEnabled} onChange={toggleAiSearch} />
            </div>
        </div>
        <div className={styles.tabs}>
            {TABS.map(tab => (
                <button key={tab} className={`${styles.tab} ${activeTab === tab ? styles.activeTab : ''}`} onClick={() => setActiveTab(tab)}>{tab}</button>
            ))}
        </div>
      </header>
      <div className={styles.content}>
        {loading && <p>Loading...</p>}
        <SearchResultsList results={results} />
      </div>
    </main>
  );
};
