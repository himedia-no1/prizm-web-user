import Link from 'next/link';
import Image from 'next/image';
import LanguageSelector from '@/components/common/LanguageSelector';
import styles from './Header.module.css';

export default function DesktopNav({ navItems, activeSection, locale, onLocaleChange }) {
  return (
    <>
      <Link href="/" className={styles.logo}>
        <Image
          src="/icon.png"
          alt="Prizm Logo"
          width={40}
          height={40}
          className={styles.logoIconImg}
        />
        <span className={styles.logoText}>Prizm</span>
      </Link>

      <ul className={styles.navMenu}>
        {navItems.map((item) => (
          <li key={item.id}>
            <Link
              href={`#${item.id}`}
              className={activeSection === item.id ? styles.navActive : ''}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>

      <div className={styles.navActions}>
        <LanguageSelector locale={locale} onLocaleChange={onLocaleChange} />
        <Link href="/login" className="btn btn-primary">
          Start Free
        </Link>
      </div>
    </>
  );
}
