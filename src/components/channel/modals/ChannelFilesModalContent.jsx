'use client';

import React, { useState, useMemo } from 'react';
import { useMessages } from 'next-intl';
import { FileText, LayoutGrid, Image, Link } from '@/components/common/icons';

const TABS = [
    { id: 'all', label: '전체', icon: LayoutGrid },
    { id: 'files', label: '파일', icon: FileText },
    { id: 'media', label: '미디어', icon: Image },
    { id: 'links', label: '링크', icon: Link },
];

const MEDIA_EXTENSIONS = ['png', 'jpg', 'jpeg', 'gif', 'svg'];
const FILE_EXTENSIONS = ['pdf', 'txt', 'doc', 'docx', 'xls', 'xlsx', 'hwp', 'zip'];

export const ChannelFilesModalContent = ({ files = [], users = {} }) => {
    const messages = useMessages();
    const s = { ...(messages?.common ?? {}), ...messages };
    const [activeFileTab, setActiveFileTab] = useState('all');
    const strings = s.modals.genericModal.channelFiles;

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
                {TABS.map(tab => {
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
                                            {strings.uploadedBy} {uploader?.name ?? strings.unknownUser} • {file.size}
                                        </p>
                                    </div>
                                    <button className="channel-file-action">{strings.download}</button>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <p>{strings.noFiles}</p>
                )}
            </div>
        </div>
    );
};
