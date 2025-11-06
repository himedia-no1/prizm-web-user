import { redirect } from 'next/navigation';
import { getServerSession } from '@/lib/authSession';

export default async function AppHomePage() {
  const session = await getServerSession();

  if (session?.workspaceId) {
    redirect(`/app/workspace/${session.workspaceId}/dashboard`);
  }

  redirect('/app/auth');
}
