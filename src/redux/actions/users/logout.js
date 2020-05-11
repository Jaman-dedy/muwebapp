import {
  LOGOUT_START,
  LOGOUT_SUCCESS,
  LOGOUT_ERROR,
} from 'constants/action-types/users/logout';
import apiAction from 'helpers/apiAction';

export default data => dispatch =>
  dispatch(
    apiAction({
      method: 'post',
      url: '/UserLogOff',
      data,
      onStart: () => dispatch =>
        dispatch({
          type: LOGOUT_START,
        }),
      onSuccess: data => dispatch => {
        return dispatch({
          type: LOGOUT_SUCCESS,
          payload: {
            data,
          },
        });
      },
      onFailure: error => dispatch => {
        return dispatch({
          type: LOGOUT_ERROR,
          payload: {
            error,
          },
        });
      },
    }),
  );
