'use client';

import { X } from '@/components/common/icons';

export const ThreadSidebarHeader = ({ title, subtitle, onClose }) => (
  <header className="thread-header">
    <div>
      <h3 className="thread-header__title">{title}</h3>
      <p className="thread-header__subtitle">{subtitle}</p>
    </div>
    <button onClick={onClose} className="thread-header__close-button">
      <X size={18} />
    </button>
  </header>
);

export default ThreadSidebarHeader;
