'use client';

import Image from 'next/image';
import { useMessages } from 'next-intl';
import { StatusIndicator } from '@/components/ui/StatusIndicator';
import { getPlaceholderImage } from '@/shared/utils/imagePlaceholder';
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
    currentPage,
    setCurrentPage,
    paginatedUsers,
    totalMembers,
    totalPages,
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

  return (
    <main className={`main-view ${styles.directoryView}`}>
      <header className="view-header">
        <h2>{directoryStrings.title ?? 'Directory'}</h2>
      </header>

      <div className="view-content">
        <div className={styles.directoryControls}>
          <div className={styles.directorySearch}>
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder={directoryStrings.searchPlaceholder ?? 'Search members...'}
            />
          </div>

          <div className={styles.directoryActions}>
            <label className={styles.directoryField}>
              <span>{directoryStrings.sortLabel ?? 'Sort'}</span>
              <select value={sortKey} onChange={handleSortChange}>
                {Object.entries(directoryStrings.sortOptions ?? {}).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
                {Object.keys(directoryStrings.sortOptions ?? {}).length === 0 && (
                  <>
                    <option value="nameAsc">Name A-Z</option>
                    <option value="joinDesc">Newest members</option>
                    <option value="roleAsc">Role</option>
                    <option value="status">Status</option>
                  </>
                )}
              </select>
            </label>

            <label className={styles.directoryField}>
              <span>{directoryStrings.pageSizeLabel ?? 'Rows per page'}</span>
              <select value={pageSize} onChange={handlePageSizeChange}>
                {[10, 25, 50].map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>

        <div className={styles.directoryTableContainer}>
          <table className={styles.directoryTable}>
            <thead>
              <tr>
                <th>{directoryStrings.columns?.name ?? 'Member'}</th>
                <th>{directoryStrings.columns?.email ?? 'Email'}</th>
                <th>{directoryStrings.columns?.provider ?? 'Provider'}</th>
                <th>{directoryStrings.columns?.joinedAt ?? 'Joined'}</th>
                <th>{directoryStrings.columns?.group ?? 'Group'}</th>
                <th>{directoryStrings.columns?.role ?? 'Role'}</th>
                <th>{directoryStrings.columns?.status ?? 'Status'}</th>
              </tr>
            </thead>
            <tbody>
              {paginatedUsers.length > 0 ? (
                paginatedUsers.map((user) => {
                  const avatarSrc =
                    user.avatar || getPlaceholderImage(40, user?.name?.[0] ?? '?');
                  return (
                  <tr
                    key={user.id}
                    className={styles.directoryRow}
                    onClick={() => handleOpenUser(user.id)}
                  >
                    <td>
                      <div className={styles.directoryMemberCell}>
                        <Image src={avatarSrc} alt={user.name} width={40} height={40} />
                        <div>
                          <span className={styles.directoryMemberName}>{user.realName || user.name}</span>
                          <span className={styles.directoryMemberHandle}>{user.name}</span>
                        </div>
                      </div>
                    </td>
                    <td>{user.email || '-'}</td>
                    <td>{user.socialProvider || '-'}</td>
                    <td>{user.joinedAt || '-'}</td>
                    <td>{user.group || '-'}</td>
                    <td>{user.role || '-'}</td>
                    <td>
                      <div className={styles.directoryStatusCell}>
                        <StatusIndicator status={user.status} className={styles.directoryStatusIndicator} />
                        <span>{getStatusLabel(user.status) || '-'}</span>
                      </div>
                    </td>
                  </tr>
                );
                })
              ) : (
                <tr className={styles.directoryEmptyRow}>
                  <td colSpan={7}>{directoryStrings.empty ?? 'No members found.'}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className={styles.directoryPagination}>
          <button
            type="button"
            onClick={() => handlePageChange(-1)}
            disabled={safePage === 1}
          >
            {directoryStrings.pagination?.previous ?? 'Previous'}
          </button>
          <span className={styles.directoryPaginationSummary}>
            {summaryText ||
              formatTemplate('Showing {{from}}-{{to}} of {{total}} members', {
                from: totalMembers === 0 ? 0 : pageStartIndex + 1,
                to: Math.min(totalMembers, pageEndIndex),
                total: totalMembers,
              })}
          </span>
          <button
            type="button"
            onClick={() => handlePageChange(1)}
            disabled={safePage === totalPages || totalMembers === 0}
          >
            {directoryStrings.pagination?.next ?? 'Next'}
          </button>
        </div>
      </div>
    </main>
  );
};
