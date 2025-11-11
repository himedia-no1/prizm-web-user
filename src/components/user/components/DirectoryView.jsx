'use client';

import Image from 'next/image';
import { useMessages } from 'next-intl';
import { useMemo, useState } from 'react';
import { StatusIndicator } from '@/components/ui/StatusIndicator';
import { getPlaceholderImage } from '@/shared/utils/imagePlaceholder';
import styles from './DirectoryView.module.css';

const formatTemplate = (template, replacements = {}) => {
  if (!template) return '';
  return template.replace(/\{\{(\w+)\}\}/g, (_, key) => replacements[key] ?? '');
};

const statusOrder = {
  online: 1,
  away: 2,
  busy: 3,
  offline: 4,
};

const sortComparators = {
  nameAsc: (a, b) => a.name.localeCompare(b.name),
  joinDesc: (a, b) => {
    const aTime = a.joinedAt ? new Date(a.joinedAt).getTime() : 0;
    const bTime = b.joinedAt ? new Date(b.joinedAt).getTime() : 0;
    return bTime - aTime;
  },
  roleAsc: (a, b) => (a.role || '').localeCompare(b.role || ''),
  status: (a, b) => {
    const aOrder = statusOrder[a.status] ?? statusOrder.offline;
    const bOrder = statusOrder[b.status] ?? statusOrder.offline;
    if (aOrder === bOrder) {
      return a.name.localeCompare(b.name);
    }
    return aOrder - bOrder;
  },
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

  const [searchTerm, setSearchTerm] = useState('');
  const [sortKey, setSortKey] = useState('nameAsc');
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const allUsers = useMemo(() => Object.values(users), [users]);

  const filteredUsers = useMemo(() => {
    const normalizedTerm = searchTerm.trim().toLowerCase();
    const nextUsers = normalizedTerm
      ? allUsers.filter((user) => {
          const haystack = [
            user.name,
            user.realName,
            user.email,
            user.group,
            user.role,
            user.socialProvider,
          ]
            .filter(Boolean)
            .map((value) => value.toLowerCase());
          return haystack.some((value) => value.includes(normalizedTerm));
        })
      : allUsers.slice();

    const comparator = sortComparators[sortKey];
    if (comparator) {
      nextUsers.sort(comparator);
    }
    return nextUsers;
  }, [allUsers, searchTerm, sortKey]);

  const totalMembers = filteredUsers.length;
  const totalPages = Math.max(1, Math.ceil(totalMembers / pageSize));
  const safePage = Math.min(currentPage, totalPages);
  const pageStartIndex = (safePage - 1) * pageSize;
  const pageEndIndex = pageStartIndex + pageSize;
  const paginatedUsers = filteredUsers.slice(pageStartIndex, pageEndIndex);

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

  const handlePageChange = (delta) => {
    setCurrentPage((prev) => {
      const next = prev + delta;
      if (next < 1) return 1;
      if (next > totalPages) return totalPages;
      return next;
    });
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
