import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { createProvider as createIntlProvider, messages } from '../i18n/i18n';
import themes from "../themes";
import { ConfigProvider, theme as current, message as mg } from "antd";
export const AppContext = createContext();

const AppProvider = ({children}) => {
  const themeKeys = Object.keys(themes);
  const localeKeys = Object.keys(messages);
  const [messageApi, contextHolder] = mg.useMessage();
  const [locale, setLocale] = useState(() => localStorage.getItem('locale') || localeKeys[0]);
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || themeKeys[0]);
  const [darkMode, setDarkMode] = useState(() => {
    const saveDarkMode = localStorage.getItem("darkMode");
    return saveDarkMode ? JSON.parse(saveDarkMode)  : false;
  });
  const [isAuthenticated, setAuthenticate] = useState(() => {
    const savedAuthStatus = localStorage.getItem('isAuthenticated');
    return savedAuthStatus ? JSON.parse(savedAuthStatus) : false;
  });

  useEffect(() => {
    localStorage.setItem('isAuthenticated', isAuthenticated);
  }, [isAuthenticated]);

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('locale', locale);
  }, [locale]);

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  const toggleTheme = (number) => {
    setTheme((prevTheme) => {
      const currentIndex = themeKeys.indexOf(prevTheme);
      let nextIndex = (currentIndex + number) % themeKeys.length;
      if (nextIndex < 0) {
        nextIndex = themeKeys.length + nextIndex;
      }
      return themeKeys[nextIndex];
    });
  };

  const toggleLocale = (number) => {
    setLocale((prevLocale) => {
      const currentIndex = localeKeys.indexOf(prevLocale);
      let nextIndex = (currentIndex + number) % localeKeys.length;
      if (nextIndex < 0) {
        nextIndex = localeKeys.length + nextIndex;
      }
      return localeKeys[nextIndex];
    });
  };

  useEffect(() => {
    const head = document.head;
    const link = document.createElement('link');

    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.id = 'theme-style';

    if (darkMode) {
      link.href = '/themes/prism-okaidia.min.css';
    } else {
      link.href = '/themes/prism.min.css';
    }

    const oldLink = document.getElementById('theme-style');
    if (oldLink) {
      head.removeChild(oldLink);
    }
    head.appendChild(link);

    return () => {
      if (head.contains(link)) {
        head.removeChild(link);
      }
    };
  }, [darkMode]);

  const currentTheme = useMemo(() => themes[theme], [theme]);
  const IntlProvider = useMemo(() => createIntlProvider(locale), [locale]);
  const algorithm = useMemo(() => darkMode? current.darkAlgorithm : current.defaultAlgorithm, [darkMode]);

  return (<AppContext.Provider 
    value={{
      locale, setLocale, toggleLocale,
      theme, setTheme, toggleTheme,
      darkMode, setDarkMode,
      localeKeys, themeKeys,
      isAuthenticated, setAuthenticate,
      messageApi
      }}>
    <ConfigProvider theme={{...currentTheme, algorithm}}>
      <IntlProvider>
        {contextHolder}
        {children}
      </IntlProvider>
    </ConfigProvider>
  </AppContext.Provider>);
};

export default AppProvider;

export const useAppContext = () => useContext(AppContext);