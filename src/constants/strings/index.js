import { commonStrings } from './domains/common';
import { modalsStrings } from './domains/modals';
import { messageStrings } from './domains/message';
import { workspaceStrings } from './domains/workspace';
import { directoryStrings } from './domains/directory';
import { userSettingsStrings } from './domains/userSettings';
import { workspaceAdminStrings } from './domains/workspaceAdmin';

const mergeDomains = (...domains) =>
  domains.reduce(
    (acc, domain) => ({
      en: { ...acc.en, ...(domain.en ?? {}) },
      ko: { ...acc.ko, ...(domain.ko ?? {}) },
    }),
    { en: {}, ko: {} },
  );

export const stringDomains = {
  common: commonStrings,
  modals: modalsStrings,
  message: messageStrings,
  workspace: workspaceStrings,
  directory: directoryStrings,
  userSettings: userSettingsStrings,
  workspaceAdmin: workspaceAdminStrings,
};

export const strings = mergeDomains(...Object.values(stringDomains));

export const getStringsForDomain = (domainKey, language = 'en') => {
  const domain = stringDomains[domainKey];
  if (!domain) {
    return {};
  }
  return domain[language] ?? domain.en ?? {};
};

export default strings;
