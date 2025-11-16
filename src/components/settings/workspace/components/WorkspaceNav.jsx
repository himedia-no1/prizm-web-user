import styles from '../WorkspaceSettings.module.css';

export const WorkspaceNav = ({ items, activeTab, onTabChange, strings }) => {
  return (
    <nav className={styles.nav}>
      {items.map(({ id, icon: Icon, labelKey }) => (
        <button
          key={id}
          onClick={() => onTabChange(id)}
          className={`${styles.navItem} ${activeTab === id ? styles.navItemActive : ''}`}
        >
          <Icon size={18} />
          <span>{strings[labelKey] ?? id}</span>
        </button>
      ))}
    </nav>
  );
};
