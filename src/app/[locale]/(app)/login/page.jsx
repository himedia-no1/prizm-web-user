import { redirect } from 'next/navigation';
import SocialAuthPage from '@/components/auth/SocialAuthPage';
import { fetchLastVisitedPath } from '@/features/workspace/actions';

export default async function LoginPage({ searchParams }) {
  try {
    const lastVisited = await fetchLastVisitedPath();
    if (lastVisited) {
      redirect(lastVisited);
    }
  } catch (error) {
    // Refresh 실패 또는 로그인 안 됨 - 로그인 페이지 렌더링
  }

  return <SocialAuthPage searchParams={searchParams} />;
}
