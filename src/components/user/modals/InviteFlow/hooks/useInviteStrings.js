import { useMessages } from 'next-intl';

export const useInviteStrings = (mode) => {
  const messages = useMessages() ?? {};
  const inviteStrings =
    mode === 'guest' ? messages.modals?.inviteGuest : messages.modals?.inviteMember;
  return {
    invite: inviteStrings ?? {},
    copy: messages.copy ?? {},
  };
};
