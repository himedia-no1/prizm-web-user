import { useState, useEffect, useMemo } from 'react';
import { useMessages } from 'next-intl';
import { LayoutGrid, MessageSquare, FileText, Users as UsersIcon, Search as SearchIcon } from '@/components/common/icons';
import { searchService } from '@/core/api/services';
import SearchForm from './refactored/SearchForm';
import SearchTabs from './refactored/SearchTabs';
import SearchResultsHeader from './refactored/SearchResultsHeader';
import SearchResultsContainer from './refactored/SearchResultsContainer';
import styles from './SearchView.module.css';

const typeMap = {
  Messages: 'message',
  Files: 'file',
  Users: 'user',
};

export const SearchView = () => {
  const messages = useMessages();
  const t = messages.search;

  const TAB_ITEMS = useMemo(() => [
    { id: 'All', label: t.tabs.all, icon: LayoutGrid },
    { id: 'Messages', label: t.tabs.messages, icon: MessageSquare },
    { id: 'Files', label: t.tabs.files, icon: FileText },
    { id: 'Users', label: t.tabs.users, icon: UsersIcon },
  ], [t]);

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
            setError(t.error.description);
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
  }, [query, activeTab, t.error.description]);

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
    if (loading) return t.status.loading;
    if (!query.trim()) return t.status.prompt;
    if (error) return t.status.error;
    if (results.length === 0) return t.status.noResults;
    return t.status.resultsFound.replace('{count}', results.length);
  }, [loading, query, results.length, error, t]);

  return (
    <main className={`main-view ${styles.searchView}`}>
      <section className={styles.heroSection}>
        <div className={styles.heroTopRow}>
          <div className={styles.heroCopy}>
            <span className={styles.heroPill}>
              <SearchIcon size={14} />
              {t.heroPill}
            </span>
          </div>
        </div>
        <SearchForm
          query={query}
          onQueryChange={handleQueryChange}
          onSubmit={handleSubmit}
          placeholder={t.placeholder}
          submitButtonText={t.submitButton}
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
              translations={t}
            />
        </div>
      </section>
    </main>
  );
};