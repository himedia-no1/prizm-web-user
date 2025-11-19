'use client';

import { Users as UsersIcon, X } from '@/components/common/icons';
import styles from '../InviteFlow.module.css';

export const SelectedUsersList = ({ users, onRemoveUser, emptyMessage }) => {
  return (
    <div className={styles.selectedList}>
      {users.length === 0 && (
        <p className={styles.emptySelected}>{emptyMessage}</p>
      )}
      {users.map((user) => (
        <span key={user.id} className={styles.selectedChip}>
          <UsersIcon size={14} />
          <span>{user.email}</span>
          <button type="button" onClick={() => onRemoveUser(user.id)}>
            <X size={12} />
          </button>
        </span>
      ))}
    </div>
  );
};
