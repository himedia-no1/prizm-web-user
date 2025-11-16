import { useMessages } from 'next-intl';
import { useState, useRef, useEffect } from 'react';
import { Globe } from 'lucide-react';
import styles from './LanguageSelector.module.css';

export default function LanguageSelector({ locale, onLocaleChange, variant = 'default' }) {
  const messages = useMessages();
  const t = messages?.common;

  const LANGUAGES = [
    { code: 'ko', label: t?.korean, flag: '🇰🇷' },
    { code: 'en', label: t?.english, flag: '🇺🇸' },
    { code: 'ja', label: t?.japanese, flag: '🇯🇵' },
    { code: 'fr', label: t?.french, flag: '🇫🇷' },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const currentLanguage = LANGUAGES.find((lang) => lang.code === locale) || LANGUAGES[0];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleSelect = (code) => {
    onLocaleChange(code);
    setIsOpen(false);
  };

  return (
    <div className={`${styles.languageSelector} ${styles[variant]}`} ref={dropdownRef}>
      <button
        type="button"
        className={styles.trigger}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Select language"
      >
        <Globe size={16} />
        <span>{currentLanguage.label}</span>
      </button>

      {isOpen && (
        <div className={styles.dropdown}>
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              type="button"
              className={`${styles.option} ${lang.code === locale ? styles.active : ''}`}
              onClick={() => handleSelect(lang.code)}
            >
              <span className={styles.flag}>{lang.flag}</span>
              <span>{lang.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
