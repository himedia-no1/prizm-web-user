// src/components/landing/Integrations.jsx
import styles from './Integrations.module.css';
import AnimatedCard from '@/components/common/AnimatedCard';
import { Github, Gitlab } from 'lucide-react'; // 1. Lucide 아이콘 import


// 2. Jira 아이콘은 Lucide에 없으므로 SVG로 직접 정의합니다.
const JiraIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.01 0C5.388 0 .016 5.36.016 11.984.016 15.353 1.58 18.35 4.115 20.25l7.901-7.889V.006h-.006Zm0 24c6.623 0 11.985-5.36 11.985-11.984C24.008 8.63 22.445 5.63 19.91 3.737L12.01 11.64v12.36Z"/>
    </svg>
);


export default function Integrations() {
    const integrationList = [
        // 3. 아이콘 컴포넌트를 적용합니다.
        { name: 'GitHub', icon: <Github /> },     // Lucide 아이콘 사용
        { name: 'GitLab', icon: <Gitlab /> },     // Lucide 아이콘 사용
    ];

    return (
        <section id="integrations" className={styles.integrations}>
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">이미 사용 중인 툴과 연결</h2>
                    <p className="section-description">
                        개발 워크플로우를 끊김없이 통합하세요
                    </p>
                </div>
                <div className={styles.integrationsGrid}>
                    {integrationList.map((item) => (
                        <AnimatedCard key={item.name} className={styles.integrationItem}>
                            <div className={styles.integrationLogo}>
                                {item.icon}
                            </div>
                            <span>{item.name}</span>
                        </AnimatedCard>
                    ))}
                </div>
            </div>
        </section>
    );
}