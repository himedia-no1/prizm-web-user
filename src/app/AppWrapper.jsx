'use client';

import useStore from '@/store/useStore';
import useDataStore from '@/store/dataStore';
import { 
  GenericModal, 
  ProfileSettingsModal, 
  UserProfileModal, 
  InviteMemberModal,
  InboxModal,
  WorkspaceProfileModal,
  DeactivateAccountModal,
  DeleteAccountModal,
  MessageForwardModal,
} from '@/components/modals';
import AIAssistantModal from '@/components/modals/AIAssistantModal';
import EmojiPickerModal from '@/components/modals/EmojiPickerModal';

const AppModals = () => {
  const { modalType, modalProps, closeModal, openThread, createDM, currentWorkspace } = useStore();
  const { categories } = useDataStore();

  if (!modalType) return null;

  const modals = {
    generic: (
      <GenericModal
        modalType={modalProps.type}
        modalProps={modalProps}
        onClose={closeModal}
        onOpenThread={openThread}
      />
    ),
    profileSettings: <ProfileSettingsModal {...modalProps} onClose={closeModal} />,
    userProfile: <UserProfileModal {...modalProps} onClose={closeModal} onCreateDM={createDM} />,
    aiAssistant: <AIAssistantModal {...modalProps} onClose={closeModal} />,
    emojiPicker: <EmojiPickerModal {...modalProps} onClose={closeModal} />,
    invite: <InviteMemberModal isOpen={true} onClose={closeModal} />,
    notifications: <InboxModal isOpen={true} onClose={closeModal} />,
    workspaceProfile: (
      <WorkspaceProfileModal
        isOpen={true}
        onClose={closeModal}
        workspaceId={currentWorkspace?.id}
        userId={modalProps.userId}
      />
    ),
    deactivateAccount: (
      <DeactivateAccountModal
        isOpen={true}
        onClose={closeModal}
        userId={modalProps.userId}
      />
    ),
    deleteAccount: (
      <DeleteAccountModal
        isOpen={true}
        onClose={closeModal}
        userId={modalProps.userId}
      />
    ),
    forwardMessage: (
      <MessageForwardModal
        isOpen={true}
        onClose={closeModal}
        message={modalProps.message}
        categories={categories}
      />
    ),
  };

  return modals[modalType] || null;
};

export default function AppWrapper({ children }) {
  return (
    <>
      {children}
      <AppModals />
    </>
  );
}
