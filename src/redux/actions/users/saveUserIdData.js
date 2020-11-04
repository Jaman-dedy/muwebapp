import { toast } from 'react-toastify';
import {
  SAVE_USER_ID_START,
  SAVE_USER_ID_SUCCESS,
  SAVE_USER_ID_ERROR,
  CLEAR_SAVE_USER_ID_STORE,
} from 'constants/action-types/users/saveUserIdData';

import apiAction from 'helpers/apiAction';

export default data => dispatch =>
  dispatch(
    apiAction({
      method: 'post',
      url: '/SaveUserIDdata',
      data,
      onStart: () => dispatch =>
        dispatch({
          type: SAVE_USER_ID_START,
        }),
      onSuccess: res => dispatch => {
        const data = Array.isArray(res) ? res[0] || {} : res || {};
        if (data.Result === 'Success') {
          toast.success(global.translate(data.Description));
          return dispatch({
            type: SAVE_USER_ID_SUCCESS,
            payload: {
              ...data,
              success: data.Result === 'Success',
            },
          });
        }
        return dispatch({
          type: SAVE_USER_ID_ERROR,
          payload: {
            ...data,
          },
        });
      },
      onFailure: err => dispatch => {
        const error = Array.isArray(err) ? err[0] || {} : err || {};
        if (error.Description || error.message) {
          toast.error(
            global.translate(error.Description || error.message),
          );
        }
        return dispatch({
          type: SAVE_USER_ID_ERROR,
          payload: {
            ...error,
          },
        });
      },
    }),
  );

export const clearSaveBankAccount = () => dispatch => {
  return dispatch({
    type: CLEAR_SAVE_USER_ID_STORE,
  });
};
