import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import axios from 'axios';
import InviteLandingPage from '@/components/invite/InviteLandingPage';

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8080';

async function getInviteInfo(inviteCode) {
  try {
    const { data } = await axios.get(`${BACKEND_URL}/api/invites/${inviteCode}`);
    return data;
  } catch (error) {
    return null;
  }
}

async function checkLoginStatus() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get('refresh_token')?.value;

  if (!refreshToken) {
    return false;
  }

  try {
    await axios.post(`${BACKEND_URL}/api/auth/refresh`, null, {
      headers: { Cookie: `refresh_token=${refreshToken}` },
    });
    return true;
  } catch (error) {
    return false;
  }
}

export default async function InvitePage({ params }) {
  const { inviteCode } = await params;

  const inviteInfo = await getInviteInfo(inviteCode);

  if (!inviteInfo) {
    redirect('/');
  }

  const isLoggedIn = await checkLoginStatus();

  return (
    <InviteLandingPage
      inviteCode={inviteCode}
      workspace={inviteInfo}
      isLoggedIn={isLoggedIn}
    />
  );
}
