'use client';

import styles from '../DirectoryView.module.css';

const DEFAULT_SORT_OPTIONS = [
  { value: 'nameAsc', label: 'Name A-Z' },
  { value: 'joinDesc', label: 'Newest members' },
  { value: 'roleAsc', label: 'Role' },
  { value: 'status', label: 'Status' },
];

export const DirectoryFilters = ({
  searchTerm,
  onSearchChange,
  sortKey,
  onSortChange,
  pageSize,
  onPageSizeChange,
  strings,
}) => {
  const sortOptionsEntries = Object.entries(strings.sortOptions ?? {});
  const sortOptions = sortOptionsEntries.length > 0 ? sortOptionsEntries : DEFAULT_SORT_OPTIONS.map(({ value, label }) => [value, label]);

  return (
    <div className={styles.directoryControls}>
      <div className={styles.directorySearch}>
        <input
          type="text"
          value={searchTerm}
          onChange={onSearchChange}
          placeholder={strings.searchPlaceholder ?? 'Search members...'}
        />
      </div>

      <div className={styles.directoryActions}>
        <label className={styles.directoryField}>
          <span>{strings.sortLabel ?? 'Sort'}</span>
          <select value={sortKey} onChange={onSortChange}>
            {sortOptions.map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </label>

        <label className={styles.directoryField}>
          <span>{strings.pageSizeLabel ?? 'Rows per page'}</span>
          <select value={pageSize} onChange={onPageSizeChange}>
            {[10, 25, 50].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </label>
      </div>
    </div>
  );
};

export default DirectoryFilters;
