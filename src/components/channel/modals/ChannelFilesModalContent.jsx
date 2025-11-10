'use client';

import React, { useState } from 'react';
import useStrings from '@/shared/hooks/useStrings';
import { FileText } from '@/components/common/icons';

export const ChannelFilesModalContent = ({ files = [], users = {} }) => {
    const s = useStrings();
    const [activeFileTab, setActiveFileTab] = useState('files');
    const strings = s.modals.genericModal.channelFiles;

    return (
        <div className="channel-files-modal">
            <div className="channel-files-tabs">
                <button
                    className={activeFileTab === 'files' ? 'active' : ''}
                    onClick={() => setActiveFileTab('files')}
                >
                    <FileText size={16} />
                    {strings.filesTab}
                </button>
            </div>
            <div className="channel-files-content">
                {files.length > 0 ? (
                    <div className="channel-files-grid">
                        {files.map((file) => {
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