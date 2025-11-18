'use server';

/**
 * OAuth2 인증은 프론트엔드에서 직접 /api/auth/oauth2/{provider} 로 리다이렉트
 * 서버 액션 불필요
 */
export async function authenticateWithProvider(provider) {
  // OAuth2는 클라이언트에서 직접 처리
  throw new Error('OAuth2 authentication should be handled on client side');
}
