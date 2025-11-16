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
import { LeaveWorkspaceModal } from './LeaveWorkspaceModal';
import { MentionModalContent } from './MentionModalContent';
import { WorkspaceNotificationSettingsModal } from './WorkspaceNotificationSettingsModal';

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

const standaloneModals = [
  {
    type: 'profileSettings',
    factory: ({ dependencies, modalProps }) => (
      <ProfileSettingsModal {...modalProps} onClose={dependencies.closeModal} />
    ),
  },
  {
    type: 'userProfile',
    factory: ({ dependencies, modalProps }) => (
      <UserProfileModal {...modalProps} onClose={dependencies.closeModal} onCreateDM={dependencies.createDM} />
    ),
  },
  {
    type: 'aiAssistant',
    factory: ({ dependencies, modalProps }) => (
      <AIAssistantModal {...modalProps} onClose={dependencies.closeModal} />
    ),
  },
  {
    type: 'emojiPicker',
    factory: ({ dependencies, modalProps }) => (
      <EmojiPickerModal {...modalProps} onClose={dependencies.closeModal} />
    ),
  },
  {
    type: 'notifications',
    factory: ({ dependencies }) => <InboxModal isOpen={true} onClose={dependencies.closeModal} />,
  },
  {
    type: 'workspaceProfile',
    factory: ({ dependencies, modalProps }) => (
      <WorkspaceProfileModal isOpen={true} onClose={dependencies.closeModal} {...modalProps} />
    ),
  },
  {
    type: 'deactivateAccount',
    factory: ({ dependencies, modalProps }) => (
      <DeactivateAccountModal isOpen={true} onClose={dependencies.closeModal} {...modalProps} />
    ),
  },
  {
    type: 'deleteAccount',
    factory: ({ dependencies, modalProps }) => (
      <DeleteAccountModal isOpen={true} onClose={dependencies.closeModal} {...modalProps} />
    ),
  },
  {
    type: 'forwardMessage',
    factory: ({ dependencies, modalProps }) => (
      <MessageForwardModal isOpen={true} onClose={dependencies.closeModal} {...modalProps} />
    ),
  },
  {
    type: 'leaveWorkspace',
    factory: ({ dependencies, modalProps }) => (
      <LeaveWorkspaceModal isOpen={true} onClose={dependencies.closeModal} {...modalProps} />
    ),
  },
  {
    type: 'workspaceNotificationSettings',
    factory: ({ dependencies, modalProps }) => (
      <WorkspaceNotificationSettingsModal isOpen={true} onClose={dependencies.closeModal} {...modalProps} />
    ),
  },
];

const contentModals = [
  { type: 'addChannel', factory: ({ modalProps }) => <AddChannelModalContent {...modalProps} /> },
  { type: 'pinned', factory: ({ modalProps }) => <PinnedModalContent {...modalProps} /> },
  {
    type: 'threads',
    factory: ({ dependencies, modalProps }) => (
      <ThreadsModalContent onOpenThread={dependencies.openThread} {...modalProps} />
    ),
  },
  { type: 'info', factory: ({ modalProps }) => <InfoModalContent {...modalProps} /> },
  {
    type: 'inviteMember',
    factory: ({ modalProps }) => <InviteFlowContent mode="member" {...modalProps} />,
  },
  {
    type: 'inviteGuest',
    factory: ({ modalProps }) => <InviteFlowContent mode="guest" {...modalProps} />,
  },
  {
    type: 'inviteResult',
    factory: ({ modalProps, dependencies }) => (
      <InviteResultContent {...modalProps} onClose={dependencies.closeModal} />
    ),
  },
  {
    type: 'members',
    factory: ({ modalProps, dependencies }) => (
      <MembersModalContent
        {...modalProps}
        onInviteGuest={
          modalProps.permissions?.canInviteMembers ? dependencies.buildInviteGuestHandler(modalProps) : undefined
        }
      />
    ),
  },
  { type: 'search', factory: ({ modalProps }) => <SearchModalContent {...modalProps} /> },
  { type: 'createCategory', factory: ({ modalProps }) => <CreateCategoryModalContent {...modalProps} /> },
  { type: 'fileUpload', factory: ({ modalProps }) => <FileUploadModalContent {...modalProps} /> },
  { type: 'channelFiles', factory: ({ modalProps }) => <ChannelFilesModalContent {...modalProps} /> },
  { type: 'channelSettings', factory: ({ modalProps }) => <ChannelSettingsModalContent {...modalProps} /> },
  { type: 'mention', factory: ({ modalProps }) => <MentionModalContent {...modalProps} /> },
];

standaloneModals.forEach(({ type, factory }) => registerStandaloneModal(type, factory));
contentModals.forEach(({ type, factory }) => registerContentModal(type, factory));
