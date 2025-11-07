import { Users as UsersIcon } from '@/components/common/icons';
import styles from '../InviteFlow.module.css';

export const TargetSelector = ({ targets, selectedTargets, onToggleTarget, label, mode }) => {
  if (mode === 'guest') {
    return null;
  }

  return (
    <div className={styles.targets}>
      <span className={styles.targetsLabel}>{label}</span>
      <div className={styles.targetGrid}>
        {targets.map((target) => {
          const isSelected = selectedTargets.includes(target.id);
          return (
            <button
              key={target.id}
              type="button"
              className={`${styles.targetOption} ${isSelected ? styles.targetOptionActive : ''}`}
              onClick={() => onToggleTarget(target.id)}
            >
              <UsersIcon size={14} />
              <span>{target.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
