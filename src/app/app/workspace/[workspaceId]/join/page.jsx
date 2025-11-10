import Link from 'next/link';
import { callBff } from '@/shared/server/bffClient';
import styles from './join.module.css';

export default async function WorkspaceJoinPage({ params }) {
  const { workspaceId } = (await params) ?? {};
  if (!workspaceId) {
    return (
      <div className={styles.container}>
        <p>유효하지 않은 워크스페이스입니다.</p>
      </div>
    );
  }

  const response = await callBff({ method: 'GET', url: `/mock/workspaces/${workspaceId}/summary` });
  if (response.status === 404) {
    return (
      <div className={styles.container}>
        <p>워크스페이스를 찾을 수 없습니다.</p>
        <Link href="/app/workspace/new" className={styles.link}>새 워크스페이스 만들기</Link>
      </div>
    );
  }

  const workspace = response.data;

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1>{workspace.name} 워크스페이스 초대</h1>
        <p>초대 코드를 입력하거나 워크스페이스 관리자에게 초대 링크를 요청하세요.</p>
        <div className={styles.actions}>
          <Link href={`/app/workspace/new?mode=join&workspaceId=${workspace.id}`} className={styles.primary}>
            초대 코드 입력하기
          </Link>
          <Link href="/app/login" className={styles.secondary}>
            다른 계정으로 로그인
          </Link>
        </div>
      </div>
    </div>
  );
}
