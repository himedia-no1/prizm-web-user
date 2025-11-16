import axios from 'axios';
import { headers, cookies } from 'next/headers';

const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';

const buildCookieHeader = async () => {
  const cookieStore = await cookies();
  const serialized = cookieStore
    .getAll()
    .map(({ name, value }) => `${name}=${value}`)
    .join('; ');
  return serialized ? { Cookie: serialized } : {};
};

export const callBff = async (config) => {
  const headerList = await headers();
  const host = headerList.get('host');
  if (!host) {
    throw new Error('Unable to determine host for BFF request');
  }
  return axios({
    baseURL: `${protocol}://${host}`,
    headers: {
      ...(await buildCookieHeader()),
      ...config.headers,
    },
    validateStatus: () => true,
    ...config,
  });
};
