import {
  UPDATE_USER_EMAIL_LIST_START,
  UPDATE_USER_EMAIL_LIST_SUCCESS,
  UPDATE_USER_EMAIL_LIST_FAILURE,
} from 'constants/action-types/userAccountManagement/updateUserEmailList';
import apiAction from 'helpers/apiAction';

export default data => dispatch =>
  dispatch(
    apiAction({
      method: 'post',
      url: '/UpdateUserEmailList',
      data,
      requireAppId: false,
      onStart: () => dispatch =>
        dispatch({
          type: UPDATE_USER_EMAIL_LIST_START,
        }),
      onSuccess: data => dispatch => {
        dispatch({
          type: UPDATE_USER_EMAIL_LIST_SUCCESS,
          payload: {
            ...data[0],
            success: data[0].Result === 'Success',
          },
        });
      },
      onFailure: error => dispatch => {
        return dispatch({
          type: UPDATE_USER_EMAIL_LIST_FAILURE,
          payload: {
            ...error[0],
          },
        });
      },
    }),
  );
