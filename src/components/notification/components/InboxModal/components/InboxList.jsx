import styles from '../../InboxModal.module.css';

export const InboxList = ({
  notifications,
  selectedIds,
  onToggleSelection,
  formatTimestamp,
  loading,
  emptyMessage,
}) => {
  if (loading) {
    return (
      <div className={styles.loading}>
        <div className="spinner" />
      </div>
    );
  }

  if (notifications.length === 0) {
    return <div className={styles.empty}>{emptyMessage}</div>;
  }

  return (
    <div className={styles.list}>
      {notifications.map((notif) => (
        <div
          key={notif.id}
          className={`${styles.item} ${notif.read ? styles.read : styles.unread} ${
            selectedIds.includes(notif.id) ? styles.selected : ''
          }`}
        >
          <input
            type="checkbox"
            checked={selectedIds.includes(notif.id)}
            onChange={() => onToggleSelection(notif.id)}
            className={styles.checkbox}
          />
          <div className={styles.itemContent}>
            <div className={styles.itemHeader}>
              <strong>{notif.title}</strong>
              {notif.important && <span className={styles.badgeImportant}>!</span>}
            </div>
            <div className={styles.itemMessage}>{notif.message}</div>
            <div className={styles.itemMeta}>{formatTimestamp(notif.timestamp)}</div>
          </div>
        </div>
      ))}
    </div>
  );
};
