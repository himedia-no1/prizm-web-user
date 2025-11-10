// src/components/landing/CTA.jsx
import styles from '@/styles/CTA.module.css';

export default function CTA() {
    return (
        <section className={styles.cta}>
            <div className="container">
                <div className={styles.ctaContent}>
                    <h2>지금 바로 시작하세요</h2>
                    <p>5분 안에 팀 전체가 협업을 시작할 수 있습니다. 신용카드 불필요.</p>
                    <div className={styles.ctaActions}>
                        <a
                            href="https://app.prizm.run"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-large btn-primary"
                        >
                            무료로 시작하기
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}