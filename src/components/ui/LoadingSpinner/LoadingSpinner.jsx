import styles from './LoadingSpinner.module.css';

/**
 * 공통 LoadingSpinner 컴포넌트
 *
 * @param {Object} props
 * @param {'sm' | 'md' | 'lg'} props.size - 크기
 * @param {boolean} props.fullScreen - 전체 화면 표시 여부
 * @param {string} props.className - 추가 클래스
 */
export const LoadingSpinner = ({
  size = 'md',
  fullScreen = false,
  className = '',
  ...props
}) => {
  const spinner = (
    <div
      className={`${styles.spinner} ${styles[`spinner--${size}`]} ${className}`}
      {...props}
    />
  );

  if (fullScreen) {
    return <div className={styles.spinner__container}>{spinner}</div>;
  }

  return spinner;
};
