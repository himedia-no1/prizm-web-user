// src/components/landing/Features.jsx
import Link from 'next/link';
import styles from './Features.module.css';
import AnimatedCard from '@/components/common/AnimatedCard'; // 방금 만든 공통 컴포넌트

export default function Features() {
    const featuresList = [
        { icon: '🤖', title: 'AI 코드 어시스턴트', desc: '코드 리뷰, 버그 탐지, 리팩토링 제안까지 AI가 실시간으로 지원합니다.' },
        { icon: '🔍', title: '시맨틱 검색', desc: '코드, 문서, 대화를 의미 기반으로 검색하여 필요한 정보를 즉시 찾습니다.' },
        { icon: '📝', title: '자동 문서화', desc: '코드와 대화에서 자동으로 문서를 생성하고 지식 베이스를 구축합니다.' },
        { icon: '🔗', title: 'Git 통합', desc: 'PR, 커밋, 이슈를 채팅에서 바로 확인하고 관리하세요.' },
        { icon: '⚡', title: '워크플로우 자동화', desc: '반복 작업을 자동화하고 CI/CD 파이프라인과 연동합니다.' },
        { icon: '🔐', title: 'Enterprise 보안', desc: 'End-to-end 암호화와 SSO로 기업 수준의 보안을 제공합니다.' },
    ];

    return (
        <section id="features" className={styles.features}>
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">AI</h2>
                    <p className="section-description">
                        코드 중심 워크플로우를 위해 설계된 협업 도구
                    </p>
                </div>
                <div className={styles.featuresGrid}>
                    {featuresList.map((feature) => (
                        <AnimatedCard key={feature.title} className={styles.featureCard}>
                            <div className={styles.featureIcon}>{feature.icon}</div>
                            <h3>{feature.title}</h3>
                            <p>{feature.desc}</p>
                            <Link href="#" className={styles.featureLink}>
                                자세히 보기 →
                            </Link>
                        </AnimatedCard>
                    ))}
                </div>
            </div>
        </section>
    );
}