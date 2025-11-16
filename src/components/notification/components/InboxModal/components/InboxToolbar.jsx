import { Check, Trash2, CheckCheck } from 'lucide-react';
import styles from '../../InboxModal.module.css';

export const InboxToolbar = ({
  showUnreadOnly,
  onToggleUnreadFilter,
  selectedCount,
  onMarkAsRead,
  onDelete,
  onMarkAllRead,
  strings,
}) => (
  <div className={styles.toolbar}>
    <label className={styles.filter}>
      <input
        type="checkbox"
        checked={showUnreadOnly}
        onChange={(e) => onToggleUnreadFilter?.(e.target.checked)}
      />
      {strings.filters?.unreadOnly ?? 'Unread only'}
    </label>

    <div className={styles.actions}>
      {selectedCount > 0 && (
        <>
          <button onClick={onMarkAsRead} className={styles.actionBtn}>
            <Check size={16} />
            {strings.actions?.markAsRead ?? 'Mark as read'}
          </button>
          <button onClick={onDelete} className={`${styles.actionBtn} ${styles.actionBtnDelete}`}>
            <Trash2 size={16} />
            {strings.actions?.delete ?? 'Delete'}
          </button>
        </>
      )}
      <button onClick={onMarkAllRead} className={styles.actionBtn}>
        <CheckCheck size={16} />
        {strings.actions?.markAllRead ?? 'Mark all as read'}
      </button>
    </div>
  </div>
);
