'use client';

import { useState } from 'react';
import { Link, Image, FileText } from '@/components/common/icons';
import useStrings from '@/hooks/useStrings';

export const ChannelFilesModalContent = () => {
    const s = useStrings();
    const [activeFileTab, setActiveFileTab] = useState('links');

    return (
        <div className="channel-files-modal">
            <div className="channel-files-tabs">
                <button
                    className={activeFileTab === 'links' ? 'active' : ''}
                    onClick={() => setActiveFileTab('links')}
                >
                    <Link size={16} />
                    {s.channelFilesTabLinks}
                </button>
                <button
                    className={activeFileTab === 'media' ? 'active' : ''}
                    onClick={() => setActiveFileTab('media')}
                >
                    <Image size={16} />
                    {s.channelFilesTabMedia}
                </button>
                <button
                    className={activeFileTab === 'docs' ? 'active' : ''}
                    onClick={() => setActiveFileTab('docs')}
                >
                    <FileText size={16} />
                    {s.channelFilesTabDocs}
                </button>
            </div>
            <div className="channel-files-content">
                {activeFileTab === 'links' && <p>{s.channelFilesEmptyLinks}</p>}
                {activeFileTab === 'media' && <p>{s.channelFilesEmptyMedia}</p>}
                {activeFileTab === 'docs' && <p>{s.channelFilesEmptyDocs}</p>}
            </div>
        </div>
    );
};
