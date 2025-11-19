'use client';

import styles from '../InviteFlow.module.css';

export const SearchResults = ({ users, onAddUser }) => {
  if (users.length === 0) return null;

  return (
    <div className={styles.searchResults}>
      {users.map((user) => (
        <button key={user.id} type="button" onClick={() => onAddUser(user)}>
          <span>{user.name}</span>
          <span className={styles.resultEmail}>{user.email}</span>
        </button>
      ))}
    </div>
  );
};
