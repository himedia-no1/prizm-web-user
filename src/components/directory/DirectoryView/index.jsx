'use client';

import { useMemo, useState } from 'react';
import { StatusIndicator } from '@/components/common/StatusIndicator';
import useStrings from '@/hooks/useStrings';
import './DirectoryView.css';

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
  const s = useStrings();
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
    <main className="main-view directory-view">
      <header className="view-header">
        <h2>{directoryStrings.title ?? 'Directory'}</h2>
      </header>

      <div className="view-content">
        <div className="directory-controls">
          <div className="directory-search">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder={directoryStrings.searchPlaceholder ?? 'Search members...'}
            />
          </div>

          <div className="directory-actions">
            <label className="directory-field">
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

            <label className="directory-field">
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

        <div className="directory-table-container">
          <table className="directory-table">
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
                paginatedUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="directory-row"
                    onClick={() => handleOpenUser(user.id)}
                  >
                    <td>
                      <div className="directory-member-cell">
                        <img src={user.avatar} alt={user.name} />
                        <div>
                          <span className="directory-member-name">{user.realName || user.name}</span>
                          <span className="directory-member-handle">{user.name}</span>
                        </div>
                      </div>
                    </td>
                    <td>{user.email || '-'}</td>
                    <td>{user.socialProvider || '-'}</td>
                    <td>{user.joinedAt || '-'}</td>
                    <td>{user.group || '-'}</td>
                    <td>{user.role || '-'}</td>
                    <td>
                      <div className="directory-status-cell">
                        <StatusIndicator status={user.status} className="directory-status-indicator" />
                        <span>{getStatusLabel(user.status) || '-'}</span>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="directory-empty-row">
                  <td colSpan={7}>{directoryStrings.empty ?? 'No members found.'}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="directory-pagination">
          <button
            type="button"
            onClick={() => handlePageChange(-1)}
            disabled={safePage === 1}
          >
            {directoryStrings.pagination?.previous ?? 'Previous'}
          </button>
          <span className="directory-pagination__summary">
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
