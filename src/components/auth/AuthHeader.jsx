'use client';

import React from 'react';
import { Sun, Moon } from 'lucide-react';
import useStore from '@/core/store/useStore';
import styles from './SocialButton.module.css';
import { useMessages } from 'next-intl';

export default function AuthHeader() {
    const { isDarkMode, toggleDarkMode } = useStore();
    const messages = useMessages();
    const t = messages?.common;

    return (
        <header className={styles.header}>
            <button
                className={styles.themeToggle}
                onClick={toggleDarkMode}
                aria-label={t?.themeToggle}
            >
                {isDarkMode ? <Sun size={22} /> : <Moon size={22} />}
            </button>
        </header>
    );
}
