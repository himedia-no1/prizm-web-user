'use client';
import { UserProfileModal } from '@/components/user/modals/UserProfileModal';
import { WorkspaceProfileModal } from '@/components/workspace/modals/WorkspaceProfileModal';
import { DeactivateAccountModal, DeleteAccountModal } from './AccountManagementModals';
import { MessageForwardModal } from '@/components/channel/modals/MessageForwardModal';
import AIAssistantModal from './AIAssistantModal';
import EmojiPickerModal from './EmojiPickerModal';
import ProfileSettingsModal from './ProfileSettingsModal';
import InboxModal from '@/components/notification/components/InboxModal';
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
import { ChannelSettingsModalContent } from '@/components/channel/modals/ChannelSettingsModalContent';
import { MentionModalContent } from './MentionModalContent';

const standaloneRegistry = new Map();
const contentRegistry = new Map();

export const registerStandaloneModal = (type, factory) => {
  standaloneRegistry.set(type, factory);
};

export const registerContentModal = (type, factory) => {
  contentRegistry.set(type, factory);
};

export const getStandaloneModal = (type, modalProps, dependencies) => {
  const factory = standaloneRegistry.get(type);
  return factory ? factory({ modalProps, dependencies }) : null;
};

export const getContentModal = (type, modalProps, dependencies) => {
  const factory = contentRegistry.get(type);
  return factory ? factory({ modalProps, dependencies }) : null;
};

registerStandaloneModal('profileSettings', ({ dependencies, modalProps }) => (
  <ProfileSettingsModal {...modalProps} onClose={dependencies.closeModal} />
));
registerStandaloneModal('userProfile', ({ dependencies, modalProps }) => (
  <UserProfileModal {...modalProps} onClose={dependencies.closeModal} onCreateDM={dependencies.createDM} />
));
registerStandaloneModal('aiAssistant', ({ dependencies, modalProps }) => (
  <AIAssistantModal {...modalProps} onClose={dependencies.closeModal} />
));
registerStandaloneModal('emojiPicker', ({ dependencies, modalProps }) => (
  <EmojiPickerModal {...modalProps} onClose={dependencies.closeModal} />
));
registerStandaloneModal('notifications', ({ dependencies }) => (
  <InboxModal isOpen={true} onClose={dependencies.closeModal} />
));
registerStandaloneModal('workspaceProfile', ({ dependencies, modalProps }) => (
  <WorkspaceProfileModal isOpen={true} onClose={dependencies.closeModal} {...modalProps} />
));
registerStandaloneModal('deactivateAccount', ({ dependencies, modalProps }) => (
  <DeactivateAccountModal isOpen={true} onClose={dependencies.closeModal} {...modalProps} />
));
registerStandaloneModal('deleteAccount', ({ dependencies, modalProps }) => (
  <DeleteAccountModal isOpen={true} onClose={dependencies.closeModal} {...modalProps} />
));
registerStandaloneModal('forwardMessage', ({ dependencies, modalProps }) => (
  <MessageForwardModal isOpen={true} onClose={dependencies.closeModal} {...modalProps} />
));

registerContentModal('addChannel', ({ modalProps }) => <AddChannelModalContent {...modalProps} />);
registerContentModal('pinned', ({ modalProps }) => <PinnedModalContent {...modalProps} />);
registerContentModal('threads', ({ dependencies, modalProps }) => (
  <ThreadsModalContent onOpenThread={dependencies.openThread} {...modalProps} />
));
registerContentModal('info', ({ modalProps }) => <InfoModalContent {...modalProps} />);
registerContentModal('inviteMember', ({ modalProps }) => (
  <InviteFlowContent mode="member" {...modalProps} />
));
registerContentModal('inviteGuest', ({ modalProps }) => (
  <InviteFlowContent mode="guest" {...modalProps} />
));
registerContentModal('inviteResult', ({ modalProps, dependencies }) => (
  <InviteResultContent {...modalProps} onClose={dependencies.closeModal} />
));
registerContentModal('members', ({ modalProps, dependencies }) => (
  <MembersModalContent
    {...modalProps}
    onInviteGuest={
      modalProps.permissions?.canInviteMembers ? dependencies.buildInviteGuestHandler(modalProps) : undefined
    }
  />
));
registerContentModal('search', ({ modalProps }) => <SearchModalContent {...modalProps} />);
registerContentModal('createCategory', ({ modalProps }) => <CreateCategoryModalContent {...modalProps} />);
registerContentModal('fileUpload', ({ modalProps }) => <FileUploadModalContent {...modalProps} />);
registerContentModal('channelFiles', ({ modalProps }) => <ChannelFilesModalContent {...modalProps} />);
registerContentModal('channelSettings', ({ modalProps }) => <ChannelSettingsModalContent {...modalProps} />);
registerContentModal('mention', ({ modalProps }) => <MentionModalContent {...modalProps} />);
