'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { useAuthStore } from '@/store/authStore';
import useStore from '@/store/useStore';
import SocialButton from '@/components/auth/SocialButton';
import { Github, Gitlab, Sun, Moon } from 'lucide-react';
import styles from './SocialAuthPage.module.css';

import { strings } from '@/constants/strings';

const GoogleIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            fill="#4285F4"
        />
        <path
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            fill="#34A853"
        />
        <path
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            fill="#FBBC05"
        />
        <path
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            fill="#EA4335"
        />
    </svg>
);

export default function SocialAuthPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { login, isAuthenticated } = useAuthStore();
    const { isDarkMode, toggleDarkMode, language, toggleLanguage } = useStore();

    useEffect(() => {
        const code = searchParams.get('code');
        const provider = searchParams.get('provider');

        if (code && provider) {
            login(provider, code);
        }
    }, [searchParams, login]);

    useEffect(() => {
        if (isAuthenticated) {
            router.push('/');
        }
    }, [isAuthenticated, router]);

    const theme = isDarkMode ? "dark" : "light";

    const s = strings[language];

    return (
        <div className={`${styles.page} ${styles[theme]}`}>
            <div className={styles.languageToggle}>
                <button onClick={toggleLanguage} className={language === 'ko' ? styles.active : ''}>{s.korean}</button>
                <button onClick={toggleLanguage} className={language === 'en' ? styles.active : ''}>{s.english}</button>
            </div>

            <button
                className={styles.themeToggle}
                onClick={toggleDarkMode}
                aria-label="테마 전환"
            >
                {isDarkMode ? <Sun size={22} /> : <Moon size={22} />}
            </button>

            <div className={styles.card}>
                <div className={styles.header}>
                    <Image src="/icon.png" alt="Prizm Logo" width={48} height={48} />
                    <h1>{s.welcome}</h1>
                    <p>{s.startWithSocial}</p>
                </div>

                <div className={styles.socialButtons}>
                    <SocialButton icon={<Github size={24} />} provider="GitHub" />
                    <SocialButton icon={<Gitlab size={24} />} provider="GitLab" />
                    <SocialButton icon={<GoogleIcon />} provider="Google" />
                </div>

                <div className={styles.footer}>
                    <p>
                        {s.terms.split(s.termsOfService)[0]}
                        <a href="#" className={styles.link}>
                            {s.termsOfService}
                        </a>
                        {' '}
                        {s.terms.includes(s.privacyPolicy) && s.privacyPolicy && (
                            <>
                                {s.terms.split(s.termsOfService)[1]?.split(s.privacyPolicy)[0]}
                                <a href="#" className={styles.link}>
                                    {s.privacyPolicy}
                                </a>
                                {s.terms.split(s.privacyPolicy)[1]}
                            </>
                        )}
                    </p>
                </div>
            </div>
        </div>
    );
}