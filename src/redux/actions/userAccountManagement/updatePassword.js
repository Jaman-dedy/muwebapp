import {
  UPDATE_PASSWORD_START,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAILURE,
  CLEAR_UPDATE_PASSWORD,
} from 'constants/action-types/userAccountManagement/updatePassword';
import apiAction from 'helpers/apiAction';

export default (data, requireAppId = false) => dispatch =>
  dispatch(
    apiAction({
      method: 'post',
      url: '/ChangeUserPwd',
      data,
      requireAppId,
      onStart: () => dispatch =>
        dispatch({
          type: UPDATE_PASSWORD_START,
        }),
      onSuccess: data => dispatch => {
        dispatch({
          type: UPDATE_PASSWORD_SUCCESS,
          payload: {
            ...data[0],
            success: data[0].Result === 'Success',
          },
        });
      },
      onFailure: error => dispatch => {
        return dispatch({
          type: UPDATE_PASSWORD_FAILURE,
          payload: {
            ...error[0],
          },
        });
      },
    }),
  );

export const restoreUpdatePassword = () => dispatch => {
  dispatch({
    type: CLEAR_UPDATE_PASSWORD,
  });
};
