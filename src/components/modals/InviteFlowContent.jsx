export { InviteFlow as InviteFlowContent } from '@/components/user/modals/InviteFlow';
export { CopyableLink } from '@/components/user/modals/InviteFlow/components/CopyableLink';
export default function InviteFlowWrapper(props) {
  const { InviteFlow } = require('@/components/user/modals/InviteFlow');
  return InviteFlow(props);
}
