import {
  VERIFY_EMAIL_START,
  VERIFY_EMAIL_SUCCESS,
  VERIFY_EMAIL_ERROR,
} from 'constants/action-types/users/verifyEmail';
import apiAction from 'helpers/apiAction';

export default key => dispatch =>
  dispatch(
    apiAction({
      method: 'post',
      url: '/EMailVerifCallBack',
      queries: { key },
      onStart: () => dispatch =>
        dispatch({
          type: VERIFY_EMAIL_START,
        }),
      onSuccess: data => dispatch => {
        dispatch({
          type: VERIFY_EMAIL_SUCCESS,
          payload: Array.isArray(data) ? data[0] || {} : data || {},
        });
      },
      onFailure: error => dispatch => {
        return dispatch({
          type: VERIFY_EMAIL_ERROR,
          payload: Array.isArray(error)
            ? error[0] || {}
            : error || {},
        });
      },
    }),
  );
