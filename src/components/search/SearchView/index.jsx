export const SearchView = () => (
  <main className="main-view search-view">
    <header className="view-header">
      <h2>Search Workspace</h2>
    </header>
    <div className="view-content">
      <div className="settings-form-group" style={{ marginBottom: '1.5rem' }}>
        <input type="text" placeholder="워크스페이스 전체에서 메시지, 파일 검색..." />
      </div>
      <p style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>
        검색어를 입력하세요.
      </p>
    </div>
  </main>
);
