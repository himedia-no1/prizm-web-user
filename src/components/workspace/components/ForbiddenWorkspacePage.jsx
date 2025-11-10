import Link from 'next/link';
import { Lock } from '@/components/common/icons';
import styles from './ForbiddenWorkspacePage.module.css';

export function ForbiddenWorkspacePage() {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.iconWrapper}>
          <Lock size={28} />
        </div>
        <h1 className={styles.title}>워크스페이스에 접근할 수 없어요</h1>
        <p className={styles.description}>
          최근에 접속한 워크스페이스 정보를 찾지 못했습니다.
          새 워크스페이스를 만들거나 초대 링크를 입력해 주세요.
        </p>

        <div className={styles.actions}>
          <Link href="/src/app/(app)/workspace/new" className={`${styles.button} ${styles.primary}`}>
            새 워크스페이스 생성
          </Link>
          <Link href="/src/app/(app)/workspace/new?mode=join" className={`${styles.button} ${styles.secondary}`}>
            초대 코드 입력하기
          </Link>
        </div>

        <div className={styles.meta}>
          <p>이미 참여 중인 워크스페이스가 있다면 초대 링크를 다시 확인해 주세요.</p>
          <Link href="/src/app/(app)/login" className={styles.link}>
            다른 계정으로 로그인
          </Link>
        </div>
      </div>
    </div>
  );
}
