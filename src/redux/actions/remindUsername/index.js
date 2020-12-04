import {
  REMIND_USERNAME_START,
  REMIND_USERNAME_SUCCESS,
  REMIND_USERNAME_ERROR,
  CLEAR_REMIND_USERNAME_STORE,
} from 'constants/action-types/remindUsername';

import apiAction from 'helpers/apiAction';

export default data => dispatch =>
  dispatch(
    apiAction({
      method: 'post',
      url: '/GetUserPID',
      data,
      onStart: () => dispatch =>
        dispatch({
          type: REMIND_USERNAME_START,
        }),
      onSuccess: data => dispatch => {
        if (data[0].Result === 'Success') {
          return dispatch({
            type: REMIND_USERNAME_SUCCESS,
            payload: {
              ...data[0],
              success: data[0].Result === 'Success',
            },
          });
        }
        return dispatch({
          type: REMIND_USERNAME_ERROR,
          payload: {
            ...data[0],
          },
        });
      },
      onFailure: error => dispatch => {
        return dispatch({
          type: REMIND_USERNAME_ERROR,
          payload: {
            ...error[0],
          },
        });
      },
    }),
  );
export const clearRemindUsername = () => dispatch => {
  return dispatch({
    type: CLEAR_REMIND_USERNAME_STORE,
  });
};
