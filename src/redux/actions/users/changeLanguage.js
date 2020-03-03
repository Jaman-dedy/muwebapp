import { GET_LANGUAGE_SUCCESS } from 'constants/action-types/users/language';
import { DEFAULT_LANGUAGE } from 'constants/general';
import getLanguage from 'redux/actions/users/getLanguage';
import getSavedLanguage from 'helpers/getSavedLanguage';

export default lang => dispatch => {
  const language = String(lang).trim();
  localStorage.language = language;

  const data = getSavedLanguage(language);
  if (
    (Array.isArray(data) && data.length) ||
    language === DEFAULT_LANGUAGE
  ) {
    return dispatch({
      type: GET_LANGUAGE_SUCCESS,
      payload: { data, preferred: language },
    });
  }

  return getLanguage(language)(dispatch);
};
