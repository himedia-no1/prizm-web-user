'use client';

import { useState, useEffect, useRef } from 'react';
import { throttle } from '@/shared/utils/animations';
import styles from './Hero.module.css';

const codeLines = [
  '<span class="comment">// AI가 코드를 이해하고 팀과 소통합니다</span>',
  '<span class="keyword">const</span> <span class="variable">collaboration</span> = &lbrace;',
  '  <span class="property">codeReview</span>: <span class="string">\'AI-powered\'</span>,',
  '  <span class="property">search</span>: <span class="string">\'semantic\'</span>,',
  '  <span class="property">docs</span>: <span class="string">\'auto-generated\'</span>,',
  '  <span class="property">workflow</span>: <span class="string">\'automated\'</span>',
  '&rbrace;;',
  '',
  '<span class="keyword">export</span> <span class="keyword">default</span> <span class="variable">collaboration</span>;',
];

function useTypingEffect(ref, lines) {
  const [code, setCode] = useState('');
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setCode('');

          let lineIndex = 0;
          const typeLine = () => {
            if (lineIndex < lines.length) {
              setCode((prev) => prev + lines[lineIndex] + '\n');
              lineIndex++;
              setTimeout(typeLine, 100);
            }
          };
          typeLine();
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, lines]);
  return code;
}

export default function CodeAnimation() {
  const [parallaxOffset, setParallaxOffset] = useState(0);
  const codeRef = useRef(null);
  const typedCode = useTypingEffect(codeRef, codeLines);

  useEffect(() => {
    const handleScroll = throttle(() => {
      setParallaxOffset(window.scrollY * 0.5);
    }, 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={styles.heroVisual}
      style={{ transform: `translateY(${parallaxOffset}px)` }}
    >
      <div className={`${styles.codeWindow} ${styles.floatAnimation}`}>
        <div className={styles.windowHeader}>
          <div className={styles.windowControls}>
            <span className={`${styles.control} ${styles.close}`}></span>
            <span className={`${styles.control} ${styles.minimize}`}></span>
            <span className={`${styles.control} ${styles.maximize}`}></span>
          </div>
          <div className={styles.windowTitle}>team-chat.prizm</div>
        </div>
        <div className={styles.windowContent}>
          <pre>
            <code ref={codeRef} dangerouslySetInnerHTML={{ __html: typedCode }} />
          </pre>
        </div>
      </div>
    </div>
  );
}
