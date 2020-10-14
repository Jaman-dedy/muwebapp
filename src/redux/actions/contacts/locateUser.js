import {
  LOCATE_USER_START,
  LOCATE_USER_SUCCESS,
  LOCATE_USER_ERROR,
  CLEAR_FOUND_USER,
} from 'constants/action-types/users/locateUser';

import apiAction from 'helpers/apiAction';

export default data => dispatch => (callback = null) => {
  return dispatch(
    apiAction({
      method: 'post',
      url: '/LocateUser',
      data,
      onStart: () => dispatch =>
        dispatch({
          type: LOCATE_USER_START,
        }),
      onSuccess: data => dispatch => {
        if (callback) {
          callback(data?.[0].PID);
        }
        return dispatch({
          type: LOCATE_USER_SUCCESS,
          payload: data,
        });
      },
      onFailure: error => dispatch => {
        return dispatch({
          type: LOCATE_USER_ERROR,
          payload: {
            ...error[0],
          },
        });
      },
    }),
  );
};
export const clearFoundUser = () => dispatch => {
  return dispatch({
    type: CLEAR_FOUND_USER,
  });
};
