'use client';

import { useState, useEffect } from 'react';
import { useMessages } from 'next-intl';
import { Search, X, ChevronUp, ChevronDown } from '@/components/common/icons';
import styles from './MessageSearchBar.module.css';

export const MessageSearchBar = ({
  onSearch,
  onClose,
  onNavigate,
  currentMatch = 0,
  totalMatches = 0
}) => {
  const messages = useMessages();
  const t = messages?.search;
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (query.trim()) {
      onSearch?.(query);
    }
  }, [query, onSearch]);

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose?.();
    } else if (e.key === 'Enter') {
      if (e.shiftKey) {
        onNavigate?.('prev');
      } else {
        onNavigate?.('next');
      }
    }
  };

  return (
    <div className={styles.searchBar}>
      <div className={styles.searchContainer}>
        <Search size={18} className={styles.searchIcon} />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={t?.inChannelPlaceholder || 'Search in this channel...'}
          className={styles.searchInput}
          autoFocus
        />

        {totalMatches > 0 && (
          <div className={styles.matchCounter}>
            {currentMatch} / {totalMatches}
          </div>
        )}

        <div className={styles.navigationButtons}>
          <button
            onClick={() => onNavigate?.('prev')}
            disabled={totalMatches === 0}
            className={styles.navButton}
            title={t?.previousMatch || 'Previous match'}
          >
            <ChevronUp size={18} />
          </button>
          <button
            onClick={() => onNavigate?.('next')}
            disabled={totalMatches === 0}
            className={styles.navButton}
            title={t?.nextMatch || 'Next match'}
          >
            <ChevronDown size={18} />
          </button>
        </div>

        <button
          onClick={onClose}
          className={styles.closeButton}
          title={t?.close || 'Close'}
        >
          <X size={18} />
        </button>
      </div>

      {query && totalMatches === 0 && (
        <div className={styles.noResults}>
          {t?.inChannelNoResults || 'No results found'}
        </div>
      )}
    </div>
  );
};
