import { DEFAULT_LANGUAGE } from 'constants/general';

/**
 * @param {string} lang the language abbreviation
 * @returns {array} array of translated text with their equivalence in the default language
 */
export default lang => {
  try {
    const language = JSON.parse(
      localStorage[String(lang || DEFAULT_LANGUAGE).trim()],
    );
    return Array.isArray(language) ? language : [];
  } catch (error) {
    return [];
  }
};
