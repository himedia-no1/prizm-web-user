import styles from './EmptyState.module.css';

/**
 * 공통 EmptyState 컴포넌트
 * 데이터가 없을 때 표시하는 빈 상태 화면
 *
 * @param {Object} props
 * @param {React.ReactNode} props.icon - 아이콘
 * @param {string} props.title - 제목
 * @param {string} props.description - 설명
 * @param {React.ReactNode} props.action - 액션 버튼 (선택)
 * @param {string} props.className - 추가 클래스
 */
export const EmptyState = ({
  icon,
  title,
  description,
  action,
  className = '',
  ...props
}) => {
  return (
    <div className={`${styles.empty} ${className}`} {...props}>
      {icon && <div className={styles.empty__icon}>{icon}</div>}
      {title && <h3 className={styles.empty__title}>{title}</h3>}
      {description && <p className={styles.empty__description}>{description}</p>}
      {action && <div className={styles.empty__action}>{action}</div>}
    </div>
  );
};
