import { useState, useEffect } from 'react';
import useStore from '@/store/useStore';

export const SearchView = () => {
  const { isAiSearchEnabled, toggleAiSearch } = useStore();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      if (query) {
        setLoading(true);
        // Mock search results
        setTimeout(() => {
          setResults([
            { id: 1, title: `Result for "${query}" 1`, content: 'This is a mock search result.' },
            { id: 2, title: `Result for "${query}" 2`, content: 'This is another mock search result.' },
          ]);
          setLoading(false);
        }, 500);
      }
    }, 300); // 300ms debounce

    return () => clearTimeout(debounceTimeout);
  }, [query]);

  return (
    <main className="main-view search-view">
      <header className="view-header">
        <h2>Search Workspace</h2>
      </header>
      <div className="view-content">
        <div className="settings-form-group" style={{ marginBottom: '1.5rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <input type="text" placeholder={isAiSearchEnabled ? "AI 기반으로 검색..." : "워크스페이스 전체에서 메시지, 파일 검색..."} style={{ flexGrow: 1 }} value={query} onChange={(e) => setQuery(e.target.value)} />
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <label htmlFor="ai-search-toggle">AI 검색</label>
            <input id="ai-search-toggle" type="checkbox" checked={isAiSearchEnabled} onChange={toggleAiSearch} />
          </div>
        </div>
        {loading && <p>Loading...</p>}
        <div className="results">
          {results.map(result => (
            <div key={result.id} className="resultItem">
              <h3 className="resultTitle">{result.title}</h3>
              <p>{result.content}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};
