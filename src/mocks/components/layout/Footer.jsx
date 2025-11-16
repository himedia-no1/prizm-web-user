// src/components/layout/Footer.jsx
import Link from 'next/link';
import Image from 'next/image';
import { Github, Twitter, Linkedin } from 'lucide-react';
import styles from '@/styles/Footer.module.css';

export default function Footer() {
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

                <div className={styles.footerSection}>
                    <h4>Product</h4>
                    <ul>
                        <li><Link href="#features">Features</Link></li>
                        <li><Link href="#integrations">Integrations</Link></li>
                        <li><Link href="#pricing">Pricing</Link></li>
                        <li><Link href="#changelog">Changelog</Link></li>
                    </ul>
                </div>

                <div className={styles.footerSection}>
                    <h4>Resources</h4>
                    <ul>
                        <li><Link href="#docs">Documentation</Link></li>
                        <li><Link href="#api">API Reference</Link></li>
                        <li><Link href="#blog">Blog</Link></li>
                        <li><Link href="#community">Community</Link></li>
                    </ul>
                </div>

                <div className={styles.footerSection}>
                    <h4>Company</h4>
                    <ul>
                        <li><Link href="#about">About</Link></li>
                        <li><Link href="#careers">Careers</Link></li>
                        <li><Link href="#contact">Contact</Link></li>
                        <li><Link href="#privacy">Privacy</Link></li>
                    </ul>
                </div>
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