'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { useMessages } from 'next-intl';
import { channelService } from '@/core/api/services';
import { useUIStore } from '@/core/store/shared';
import { useWorkspaceStore } from '@/core/store/workspace';
import styles from './CreateCategoryModalContent.module.css';

export const CreateCategoryModalContent = (props) => {
    const params = useParams();
    const workspaceId = params?.workspaceId;
    const messages = useMessages();
    const s = { ...(messages?.common ?? {}), ...messages };
    const closeModal = useUIStore((state) => state.closeModal);
    const [categoryName, setCategoryName] = useState('');
    const [isCreating, setIsCreating] = useState(false);

    const handleCreate = async () => {
        if (!categoryName.trim() || !workspaceId) return;

        setIsCreating(true);
        try {
            await channelService.createCategory(workspaceId, { name: categoryName });
            
            // ✅ 카테고리 목록 갱신
            const channelsData = await channelService.getAccessibleChannels(workspaceId);
            useWorkspaceStore.getState().setCategories(channelsData.categories || []);
            
            closeModal();
        } catch (error) {
            console.error('Failed to create category:', error);
        } finally {
            setIsCreating(false);
        }
    };

    return (
        <div>
            <div className="settings-form-group">
                <label htmlFor="cat-name">{s.modals.genericModal.categoryNameLabel}</label>
                <input
                    id="cat-name"
                    type="text"
                    placeholder={s.modals.genericModal.categoryNamePlaceholder}
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                />
            </div>
            <button
                className={`profile-modal__save-button ${styles.button}`}
                onClick={handleCreate}
                disabled={isCreating || !categoryName.trim()}
            >
                {isCreating ? (s.modals.genericModal.creating || 'Creating...') : s.modals.genericModal.createButton}
            </button>
        </div>
    );
};
