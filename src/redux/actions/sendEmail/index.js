import {
  SEND_EMAIL_START,
  SEND_EMAIL_SUCCESS,
  SEND_EMAIL_ERROR,
  CLEAR_SEND_EMAIL_STORE,
} from 'constants/action-types/sendEmail';

import apiAction from 'helpers/apiAction';

export default data => dispatch =>
  dispatch(
    apiAction({
      method: 'post',
      url: '/SendEmail',
      data,
      onStart: () => dispatch =>
        dispatch({
          type: SEND_EMAIL_START,
        }),
      onSuccess: data => dispatch => {
        if (data[0].Result === 'Success') {
          return dispatch({
            type: SEND_EMAIL_SUCCESS,
            payload: {
              ...data[0],
              success: data[0].Result === 'Success',
            },
          });
        }
        return dispatch({
          type: SEND_EMAIL_ERROR,
          payload: {
            ...data[0],
          },
        });
      },
      onFailure: error => dispatch => {
        return dispatch({
          type: SEND_EMAIL_ERROR,
          payload: {
            ...error[0],
          },
        });
      },
    }),
  );
export const clearSendEmail = () => dispatch => {
  return dispatch({
    type: CLEAR_SEND_EMAIL_STORE,
  });
};
