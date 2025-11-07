import { Check, Trash2, CheckCheck } from 'lucide-react';
import styles from '../InboxModal.module.css';

export const InboxToolbar = ({ 
  showUnreadOnly, 
  onToggleUnreadFilter,
  selectedCount,
  onMarkAsRead,
  onDelete,
  onMarkAllRead,
  strings 
}) => {
  return (
    <div className={styles['inbox-toolbar']}>
      <label className={styles['inbox-filter']}>
        <input
          type="checkbox"
          checked={showUnreadOnly}
          onChange={(e) => onToggleUnreadFilter(e.target.checked)}
        />
        {strings.filters?.unreadOnly ?? 'Unread only'}
      </label>

      <div className={styles['inbox-actions']}>
        {selectedCount > 0 && (
          <>
            <button onClick={onMarkAsRead} className={styles['inbox-action-btn']}>
              <Check size={16} />
              {strings.actions?.markAsRead ?? 'Mark as read'}
            </button>
            <button onClick={onDelete} className={`${styles['inbox-action-btn']} ${styles.delete}`}>
              <Trash2 size={16} />
              {strings.actions?.delete ?? 'Delete'}
            </button>
          </>
        )}
        <button onClick={onMarkAllRead} className={styles['inbox-action-btn']}>
          <CheckCheck size={16} />
          {strings.actions?.markAllRead ?? 'Mark all as read'}
        </button>
      </div>
    </div>
  );
};
