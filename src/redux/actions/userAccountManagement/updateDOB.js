import { UPDATE_USER_INFO_SUCCESS } from 'constants/action-types/users/getUserInfo';
import {
  UPDATE_DOB_START,
  UPDATE_DOB_SUCCESS,
  UPDATE_DOB_FAILURE,
  CLEAR_UPDATE_DOB,
} from 'constants/action-types/userAccountManagement/updateDOB';
import apiAction from 'helpers/apiAction';

export default data => dispatch =>
  dispatch(
    apiAction({
      method: 'post',
      url: '/SetUserDateOfBirth',
      data,
      onStart: () => dispatch =>
        dispatch({
          type: UPDATE_DOB_START,
        }),
      onSuccess: data => dispatch => {
        dispatch({
          type: UPDATE_DOB_SUCCESS,
          payload: {
            ...data[0],
            success: data[0].Result === 'Success',
          },
        });

        dispatch({
          type: UPDATE_USER_INFO_SUCCESS,
          payload: {
            DateOfBirth: data[0].DateOfBirth,
          },
        });
      },
      onFailure: error => dispatch => {
        return dispatch({
          type: UPDATE_DOB_FAILURE,
          payload: {
            ...error[0],
          },
        });
      },
    }),
  );

export const restoreUpdateDOB = () => dispatch => {
  dispatch({
    type: CLEAR_UPDATE_DOB,
  });
};
