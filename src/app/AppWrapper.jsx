'use client';

import { AppProvider, useApp } from '@/contexts/AppContext';
import { GenericModal, ProfileSettingsModal, UserProfileModal } from '@/components/modals';

const AppModals = () => {
  const { modalType, modalProps, closeModal } = useApp();

  if (!modalType) return null;

  const modals = {
    generic: <GenericModal modalType={modalProps.type} onClose={closeModal} />,
    profileSettings: <ProfileSettingsModal {...modalProps} onClose={closeModal} />,
    userProfile: <UserProfileModal {...modalProps} onClose={closeModal} />,
  };

  return modals[modalType] || null;
};

export default function AppWrapper({ children }) {
  return (
    <AppProvider>
      {children}
      <AppModals />
    </AppProvider>
  );
}
