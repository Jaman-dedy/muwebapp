import {
  REFRESH_TOKEN_START,
  REFRESH_TOKEN_SUCCESS,
  REFRESH_TOKEN_FAILURE,
} from 'constants/action-types/users/refreshToken';

import logoutHelper from 'helpers/logout';
import apiAction from 'helpers/apiAction';

export default prevAction => dispatchAction =>
  dispatchAction(
    apiAction({
      method: 'post',
      url: '/RefreshToken',
      data: {
        RefreshToken: localStorage.refreshToken,
      },
      onStart: () => dispatch => {
        return dispatch({
          type: REFRESH_TOKEN_START,
        });
      },
      onSuccess: res => dispatch => {
        const data = Array.isArray(res) ? res[0] || {} : res || {};
        const { LiveToken, RefreshToken, ...user } = data;
        dispatch({
          type: REFRESH_TOKEN_SUCCESS,
          payload: user,
        });
        if (LiveToken && RefreshToken) {
          localStorage.token = LiveToken;
          localStorage.refreshToken = RefreshToken;
          dispatch(prevAction);
        }
      },
      onFailure: err => dispatch => {
        logoutHelper();
        return dispatch({
          type: REFRESH_TOKEN_FAILURE,
          payload: Array.isArray(err) ? err[0] || {} : err || {},
        });
      },
    }),
  );
