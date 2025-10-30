import React, { useState, useEffect } from "react";
import { Github, Gitlab, Sun, Moon } from "lucide-react";
import SocialButton from "@/features/auth/components/SocialButton";
import styles from "./css/SocialAuthPage.module.css";

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

const MicrosoftIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M11.4 11.4H2V2h9.4v9.4z" fill="#F25022" />
        <path d="M22 11.4h-9.4V2H22v9.4z" fill="#7FBA00" />
        <path d="M11.4 22H2v-9.4h9.4V22z" fill="#00A4EF" />
        <path d="M22 22h-9.4v-9.4H22V22z" fill="#FFB900" />
    </svg>
);

export default function SocialAuthPage() {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        setIsDark(prefersDark);
    }, []);

    const theme = isDark ? "dark" : "light";

    return (
        <div className={`${styles.page} ${styles[theme]}`}>
            <button
                className={styles.themeToggle}
                onClick={() => setIsDark(!isDark)}
                aria-label="테마 전환"
            >
                {isDark ? <Sun size={22} /> : <Moon size={22} />}
            </button>

            <div className={styles.card}>
                <div className={styles.header}>
                    <h1>환영합니다</h1>
                    <p>소셜 계정으로 간편하게 시작하세요</p>
                </div>

                <div className={styles.socialButtons}>
                    <SocialButton icon={<Github size={24} />} provider="GitHub" />
                    <SocialButton icon={<Gitlab size={24} />} provider="GitLab" />
                    <SocialButton icon={<GoogleIcon />} provider="Google" />
                </div>

                <div className={styles.footer}>
                    <p>
                        계속 진행하시면{" "}
                        <a href="#" className={styles.link}>
                            서비스 약관
                        </a>{" "}
                        및{" "}
                        <a href="#" className={styles.link}>
                            개인정보 처리방침
                        </a>
                        에<br />
                        동의하는 것으로 간주됩니다.
                    </p>
                </div>
            </div>
        </div>
    );
}
