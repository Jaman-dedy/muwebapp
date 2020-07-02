import {
  LOGOUT_START,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
} from 'constants/action-types/users/logout';
import apiAction from 'helpers/apiAction';
import logoutHelper from 'helpers/logout';

export default history => dispatchAction => {
  if (!localStorage.token) {
    return logoutHelper(history);
  }
  return dispatchAction(
    apiAction({
      method: 'post',
      url: '/LogOff',
      onStart: () => dispatch => {
        return dispatch({
          type: LOGOUT_START,
        });
      },
      onSuccess: data => dispatch => {
        dispatch({
          type: LOGOUT_SUCCESS,
          payload: data,
        });
        return logoutHelper(history);
      },
      onFailure: err => dispatch => {
        dispatch({
          type: LOGOUT_FAILURE,
          payload: Array.isArray(err) ? err[0] || {} : err || {},
        });
        return logoutHelper(history);
      },
    }),
  );
};
