'use client';

import { useState, useEffect, useMemo } from 'react';
import { X, Send } from 'lucide-react';
import useStrings from '@/hooks/useStrings';
import { messageService } from '@/api/services';
import styles from './MessageForwardModal.module.css';

export const MessageForwardModal = ({ isOpen, onClose, message, categories = [] }) => {
  const s = useStrings();
  const [selectedChannels, setSelectedChannels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (!isOpen) {
      setSelectedChannels([]);
      setSearchQuery('');
    }
  }, [isOpen]);

  const allChannels = useMemo(() => {
    const channels = [];
    categories.forEach((category) => {
      if (category.channels) {
        category.channels.forEach((channel) => {
          channels.push({
            ...channel,
            categoryName: category.name,
          });
        });
      }
    });
    return channels;
  }, [categories]);

  const filteredChannels = useMemo(() => {
    if (!searchQuery.trim()) return allChannels;
    
    const query = searchQuery.toLowerCase();
    return allChannels.filter((channel) =>
      channel.name.toLowerCase().includes(query) ||
      channel.categoryName.toLowerCase().includes(query)
    );
  }, [allChannels, searchQuery]);

  const toggleChannel = (channelId) => {
    setSelectedChannels((prev) =>
      prev.includes(channelId)
        ? prev.filter((id) => id !== channelId)
        : [...prev, channelId]
    );
  };

  const handleForward = async () => {
    if (selectedChannels.length === 0 || !message) return;

    setLoading(true);
    try {
      await messageService.forwardMessage(message.id, selectedChannels);
      onClose();
    } catch (error) {
      console.error('Forward failed:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen || !message) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <Send size={20} />
          <h2>{s.message.actions.forward}</h2>
          <button onClick={onClose} className={styles.closeBtn}>
            <X size={20} />
          </button>
        </div>

        <div className={styles.content}>
          <div className={styles.messagePreview}>
            <div className={styles.previewLabel}>{s.message.actions.forward}</div>
            <div className={styles.previewText}>{message.text}</div>
          </div>

          <div className={styles.search}>
            <input
              type="text"
              placeholder={s.message.forwardTo}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
          </div>

          <div className={styles.channelList}>
            {filteredChannels.length === 0 ? (
              <div className={styles.empty}>{s.modals.addChannel.empty || 'No channels found'}</div>
            ) : (
              filteredChannels.map((channel) => (
                <label key={channel.id} className={styles.channelItem}>
                  <input
                    type="checkbox"
                    checked={selectedChannels.includes(channel.id)}
                    onChange={() => toggleChannel(channel.id)}
                  />
                  <div className={styles.channelInfo}>
                    <span className={styles.channelName}>#{channel.name}</span>
                    <span className={styles.channelCategory}>{channel.categoryName}</span>
                  </div>
                </label>
              ))
            )}
          </div>

          {selectedChannels.length > 0 && (
            <div className={styles.selectedCount}>
              {selectedChannels.length} channel{selectedChannels.length > 1 ? 's' : ''} selected
            </div>
          )}
        </div>

        <div className={styles.footer}>
          <button onClick={onClose} className={styles.btnCancel}>
            {s.modals.deactivateAccount.cancelButton}
          </button>
          <button
            onClick={handleForward}
            className={styles.btnSend}
            disabled={loading || selectedChannels.length === 0}
          >
            <Send size={16} />
            {loading ? 'Forwarding...' : s.message.actions.forward}
          </button>
        </div>
      </div>
    </div>
  );
};
