import { useSelector } from 'react-redux';

/**
 * @return {function} returns a function that you can call at any time to translate text
 */
export default () => {
  const { language: { data = [] } = {} } = useSelector(
    ({ user }) => user,
  );

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
