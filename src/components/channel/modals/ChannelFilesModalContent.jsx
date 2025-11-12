'use client';

import React, { useState, useMemo } from 'react';
import { useMessages } from 'next-intl';
import { FileText, LayoutGrid, Image, Link } from '@/components/common/icons';

const getTabs = (t) => [
    { id: 'all', label: t.tabAll, icon: LayoutGrid },
    { id: 'files', label: t.tabFiles, icon: FileText },
    { id: 'media', label: t.tabMedia, icon: Image },
    { id: 'links', label: t.tabLinks, icon: Link },
];

const MEDIA_EXTENSIONS = ['png', 'jpg', 'jpeg', 'gif', 'svg'];
const FILE_EXTENSIONS = ['pdf', 'txt', 'doc', 'docx', 'xls', 'xlsx', 'hwp', 'zip'];

export const ChannelFilesModalContent = ({ files = [], users = {} }) => {
    const messages = useMessages();
    const t = messages?.modals?.channelFiles;
    const [activeFileTab, setActiveFileTab] = useState('all');
    
    if (!t) {
        return null;
    }

    const tabs = getTabs(t);

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
            // Links are not yet supported
            return [];
        }
        return [];
    }, [files, activeFileTab]);

    return (
        <div className="channel-files-modal">
            <div className="channel-files-tabs">
                {tabs.map(tab => {
                    const Icon = tab.icon;
                    return (
                        <button
                            key={tab.id}
                            className={activeFileTab === tab.id ? 'active' : ''}
                            onClick={() => setActiveFileTab(tab.id)}
                        >
                            <Icon size={16} />
                            {tab.label}
                        </button>
                    );
                })}
            </div>
            <div className="channel-files-content">
                {filteredFiles.length > 0 ? (
                    <div className="channel-files-grid">
                        {filteredFiles.map((file) => {
                            const uploader = users[file.uploadedBy];
                            return (
                                <div key={file.id} className="channel-file-card">
                                    <div className="channel-file-icon">
                                        <FileText size={18} />
                                    </div>
                                    <div className="channel-file-info">
                                        <span className="channel-file-title">{file.name}</span>
                                        <p className="channel-file-meta">
                                            {t.uploadedBy} {uploader?.name ?? t.unknownUser} • {file.size}
                                        </p>
                                    </div>
                                    <button className="channel-file-action">{t.download}</button>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <p>{t.noFiles}</p>
                )}
            </div>
        </div>
    );
};
