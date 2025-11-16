'use client';

import { useMessages } from 'next-intl';
import { DirectoryFilters } from './DirectoryView/DirectoryFilters';
import { DirectoryTable } from './DirectoryView/DirectoryTable';
import { DirectoryPagination } from './DirectoryView/DirectoryPagination';
import styles from './DirectoryView.module.css';
import useDirectoryViewState from './DirectoryView/useDirectoryViewState';

const formatTemplate = (template, replacements = {}) => {
  if (!template) return '';
  return template.replace(/\{\{(\w+)\}\}/g, (_, key) => replacements[key] ?? '');
};

export const DirectoryView = ({ users = {}, onOpenUserProfile }) => {
  const messages = useMessages();
  const s = { ...(messages?.common ?? {}), ...messages };
  const directoryStrings = s.directory ?? {};
  const statusLabels = s.statusLabels ?? {};
  const fallbackStatusText = {
    online: s.online,
    offline: s.offline,
  };

  const getStatusLabel = (status) => {
    if (!status) return '';
    return statusLabels[status] ?? fallbackStatusText[status] ?? status.charAt(0).toUpperCase() + status.slice(1);
  };

  const {
    searchTerm,
    setSearchTerm,
    sortKey,
    setSortKey,
    pageSize,
    setPageSize,
    setCurrentPage,
    paginatedUsers,
    totalMembers,
    safePage,
    pageStartIndex,
    pageEndIndex,
    handlePageChange,
  } = useDirectoryViewState({ users });

  const handleOpenUser = (id) => {
    if (onOpenUserProfile) {
      onOpenUserProfile(id);
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handleSortChange = (event) => {
    setSortKey(event.target.value);
    setCurrentPage(1);
  };

  const handlePageSizeChange = (event) => {
    const value = Number(event.target.value) || 10;
    setPageSize(value);
    setCurrentPage(1);
  };

  const summaryText = formatTemplate(directoryStrings.pagination?.summary, {
    from: totalMembers === 0 ? 0 : pageStartIndex + 1,
    to: Math.min(totalMembers, pageEndIndex),
    total: totalMembers,
  });
  const fallbackText = formatTemplate('Showing {{from}}-{{to}} of {{total}} members', {
    from: totalMembers === 0 ? 0 : pageStartIndex + 1,
    to: Math.min(totalMembers, pageEndIndex),
    total: totalMembers,
  });

  return (
    <main className={`main-view ${styles.directoryView}`}>
      <header className="view-header">
        <h2>{directoryStrings.title ?? 'Directory'}</h2>
      </header>

      <div className="view-content">
        <DirectoryFilters
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
          sortKey={sortKey}
          onSortChange={handleSortChange}
          pageSize={pageSize}
          onPageSizeChange={handlePageSizeChange}
          strings={directoryStrings}
        />

        <div className={styles.directoryTableContainer}>
          <DirectoryTable
            users={paginatedUsers}
            strings={directoryStrings}
            onOpenUser={handleOpenUser}
            getStatusLabel={getStatusLabel}
          />
        </div>

        <DirectoryPagination
          safePage={safePage}
          totalMembers={totalMembers}
          pageStartIndex={pageStartIndex}
          pageEndIndex={pageEndIndex}
          summaryText={summaryText}
          fallbackText={fallbackText}
          onPageChange={handlePageChange}
          strings={directoryStrings}
        />
      </div>
    </main>
  );
};
