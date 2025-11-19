'use client';

import { Search } from '@/components/common/icons';
import styles from '../InviteFlow.module.css';

export const UserSearchField = ({ searchTerm, onSearchChange, placeholder, label }) => {
  return (
    <>
      <label className={styles.fieldLabel} htmlFor="invite-search">
        {label}
      </label>
      <div className={styles.searchField}>
        <Search size={16} />
        <input
          id="invite-search"
          type="text"
          value={searchTerm}
          placeholder={placeholder}
          onChange={(event) => onSearchChange(event.target.value)}
        />
      </div>
    </>
  );
};
