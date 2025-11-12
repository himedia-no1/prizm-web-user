import { DEFAULT_LOCALE } from './config';

// 동적으로 메시지 파일 로드
export const getMessagesForLocale = async (locale) => {
  try {
    // 각 도메인별 메시지 파일을 동적으로 import
    const [
      landing,
      common,
      modals,
      userSettings,
      workspace,
      workspaceManagement,
      directory,
      message,
    ] = await Promise.all([
      import(`../../messages/${locale}/landing.json`),
      import(`../../messages/${locale}/common.json`),
      import(`../../messages/${locale}/modals.json`),
      import(`../../messages/${locale}/userSettings.json`),
      import(`../../messages/${locale}/workspace.json`),
      import(`../../messages/${locale}/workspaceManagement.json`),
      import(`../../messages/${locale}/directory.json`),
      import(`../../messages/${locale}/message.json`),
    ]);

    // 네임스페이스 구조로 반환
    return {
      landing: landing.default,
      common: common.default,
      modals: modals.default,
      userSettings: userSettings.default,
      workspace: workspace.default,
      workspaceManagement: workspaceManagement.default,
      directory: directory.default,
      message: message.default,
    };
  } catch (error) {
    console.error(`Failed to load messages for locale: ${locale}`, error);

    // Fallback to default locale
    if (locale !== DEFAULT_LOCALE) {
      return getMessagesForLocale(DEFAULT_LOCALE);
    }

    return {};
  }
};
