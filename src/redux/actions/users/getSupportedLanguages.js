import {
  GET_SUPPORTED_LANGUAGE_START,
  GET_SUPPORTED_LANGUAGE_SUCCESS,
  GET_SUPPORTED_LANGUAGE_FAILURE,
} from 'constants/action-types/users/language';
import apiAction from 'helpers/apiAction';

export default userData => dispatch =>
  dispatch(
    apiAction({
      method: 'post',
      url: '/SupportedLanguages',
      data: userData,
      onStart: () => dispatch =>
        dispatch({
          type: GET_SUPPORTED_LANGUAGE_START,
        }),
      onSuccess: languages => dispatch => {
        if (Array.isArray(languages)) {
          dispatch({
            type: GET_SUPPORTED_LANGUAGE_SUCCESS,
            payload: languages.map(language => ({
              text: language.Name,
              value: language.Code,
              flag: language.Code,
              key: language.Code,
            })),
          });
        }
      },
      onFailure: error => dispatch => {
        return dispatch({
          type: GET_SUPPORTED_LANGUAGE_FAILURE,
          payload: {
            error,
          },
        });
      },
    }),
  );
