import { redirect } from 'next/navigation';
import { getServerSession } from '@/lib/authSession';
import SocialAuthPage from './SocialAuthPage';

export default async function LoginPage({ searchParams }) {
  const session = await getServerSession();

  if (session?.workspaceId) {
    redirect(`/app/workspace/${session.workspaceId}/dashboard`);
  }

  return <SocialAuthPage searchParams={searchParams} />;
}
