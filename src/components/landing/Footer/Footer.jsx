'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Github, Twitter, Linkedin } from 'lucide-react';
import { useTranslations } from 'next-intl';
import FooterSection from './FooterSection';
import styles from './Footer.module.css';

export default function Footer() {
  const t = useTranslations('landing');

  const productLinks = [
    { href: '#features', label: t('features') },
    { href: '#integrations', label: t('integrations') },
    { href: '#pricing', label: 'Pricing' },
    { href: '#changelog', label: t('changelog') },
  ];

  const resourceLinks = [
    { href: '#docs', label: t('documentation') },
    { href: '#api', label: t('apiReference') },
    { href: '#blog', label: t('blog') },
    { href: '#community', label: t('community') },
  ];

  const companyLinks = [
    { href: '#about', label: t('about') },
    { href: '#careers', label: t('careers') },
    { href: '#contact', label: t('contact') },
    { href: '#privacy', label: t('privacy') },
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
          <p>{t('footerTagline')}</p>
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

        <FooterSection title={t('product')} links={productLinks} />
        <FooterSection title={t('resources')} links={resourceLinks} />
        <FooterSection title={t('company')} links={companyLinks} />
      </div>

      <div className={`container ${styles.footerBottom}`}>
        <p>&copy; 2025 Prizm. {t('allRightsReserved')}.</p>
        <div className={styles.footerLinks}>
          <Link href="#terms">{t('terms')}</Link>
          <Link href="#privacy">{t('privacy')}</Link>
          <Link href="#security">{t('security')}</Link>
        </div>
      </div>
    </footer>
  );
}
