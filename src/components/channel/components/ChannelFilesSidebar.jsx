'use client';

import { useState, useMemo } from 'react';
import { useMessages } from 'next-intl';
import { FileText, LayoutGrid, Image, Link, X, Folder, Download } from '@/components/common/icons';
import styles from './ChannelFilesSidebar.module.css';

const getTabs = (t) => [
  { id: 'all', label: t.tabAll, icon: LayoutGrid },
  { id: 'files', label: t.tabFiles, icon: FileText },
  { id: 'media', label: t.tabMedia, icon: Image },
  { id: 'links', label: t.tabLinks, icon: Link },
];

const MEDIA_EXTENSIONS = ['png', 'jpg', 'jpeg', 'gif', 'svg', 'webp'];
const FILE_EXTENSIONS = ['pdf', 'txt', 'doc', 'docx', 'xls', 'xlsx', 'hwp', 'zip'];

export const ChannelFilesSidebar = ({ files = [], users = {}, onClose }) => {
  const messages = useMessages();
  const t = messages?.modals?.channelFiles;
  const [activeFileTab, setActiveFileTab] = useState('all');

  const filteredFiles = useMemo(() => {
    if (activeFileTab === 'all') {
      return files;
    }
    if (activeFileTab === 'media') {
      return files.filter(file => {
        const extension = file.name.split('.').pop().toLowerCase();
        return MEDIA_EXTENSIONS.includes(extension);
      });
    }
    if (activeFileTab === 'files') {
      return files.filter(file => {
        const extension = file.name.split('.').pop().toLowerCase();
        return FILE_EXTENSIONS.includes(extension);
      });
    }
    if (activeFileTab === 'links') {
      return [];
    }
    return [];
  }, [files, activeFileTab]);

  if (!t) {
    return null;
  }

  const tabs = getTabs(t);

  return (
    <aside className={`thread-sidebar ${styles.filesSidebar}`}>
      <header className="thread-header">
        <div>
          <h3 className="thread-header__title">
            <Folder size={18} />
            <span>{t?.title || 'Channel Files'}</span>
          </h3>
          <p className="thread-header__subtitle">
            {filteredFiles.length} {filteredFiles.length === 1 ? 'file' : 'files'}
          </p>
        </div>
        <button onClick={onClose} className="thread-header__close-button">
          <X size={18} />
        </button>
      </header>

      <div className={styles.tabContainer}>
        {tabs.map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              className={`${styles.tab} ${activeFileTab === tab.id ? styles.activeTab : ''}`}
              onClick={() => setActiveFileTab(tab.id)}
            >
              <Icon size={16} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      <div className={styles.fileList}>
        {filteredFiles.length > 0 ? (
          filteredFiles.map((file) => {
            const uploader = users[file.uploadedBy];
            const isMedia = MEDIA_EXTENSIONS.includes(file.name.split('.').pop().toLowerCase());

            return (
              <div key={file.id} className={styles.fileItem}>
                <div className={styles.fileIcon}>
                  {isMedia ? <Image size={24} /> : <FileText size={24} />}
                </div>
                <div className={styles.fileInfo}>
                  <span className={styles.fileName}>{file.name}</span>
                  <p className={styles.fileMeta}>
                    {uploader?.name ?? t.unknownUser} • {file.size}
                  </p>
                </div>
                <button className={styles.downloadButton} title={t.download}>
                  <Download size={18} />
                </button>
              </div>
            );
          })
        ) : (
          <div className={styles.emptyState}>
            <Folder size={48} className={styles.emptyIcon} />
            <p className={styles.emptyText}>
              {t?.noFiles || 'No files yet'}
            </p>
            <p className={styles.emptyHint}>
              Files shared in this channel will appear here
            </p>
          </div>
        )}
      </div>
    </aside>
  );
};
