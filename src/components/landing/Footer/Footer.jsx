import Link from 'next/link';
import Image from 'next/image';
import { Github, Twitter, Linkedin } from 'lucide-react';
import FooterSection from './FooterSection';
import styles from './Footer.module.css';

export default function Footer() {
  const productLinks = [
    { href: '#features', label: 'Features' },
    { href: '#integrations', label: 'Integrations' },
    { href: '#pricing', label: 'Pricing' },
    { href: '#changelog', label: 'Changelog' },
  ];

  const resourceLinks = [
    { href: '#docs', label: 'Documentation' },
    { href: '#api', label: 'API Reference' },
    { href: '#blog', label: 'Blog' },
    { href: '#community', label: 'Community' },
  ];

  const companyLinks = [
    { href: '#about', label: 'About' },
    { href: '#careers', label: 'Careers' },
    { href: '#contact', label: 'Contact' },
    { href: '#privacy', label: 'Privacy' },
  ];

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerContent}`}>
        <div className={styles.footerSection}>
          <div className={styles.footerLogo}>
            <Image
              src="/icon.png"
              alt="Prizm Logo"
              width={40}
              height={40}
              className={styles.logoIconImg}
            />
            <span className={styles.logoText}>Prizm</span>
          </div>
          <p>개발자를 위한 AI 협업 메신저</p>
          <div className={styles.socialLinks}>
            <a href="#" aria-label="GitHub" className={styles.socialLink}>
              <Github size={20} />
            </a>
            <a href="#" aria-label="Twitter" className={styles.socialLink}>
              <Twitter size={20} />
            </a>
            <a href="#" aria-label="LinkedIn" className={styles.socialLink}>
              <Linkedin size={20} />
            </a>
          </div>
        </div>

        <FooterSection title="Product" links={productLinks} />
        <FooterSection title="Resources" links={resourceLinks} />
        <FooterSection title="Company" links={companyLinks} />
      </div>

      <div className={`container ${styles.footerBottom}`}>
        <p>&copy; 2025 Prizm. All rights reserved.</p>
        <div className={styles.footerLinks}>
          <Link href="#terms">Terms</Link>
          <Link href="#privacy">Privacy</Link>
          <Link href="#security">Security</Link>
        </div>
      </div>
    </footer>
  );
}
