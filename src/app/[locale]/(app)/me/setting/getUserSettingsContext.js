'use server';

import axios from 'axios';
import { cookies } from 'next/headers';

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

export async function getUserSettingsContext() {
  const accessToken = await refreshAccessToken();

  if (!accessToken) {
    return {
      user: null,
    };
  }

  try {
    const { data } = await axios.get(`${BACKEND_URL}/api/users/profile`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    return {
      user: data ?? null,
    };
  } catch (error) {
    return {
      user: null,
    };
  }
}
