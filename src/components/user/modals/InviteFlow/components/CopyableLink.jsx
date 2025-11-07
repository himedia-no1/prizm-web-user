import { useState } from 'react';
import styles from '../InviteFlow.module.css';

export const CopyableLink = ({ url, label, copyLabel, copiedLabel }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard?.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      setCopied(false);
    }
  };

  return (
    <div className={styles.copyRow}>
      <code>{url}</code>
      <button type="button" onClick={handleCopy}>
        {copied ? copiedLabel ?? '복사됨' : copyLabel ?? label ?? '복사'}
      </button>
    </div>
  );
};
