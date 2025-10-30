'use client';

import React from 'react';
import { Sun, Moon } from 'lucide-react';
import useStore from '@/store/useStore';
import styles from './SocialButton.module.css';

export default function AuthHeader() {
    const { isDarkMode, toggleDarkMode } = useStore();

    return (
        <header className={styles.header}>
            <button
                className={styles.themeToggle}
                onClick={toggleDarkMode}
                aria-label="테마 전환"
            >
                {isDarkMode ? <Sun size={22} /> : <Moon size={22} />}
            </button>
        </header>
    );
}
