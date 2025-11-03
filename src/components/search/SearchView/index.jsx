import useStore from '@/store/useStore';

export const SearchView = () => {
  const { isAiSearchEnabled, toggleAiSearch } = useStore();

  return (
    <main className="main-view search-view">
      <header className="view-header">
        <h2>Search Workspace</h2>
      </header>
      <div className="view-content">
        <div className="settings-form-group" style={{ marginBottom: '1.5rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <input type="text" placeholder={isAiSearchEnabled ? "AI 기반으로 검색..." : "워크스페이스 전체에서 메시지, 파일 검색..."} style={{ flexGrow: 1 }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <label htmlFor="ai-search-toggle">AI 검색</label>
            <input id="ai-search-toggle" type="checkbox" checked={isAiSearchEnabled} onChange={toggleAiSearch} />
          </div>
          <button className="profile-modal__save-button">검색</button>
        </div>
        <p style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>
          검색어를 입력하세요.
        </p>
      </div>
    </main>
  );
};
