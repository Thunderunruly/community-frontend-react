import { createIntl, createIntlCache, RawIntlProvider } from 'react-intl';
import enUSMessages from './locales/en-US.json';
import zhCNMessages from './locales/zh-CN.json';

const cache = createIntlCache();
const messages = {
  "en-US": enUSMessages,
  "zh-CN": zhCNMessages,
};

const createProvider = (locale) => {
  const intl = createIntl({
    locale,
    messages: messages[locale],
  }, cache);

  return ({ children }) => (
    <RawIntlProvider value={intl}>
      {children}
    </RawIntlProvider>
  );
};

export { createProvider, messages };
