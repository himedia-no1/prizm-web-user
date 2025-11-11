import Link from 'next/link';
import styles from './CTA.module.css';

export default function CTA() {
  return (
    <section className={styles.cta}>
      <div className="container">
        <div className={styles.ctaContent}>
          <h2>지금 바로 시작하세요</h2>
          <p>
            5분 안에 팀 전체가 협업을 시작할 수 있습니다. 신용카드 불필요.
          </p>
          <div className={styles.ctaActions}>
            <Link href="/login" className="btn btn-large btn-primary">
              무료로 시작하기
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}