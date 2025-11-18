'use client';

import styles from '../DirectoryView.module.css';

export const DirectoryPagination = ({
  safePage,
  totalMembers,
  pageStartIndex,
  pageEndIndex,
  summaryText,
  fallbackText,
  onPageChange,
  strings,
}) => (
  <div className={styles.directoryPagination}>
    <button
      type="button"
      onClick={() => onPageChange(-1)}
      disabled={safePage === 1}
    >
      {strings.pagination?.previous ?? 'Previous'}
    </button>
    <span className={styles.directoryPaginationSummary}>
      {summaryText || fallbackText}
    </span>
    <button
      type="button"
      onClick={() => onPageChange(1)}
      disabled={pageEndIndex >= totalMembers}
    >
      {strings.pagination?.next ?? 'Next'}
    </button>
  </div>
);

export default DirectoryPagination;
