import { redirect } from 'next/navigation';
import SocialAuthPage from '@/components/auth/SocialAuthPage';
import { hasRefreshToken, fetchLastVisitedPath } from '@/features/workspace/actions';

export default async function LoginPage({ searchParams }) {
  const isLoggedIn = await hasRefreshToken();

  if (isLoggedIn) {
    try {
      const lastVisited = await fetchLastVisitedPath();
      if (lastVisited) {
        redirect(lastVisited);
      }
    } catch (error) {
      console.error('Failed to load last visited path:', error);
    }

    redirect('/workspace');
  }

  return <SocialAuthPage searchParams={searchParams} />;
}
