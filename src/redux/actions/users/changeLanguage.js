import {
  GET_LANGUAGE_SUCCESS,
  CHANGE_LANGUAGE_START,
  CHANGE_LANGUAGE_ERROR,
  CHANGE_LANGUAGE_SUCCESS,
} from 'constants/action-types/users/language';
import { DEFAULT_LANGUAGE } from 'constants/general';
import getLanguage from 'redux/actions/users/getLanguage';
import getSavedLanguage from 'helpers/getSavedLanguage';
import apiAction from 'helpers/apiAction';

export default lang => dispatch => {
  const language = String(lang).trim();
  localStorage.language = language;
  dispatch(
    apiAction({
      method: 'post',
      url: '/SaveUserLanguageChoice',
      data: { LanguageCode: lang },
      onStart: () => dispatch =>
        dispatch({
          type: CHANGE_LANGUAGE_START,
        }),
      onSuccess: data => dispatch => {
        return dispatch({
          type: CHANGE_LANGUAGE_SUCCESS,
          payload: {
            success: true,
            currencies: data,
          },
        });
      },
      onFailure: error => dispatch => {
        return dispatch({
          type: CHANGE_LANGUAGE_ERROR,
          payload: {
            error: error[0],
          },
        });
      },
    }),
  );

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
