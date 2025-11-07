'use client';

import React from 'react';
import useStore from '@/store/useStore';
import useStrings from '@/hooks/useStrings';

// Standalone Modals
import { GenericModal } from './GenericModal';
import { UserProfileModal } from '@/components/user/modals/UserProfileModal';
import { WorkspaceProfileModal } from '@/components/workspace/modals/WorkspaceProfileModal';
import { DeactivateAccountModal, DeleteAccountModal } from './AccountManagementModals';
import { MessageForwardModal } from '@/components/channel/modals/MessageForwardModal';
import AIAssistantModal from './AIAssistantModal';
import EmojiPickerModal from './EmojiPickerModal';
import ProfileSettingsModal from './ProfileSettingsModal';
import InboxModal from '@/components/notification/components/InboxModal';

// Content-only Modals (to be rendered inside GenericModal)
import { AddChannelModalContent } from '@/components/channel/modals/AddChannelModalContent';
import { PinnedModalContent } from '@/components/channel/modals/PinnedModalContent';
import { ThreadsModalContent } from '@/components/channel/modals/ThreadsModalContent';
import { InfoModalContent } from '@/components/channel/modals/InfoModalContent';
import { InviteFlowContent } from './InviteFlowContent';
import { InviteResultContent } from './InviteResultContent';
import { MembersModalContent } from '@/components/user/modals/MembersModalContent';
import { SearchModalContent } from '@/components/search/modals/SearchModalContent';
import { CreateCategoryModalContent } from '@/components/channel/modals/CreateCategoryModalContent';
import { FileUploadModalContent } from './FileUploadModalContent';
import { ChannelFilesModalContent } from '@/components/channel/modals/ChannelFilesModalContent';
import { MentionModalContent } from './MentionModalContent';
import { AddDMModalContent } from '@/components/user/modals/AddDMModalContent';
import { AddAppModalContent } from './AddAppModalContent';
import { AddFavoriteModalContent } from '@/components/channel/modals/AddFavoriteModalContent';

const ModalManager = () => {
    const s = useStrings();
    const modalType = useStore((state) => state.modalType);
    const modalProps = useStore((state) => state.modalProps);
    const closeModal = useStore((state) => state.closeModal);
    const openThread = useStore((state) => state.openThread);
    const createDM = useStore((state) => state.createDM);
    const openModal = useStore((state) => state.openModal);

    if (!modalType) {
        return null;
    }

    const getTitle = (type) => s.modals?.titles[type] ?? '';

    // Standalone modals that control their own presentation
    const standaloneModals = {
        profileSettings: <ProfileSettingsModal {...modalProps} onClose={closeModal} />,
        userProfile: <UserProfileModal {...modalProps} onClose={closeModal} onCreateDM={createDM} />,
        aiAssistant: <AIAssistantModal {...modalProps} onClose={closeModal} />,
        emojiPicker: <EmojiPickerModal {...modalProps} onClose={closeModal} />,
        notifications: <InboxModal isOpen={true} onClose={closeModal} />,
        workspaceProfile: <WorkspaceProfileModal isOpen={true} onClose={closeModal} {...modalProps} />,
        deactivateAccount: <DeactivateAccountModal isOpen={true} onClose={closeModal} {...modalProps} />,
        deleteAccount: <DeleteAccountModal isOpen={true} onClose={closeModal} {...modalProps} />,
        forwardMessage: <MessageForwardModal isOpen={true} onClose={closeModal} {...modalProps} />,
    };

    if (standaloneModals[modalType]) {
        return standaloneModals[modalType];
    }

    // Content-only modals that are rendered within the GenericModal shell
    const buildInviteGuestHandler = () => {
        if (!modalProps.channelId || !modalProps.workspaceId) {
            return undefined;
        }
        return () => {
            openModal('generic', {
                type: 'inviteGuest',
                channelId: modalProps.channelId,
                channelName: modalProps.channelName,
                workspaceId: modalProps.workspaceId,
            });
        };
    };

    const contentModals = {
        addChannel: <AddChannelModalContent {...modalProps} />,
        pinned: <PinnedModalContent {...modalProps} />,
        threads: <ThreadsModalContent onOpenThread={openThread} {...modalProps} />,
        info: <InfoModalContent {...modalProps} />,
        inviteMember: <InviteFlowContent mode="member" {...modalProps} />,
        inviteGuest: <InviteFlowContent mode="guest" {...modalProps} />,
        inviteResult: <InviteResultContent {...modalProps} onClose={closeModal} />,
        members: (
            <MembersModalContent
                {...modalProps}
                onInviteGuest={modalProps.permissions?.canInviteMembers ? buildInviteGuestHandler() : undefined}
            />
        ),
        search: <SearchModalContent {...modalProps} />,
        createCategory: <CreateCategoryModalContent {...modalProps} />,
        fileUpload: <FileUploadModalContent {...modalProps} />,
        channelFiles: <ChannelFilesModalContent {...modalProps} />,
        mention: <MentionModalContent {...modalProps} />,
        addDM: <AddDMModalContent {...modalProps} />,
        addApp: <AddAppModalContent {...modalProps} />,
        addFavorite: <AddFavoriteModalContent {...modalProps} />,
    };

    // Handle 'generic' modal type with nested type in modalProps
    const effectiveModalType = modalType === 'generic' ? modalProps.type : modalType;

    if (contentModals[effectiveModalType]) {
        return (
            <GenericModal isOpen={true} onClose={closeModal} title={getTitle(effectiveModalType)}>
                {contentModals[effectiveModalType]}
            </GenericModal>
        );
    }

    return null;
};

export default ModalManager;
