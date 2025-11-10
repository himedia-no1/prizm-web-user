// src/components/common/AnimatedCard.jsx
'use client';

import { useState, useEffect, useRef } from 'react';

// 이 컴포넌트는 IntersectionObserver를 사용해
// 뷰포트에 들어왔을 때 'inView' 클래스를 추가합니다.
// CSS에서 .inView 스타일에 애니메이션을 정의해야 합니다.

export default function AnimatedCard({ children, className, ...props }) {
    const [inView, setInView] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setInView(true);
                    observer.disconnect();
                }
            },
            {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px', // 원본 JS 옵션
            }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, []);

    // 애니메이션을 위한 스타일
    const style = {
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(30px)',
        transition: 'opacity 0.6s ease, transform 0.6s ease',
    };

    return (
        <div ref={ref} className={className} style={style} {...props}>
            {children}
        </div>
    );
}