'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useMessages } from 'next-intl';
import { channelService } from '@/core/api/services';
import { useUIStore } from '@/core/store/shared';
import styles from './AddChannelModalContent.module.css';

export const AddChannelModalContent = ({ categoryId }) => {
    const params = useParams();
    const router = useRouter();
    const workspaceId = params?.workspaceId;
    const messages = useMessages();
    const t = messages?.modals?.addChannel;
    const closeModal = useUIStore((state) => state.closeModal);
    const [channelName, setChannelName] = useState('');
    const [isCreating, setIsCreating] = useState(false);

    if (!t) {
        return null;
    }

    const handleCreate = async () => {
        if (!channelName.trim() || !workspaceId) return;

        setIsCreating(true);
        try {
            const result = await channelService.createChannel(workspaceId, {
                name: channelName,
                categoryId: categoryId || null,
            });
            closeModal();
            router.push(`/workspace/${workspaceId}/channel/${result.id}`);
        } catch (error) {
            console.error('Failed to create channel:', error);
        } finally {
            setIsCreating(false);
        }
    };

    return (
        <div>
            <div className="settings-form-group">
                <label htmlFor="channel-name">{t.nameLabel}</label>
                <input
                    id="channel-name"
                    type="text"
                    placeholder={t.namePlaceholder}
                    value={channelName}
                    onChange={(e) => setChannelName(e.target.value)}
                />
            </div>
            <button
                className={`profile-modal__save-button ${styles.button}`}
                onClick={handleCreate}
                disabled={isCreating || !channelName.trim()}
            >
                {isCreating ? (t.creating || 'Creating...') : t.submit}
            </button>
        </div>
    );
};
