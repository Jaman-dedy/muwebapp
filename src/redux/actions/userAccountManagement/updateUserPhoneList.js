import {
  UPDATE_USER_PHONE_LIST_START,
  UPDATE_USER_PHONE_LIST_SUCCESS,
  UPDATE_USER_PHONE_LIST_FAILURE,
} from 'constants/action-types/userAccountManagement/updateUserPhoneList';
import apiAction from 'helpers/apiAction';

export default data => dispatch =>
  dispatch(
    apiAction({
      method: 'post',
      url: '/UpdateUserPhoneList',
      data,
      requireAppId: false,
      onStart: () => dispatch =>
        dispatch({
          type: UPDATE_USER_PHONE_LIST_START,
        }),
      onSuccess: data => dispatch => {
        dispatch({
          type: UPDATE_USER_PHONE_LIST_SUCCESS,
          payload: {
            ...data[0],
            success: data[0].Result === 'Success',
          },
        });
      },
      onFailure: error => dispatch => {
        return dispatch({
          type: UPDATE_USER_PHONE_LIST_FAILURE,
          payload: {
            ...error[0],
          },
        });
      },
    }),
  );
