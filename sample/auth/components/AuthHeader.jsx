import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useThemeStore } from '@/store/themeStore';
import styles from '../css/SocialButton.module.css';

export default function AuthHeader() {
    const { isDark, toggleTheme } = useThemeStore();

    return (
        <header className={styles.header}>
            <button
                className={styles.themeToggle}
                onClick={toggleTheme}
                aria-label="테마 전환"
            >
                {isDark ? <Sun size={22} /> : <Moon size={22} />}
            </button>
        </header>
    );
}
