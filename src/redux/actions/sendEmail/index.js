import { toast } from 'react-toastify';
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
      url: '/SendEMailVerifURL',
      data,
      onStart: () => dispatch =>
        dispatch({
          type: SEND_EMAIL_START,
        }),
      onSuccess: data => dispatch => {
        const res = Array.isArray(data) ? data[0] || {} : data || {};

        toast.success(res.Description);
        return dispatch({
          type: SEND_EMAIL_SUCCESS,
          payload: {
            ...res,
            success: res.Result === 'Success',
          },
        });
      },
      onFailure: error => dispatch => {
        const err = Array.isArray(error)
          ? error[0] || {}
          : error || {};
        toast.error(err.Description);
        return dispatch({
          type: SEND_EMAIL_ERROR,
          payload: {
            ...err,
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
