import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import CodeAnimation from './CodeAnimation';
import StatsCounter from './StatsCounter';
import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={`container ${styles.heroContainer}`}>
        <div className={styles.heroContent}>
          <div className={styles.heroBadge}>
            <span className={styles.badgeIcon}>✨</span>
            <span>AI-Powered Collaboration for Developers</span>
          </div>
          <h1 className={styles.heroTitle}>
            코드로 소통하고,
            <br />
            <span className={`${styles.gradientText} gradient-text-animated`}>
              AI로 협업하세요
            </span>
          </h1>
          <p className={styles.heroDescription}>
            개발자를 위해 설계된 AI 협업 메신저. 코드 리뷰, 스마트 검색, 자동
            문서화까지 하나의 플랫폼에서 모든 협업을 완성하세요.
          </p>
          <div className={styles.heroActions}>
            <Link href="/login" className="btn btn-large btn-primary">
              무료로 시작하기
              <ArrowRight size={20} />
            </Link>
          </div>
          <StatsCounter />
        </div>
        <CodeAnimation />
      </div>
    </section>
  );
}
