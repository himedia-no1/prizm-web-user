import { redirect } from 'next/navigation';
import { getServerSession } from '@/lib/authSession';

export default async function HomePage() {
  const session = await getServerSession();

  if (session?.workspaceId) {
    redirect(`/workspace/${session.workspaceId}/dashboard`);
  }

  redirect('/login');
}
