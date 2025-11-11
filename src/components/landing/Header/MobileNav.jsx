import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import styles from './Header.module.css';

export default function MobileNav({
  navItems,
  activeSection,
  isMobileMenuOpen,
  onToggleMobileMenu,
  onCloseMobileMenu,
}) {
  return (
    <>
      <button
        className={styles.mobileMenuToggle}
        onClick={onToggleMobileMenu}
        aria-label="Toggle menu"
      >
        {isMobileMenuOpen ? <X /> : <Menu />}
      </button>

      <div
        className={`${styles.mobileMenu} ${
          isMobileMenuOpen ? styles.mobileOpen : ''
        }`}
      >
        <ul>
          {navItems.map((item) => (
            <li key={item.id}>
              <Link
                href={`#${item.id}`}
                onClick={onCloseMobileMenu}
                className={activeSection === item.id ? styles.navActive : ''}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className={styles.mobileActions}>
          <Link href="/login" className="btn btn-primary btn-full">
            Start Free
          </Link>
        </div>
      </div>
    </>
  );
}
