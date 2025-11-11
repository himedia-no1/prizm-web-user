import useStrings from '@/shared/hooks/useStrings';

export const useInviteStrings = (mode) => {
  const strings = useStrings();
  const inviteStrings = mode === 'guest' ? strings.modals?.inviteGuest : strings.modals?.inviteMember;
  return {
    invite: inviteStrings ?? {},
    copy: strings.copy ?? {},
  };
};
