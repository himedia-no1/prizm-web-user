import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import InviteLandingPage from '@/components/invite/InviteLandingPage';

async function getInviteInfo(inviteCode) {
  try {
    // Mock API call - replace with actual API
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3031'}/mock/invites/${inviteCode}`,
      { cache: 'no-store' }
    );

    if (!response.ok) {
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error('Failed to fetch invite info:', error);
    return null;
  }
}

export default async function InvitePage({ params }) {
  const { inviteCode } = await params;
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get('refresh_token');
  const isLoggedIn = !!refreshToken;

  const inviteInfo = await getInviteInfo(inviteCode);

  if (!inviteInfo) {
    // Invalid invite code - redirect to login
    redirect('/login');
  }

  return (
    <InviteLandingPage
      inviteCode={inviteCode}
      workspace={inviteInfo.workspace}
      inviter={inviteInfo.inviter}
      memberCount={inviteInfo.memberCount}
      isLoggedIn={isLoggedIn}
    />
  );
}
