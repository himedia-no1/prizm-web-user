import Image from 'next/image';
import styles from './Spinner.module.css';

export const Spinner = () => (
  <div className={styles.spinnerContainer}>
    <Image src="/icon.png" alt="Prizm Logo" width={64} height={64} className={styles.spinner} />
  </div>
);
