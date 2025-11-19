'use client';

import styles from './Button.module.css';

/**
 * 공통 Button 컴포넌트
 *
 * @param {Object} props
 * @param {'primary' | 'secondary' | 'channel' | 'favorite' | 'ghost' | 'danger'} props.variant - 버튼 스타일
 * @param {'sm' | 'md' | 'lg'} props.size - 버튼 크기
 * @param {boolean} props.isActive - 활성 상태
 * @param {React.ReactNode} props.icon - 아이콘 (왼쪽)
 * @param {React.ReactNode} props.iconRight - 아이콘 (오른쪽)
 * @param {boolean} props.disabled - 비활성화 상태
 * @param {boolean} props.fullWidth - 전체 너비
 * @param {string} props.className - 추가 클래스
 * @param {Function} props.onClick - 클릭 핸들러
 * @param {React.ReactNode} props.children - 버튼 텍스트/내용
 */
export const Button = ({
  variant = 'primary',
  size = 'md',
  isActive = false,
  icon,
  iconRight,
  disabled = false,
  fullWidth = false,
  className = '',
  onClick,
  children,
  ...props
}) => {
  const classNames = [
    styles.button,
    styles[`button--${variant}`],
    styles[`button--${size}`],
    isActive && styles['button--active'],
    fullWidth && styles['button--full-width'],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      className={classNames}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {icon && <span className={styles.button__icon}>{icon}</span>}
      {children && <span className={styles.button__text}>{children}</span>}
      {iconRight && <span className={styles.button__icon}>{iconRight}</span>}
    </button>
  );
};
