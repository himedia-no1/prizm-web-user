import { DEFAULT_LOCALE } from './config';

// 동적으로 메시지 파일 로드
export const getMessagesForLocale = async (locale) => {
  const targetLocale = locale || DEFAULT_LOCALE;
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
      search,
    ] = await Promise.all([
      import(`../../messages/${targetLocale}/landing.json`),
      import(`../../messages/${targetLocale}/common.json`),
      import(`../../messages/${targetLocale}/modals.json`),
      import(`../../messages/${targetLocale}/userSettings.json`),
      import(`../../messages/${targetLocale}/workspace.json`),
      import(`../../messages/${targetLocale}/workspaceManagement.json`),
      import(`../../messages/${targetLocale}/directory.json`),
      import(`../../messages/${targetLocale}/message.json`),
      import(`../../messages/${targetLocale}/search.json`),
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
      search: search.default,
    };
  } catch (error) {
    console.error(`Failed to load messages for locale: ${targetLocale}`, error);

    // Fallback to default locale
    if (targetLocale !== DEFAULT_LOCALE) {
      return getMessagesForLocale(DEFAULT_LOCALE);
    }

    return {};
  }
};
