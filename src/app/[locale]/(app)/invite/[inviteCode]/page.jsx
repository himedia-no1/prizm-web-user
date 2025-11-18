import InviteLandingPage from '@/components/invite/InviteLandingPage';

export default async function InvitePage({ params }) {
  const { inviteCode } = await params;
  return <InviteLandingPage inviteCode={inviteCode} />;
}
