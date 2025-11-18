import { validateAndGetWorkspace } from '@/features/workspace/actions';
import axios from 'axios';
import { cookies } from 'next/headers';
import DirectoryClient from './DirectoryClient';

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8080';

async function refreshAccessToken() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get('refresh_token')?.value;

  if (!refreshToken) {
    return null;
  }

  try {
    const { data } = await axios.post(`${BACKEND_URL}/api/auth/refresh`, null, {
      headers: { Cookie: `refresh_token=${refreshToken}` },
    });
    return data?.accessToken ?? null;
  } catch (error) {
    return null;
  }
}

export default async function DirectoryPage({ params }) {
  const { workspaceId } = (await params) ?? {};
  await validateAndGetWorkspace(workspaceId);

  const accessToken = await refreshAccessToken();
  let users = [];

  if (accessToken) {
    try {
      const { data } = await axios.get(`${BACKEND_URL}/api/workspaces/${workspaceId}/users`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      users = Array.isArray(data?.users) ? data.users : [];
    } catch (error) {
      // ignore
    }
  }

  return <DirectoryClient users={users} />;
}
