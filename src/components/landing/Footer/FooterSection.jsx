import Link from 'next/link';
import styles from './Footer.module.css';

export default function FooterSection({ title, links }) {
  return (
    <div className={styles.footerSection}>
      <h4>{title}</h4>
      <ul>
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
