'use client';

import { useState, useEffect, useMemo } from 'react';
import { X, Send } from 'lucide-react';
import useStrings from '@/hooks/useStrings';
import testApi from '@/api/test.api';
import './MessageForwardModal.css';

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
      await testApi.forwardMessage(message.id, selectedChannels);
      onClose();
    } catch (error) {
      console.error('Forward failed:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen || !message) return null;

  return (
    <div className="forward-modal-overlay" onClick={onClose}>
      <div className="forward-modal" onClick={(e) => e.stopPropagation()}>
        <div className="forward-modal-header">
          <Send size={20} />
          <h2>{s.message.actions.forward}</h2>
          <button onClick={onClose} className="forward-close-btn">
            <X size={20} />
          </button>
        </div>

        <div className="forward-modal-content">
          <div className="forward-message-preview">
            <div className="forward-preview-label">{s.message.actions.forward}</div>
            <div className="forward-preview-text">{message.text}</div>
          </div>

          <div className="forward-search">
            <input
              type="text"
              placeholder={s.message.forwardTo}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="forward-search-input"
            />
          </div>

          <div className="forward-channel-list">
            {filteredChannels.length === 0 ? (
              <div className="forward-empty">{s.modals.addChannel.empty || 'No channels found'}</div>
            ) : (
              filteredChannels.map((channel) => (
                <label key={channel.id} className="forward-channel-item">
                  <input
                    type="checkbox"
                    checked={selectedChannels.includes(channel.id)}
                    onChange={() => toggleChannel(channel.id)}
                  />
                  <div className="forward-channel-info">
                    <span className="forward-channel-name">#{channel.name}</span>
                    <span className="forward-channel-category">{channel.categoryName}</span>
                  </div>
                </label>
              ))
            )}
          </div>

          {selectedChannels.length > 0 && (
            <div className="forward-selected-count">
              {selectedChannels.length} channel{selectedChannels.length > 1 ? 's' : ''} selected
            </div>
          )}
        </div>

        <div className="forward-modal-footer">
          <button onClick={onClose} className="forward-btn-cancel">
            {s.modals.deactivateAccount.cancelButton}
          </button>
          <button
            onClick={handleForward}
            className="forward-btn-send"
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
