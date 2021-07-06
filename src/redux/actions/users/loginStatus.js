import {
  LOGIN_STATUS_START,
  LOGIN_STATUS_SUCCESS,
  LOGIN_STATUS_ERROR,
  CLEAR_LOGIN_STATUS_ERRORS,
  UPDATE_AUTH_DATA,
} from 'constants/action-types/users/loginStatus';
import apiAction from 'helpers/apiAction';
import changeLanguage from './changeLanguage';

export default data => dispatch =>
  dispatch(
    apiAction({
      method: 'post',
      url: '/GetUserLoginStatus',
      data,
      onStart: () => dispatch =>
        dispatch({
          type: LOGIN_STATUS_START,
        }),
      onSuccess: data => dispatch => {
        if (Array.isArray(data)) {
          if (data[0].Result !== 'FAILED') {
            if (localStorage.languageToSave) {
              changeLanguage(
                localStorage.languageToSave,
                true,
              )(dispatch);
            }
            return dispatch({
              type: LOGIN_STATUS_SUCCESS,
              payload: {
                data,
              },
            });
          }
          return dispatch({
            type: LOGIN_STATUS_ERROR,
            payload: {
              error: data,
            },
          });
        }
        return null;
      },
      onFailure: error => dispatch => {
        return dispatch({
          type: LOGIN_STATUS_ERROR,
          payload: {
            error,
          },
        });
      },
    }),
  );
export const clearLoginUserStatus = () => dispatch =>
  dispatch({
    type: CLEAR_LOGIN_STATUS_ERRORS,
  });

export const updateAuthData = data => dispatch => {
  dispatch({
    type: UPDATE_AUTH_DATA,
    payload: data,
  });
};
