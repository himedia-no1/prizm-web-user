import styles from './Avatar.module.css';

/**
 * 공통 Avatar 컴포넌트
 *
 * @param {Object} props
 * @param {string} props.src - 이미지 URL
 * @param {string} props.alt - 대체 텍스트
 * @param {'xs' | 'sm' | 'md' | 'lg' | 'xl'} props.size - 크기
 * @param {string} props.fallback - 이미지 로드 실패 시 표시할 텍스트 (이니셜 등)
 * @param {'online' | 'offline' | 'away' | 'busy'} props.status - 상태 표시
 * @param {boolean} props.showStatus - 상태 표시 여부
 * @param {string} props.className - 추가 클래스
 */
export const Avatar = ({
  src,
  alt = 'Avatar',
  size = 'md',
  fallback,
  status,
  showStatus = false,
  className = '',
  ...props
}) => {
  const classNames = [
    styles.avatar,
    styles[`avatar--${size}`],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={styles.avatar__container} {...props}>
      {src ? (
        <img
          src={src}
          alt={alt}
          className={classNames}
          onError={(e) => {
            // 이미지 로드 실패 시 fallback 처리
            e.target.style.display = 'none';
          }}
        />
      ) : fallback ? (
        <div className={`${classNames} ${styles.avatar__fallback}`}>
          {fallback.slice(0, 2).toUpperCase()}
        </div>
      ) : (
        <div className={`${classNames} ${styles.avatar__placeholder}`}>
          <svg width="60%" height="60%" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
          </svg>
        </div>
      )}

      {showStatus && status && (
        <span className={`${styles.avatar__status} ${styles[`avatar__status--${status}`]}`} />
      )}
    </div>
  );
};
