import styles from '../InboxModal.module.css';

export const InboxList = ({ 
  notifications, 
  selectedIds, 
  onToggleSelection, 
  formatTimestamp,
  loading,
  emptyMessage 
}) => {
  if (loading) {
    return (
      <div className={styles['inbox-loading']}>
        <div className="spinner" />
      </div>
    );
  }

  if (notifications.length === 0) {
    return <div className={styles['inbox-empty']}>{emptyMessage}</div>;
  }

  return (
    <div className={styles['inbox-list']}>
      {notifications.map((notif) => (
        <div
          key={notif.id}
          className={`${styles['inbox-item']} ${notif.read ? styles.read : styles.unread} ${
            selectedIds.includes(notif.id) ? styles.selected : ''
          }`}
        >
          <input
            type="checkbox"
            checked={selectedIds.includes(notif.id)}
            onChange={() => onToggleSelection(notif.id)}
            className={styles['inbox-checkbox']}
          />
          <div className={styles['inbox-item-content']}>
            <div className={styles['inbox-item-header']}>
              <strong>{notif.title}</strong>
              {notif.important && <span className={styles['inbox-badge-important']}>!</span>}
            </div>
            <div className={styles['inbox-item-message']}>{notif.message}</div>
            <div className={styles['inbox-item-meta']}>{formatTimestamp(notif.timestamp)}</div>
          </div>
        </div>
      ))}
    </div>
  );
};
