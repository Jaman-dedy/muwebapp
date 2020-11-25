import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

/**
 * @return {function} returns a function that you can call at any time to translate text
 */
export default () => {
  const [data, setLanguage] = useState({});

  const { language: { data: savedLang = [] } = {} } = useSelector(
    ({ user }) => user,
  );

  useEffect(() => {
    setLanguage(savedLang);
  }, [savedLang]);

  const preferredLanguage = localStorage.language;
  useEffect(() => {
    if (preferredLanguage) {
      const savedLanguage = localStorage[preferredLanguage];
      if (savedLanguage) {
        setLanguage(JSON.parse(savedLanguage));
      }
    }
  }, [preferredLanguage]);

  const translate = (str, langIndex) => {
    let checkLang = null;
    const text = str || '';

    try {
      if (langIndex && Array.isArray(data)) {
        checkLang = data.find(
          ({ Index }) => Number(Index) === Number(langIndex),
        );
      }
      if (str && !checkLang && Array.isArray(data)) {
        checkLang = data.find(
          ({ Default }) =>
            Default.toLowerCase().trim() ===
            text.toLowerCase().trim(),
        );
      }
      if (checkLang && checkLang.Label) {
        return checkLang.Label;
      }
      return text;
    } catch (error) {
      return '';
    }
  };
  return translate;
};
