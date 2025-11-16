'use client';

import { useMessages } from 'next-intl';
import { useUIStore } from '@/core/store/shared';
import { useChatStore } from '@/core/store/chat';
import { useWorkspaceStore } from '@/core/store/workspace';
import { GenericModal } from './GenericModal';
import { getStandaloneModal, getContentModal } from './modalRegistry';

const ModalManager = () => {
    const messages = useMessages();
    const s = { ...(messages?.common ?? {}), ...messages };
    const modalType = useUIStore((state) => state.modalType);
    const modalProps = useUIStore((state) => state.modalProps);
    const closeModal = useUIStore((state) => state.closeModal);
    const openThread = useChatStore((state) => state.openThread);
    const createDM = useWorkspaceStore((state) => state.createDM);
    const openModal = useUIStore((state) => state.openModal);

    const buildInviteGuestHandler = (props) => {
        if (!props?.channelId || !props?.workspaceId) {
            return undefined;
        }
        return () => {
            openModal('generic', {
                type: 'inviteGuest',
                channelId: props.channelId,
                channelName: props.channelName,
                workspaceId: props.workspaceId,
            });
        };
    };

    const dependencies = {
        closeModal,
        openThread,
        createDM,
        openModal,
        buildInviteGuestHandler,
    };

    if (!modalType) {
        return null;
    }

    const standaloneModal = getStandaloneModal(modalType, modalProps, dependencies);
    if (standaloneModal) {
        return standaloneModal;
    }

    const effectiveModalType = modalType === 'generic' ? modalProps.type : modalType;
    const contentModal = getContentModal(effectiveModalType, modalProps, dependencies);

    if (contentModal) {
        return (
            <GenericModal isOpen={true} onClose={closeModal} title={s.modals?.titles[effectiveModalType] ?? ''}>
                {contentModal}
            </GenericModal>
        );
    }

    return null;
};

export default ModalManager;
