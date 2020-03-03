import {
  GET_LANGUAGE_START,
  GET_LANGUAGE_SUCCESS,
  GET_LANGUAGE_FAILURE,
} from 'constants/action-types/users/language';
import apiAction from 'helpers/apiAction';
import { DEFAULT_LANGUAGE } from 'constants/general';

export default lang => dispatch => {
  const language = String(lang || localStorage.language || '').trim();
  if (!language) {
    return false;
  }

  if (language === DEFAULT_LANGUAGE) {
    return true;
  }

  return dispatch(
    apiAction({
      method: 'post',
      url: '/LoadLanguage',
      data: { Language: language },
      onStart: () => dispatch =>
        dispatch({
          type: GET_LANGUAGE_START,
        }),
      onSuccess: data => dispatch => {
        dispatch({
          type: GET_LANGUAGE_SUCCESS,
          payload: { data, preferred: language },
        });
        if (Array.isArray(data) && data.length) {
          localStorage[language] = JSON.stringify(data);
        }
      },
      onFailure: error => dispatch => {
        return dispatch({
          type: GET_LANGUAGE_FAILURE,
          payload: {
            error,
          },
        });
      },
    }),
  );
};
