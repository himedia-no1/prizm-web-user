'use client';

import useStore from '@/store/useStore';
import { GenericModal, ProfileSettingsModal, UserProfileModal, InviteMemberModal } from '@/components/modals';
import AIAssistantModal from '@/components/modals/AIAssistantModal';
import EmojiPickerModal from '@/components/modals/EmojiPickerModal';

const AppModals = () => {
  const { modalType, modalProps, closeModal, openThread, createDM } = useStore();

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
