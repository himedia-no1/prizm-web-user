import styles from './ListItem.module.css';

/**
 * 공통 ListItem 컴포넌트
 * 리스트 아이템에 사용되는 공통 컴포넌트
 *
 * @param {Object} props
 * @param {React.ReactNode} props.icon - 왼쪽 아이콘
 * @param {React.ReactNode} props.avatar - 왼쪽 아바타
 * @param {string} props.title - 제목
 * @param {string} props.subtitle - 부제목
 * @param {React.ReactNode} props.trailing - 오른쪽 컨텐츠 (배지, 버튼 등)
 * @param {boolean} props.isActive - 활성 상태
 * @param {boolean} props.disabled - 비활성화 상태
 * @param {Function} props.onClick - 클릭 핸들러
 * @param {string} props.className - 추가 클래스
 */
export const ListItem = ({
  icon,
  avatar,
  title,
  subtitle,
  trailing,
  isActive = false,
  disabled = false,
  onClick,
  className = '',
  ...props
}) => {
  const classNames = [
    styles.listItem,
    isActive && styles['listItem--active'],
    disabled && styles['listItem--disabled'],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const Component = onClick ? 'button' : 'div';

  return (
    <Component
      className={classNames}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {(icon || avatar) && (
        <div className={styles.listItem__leading}>
          {avatar || icon}
        </div>
      )}

      <div className={styles.listItem__content}>
        {title && <div className={styles.listItem__title}>{title}</div>}
        {subtitle && <div className={styles.listItem__subtitle}>{subtitle}</div>}
      </div>

      {trailing && (
        <div className={styles.listItem__trailing}>
          {trailing}
        </div>
      )}
    </Component>
  );
};
