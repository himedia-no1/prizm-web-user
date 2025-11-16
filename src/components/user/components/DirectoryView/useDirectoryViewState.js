'use client';

import { useMemo, useState } from 'react';

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

export const useDirectoryViewState = ({ users = {} }) => {
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

  const handlePageChange = (delta) => {
    setCurrentPage((prev) => {
      const next = prev + delta;
      if (next < 1) return 1;
      if (next > totalPages) return totalPages;
      return next;
    });
  };

  return {
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
  };
};

export default useDirectoryViewState;
