import { UPDATE_USER_INFO_SUCCESS } from 'constants/action-types/users/getUserInfo';
import {
  UPDATE_GENDER_START,
  UPDATE_GENDER_SUCCESS,
  UPDATE_GENDER_FAILURE,
  CLEAR_UPDATE_GENDER,
} from 'constants/action-types/userAccountManagement/updateGender';
import apiAction from 'helpers/apiAction';

export default data => dispatch =>
  dispatch(
    apiAction({
      method: 'post',
      url: '/SetUserGender',
      data,
      onStart: () => dispatch =>
        dispatch({
          type: UPDATE_GENDER_START,
        }),
      onSuccess: data => dispatch => {
        dispatch({
          type: UPDATE_GENDER_SUCCESS,
          payload: {
            ...data[0],
            success: data[0].Result === 'Success',
          },
        });

        dispatch({
          type: UPDATE_USER_INFO_SUCCESS,
          payload: {
            Gender: data[0].Gender,
          },
        });
      },
      onFailure: error => dispatch => {
        return dispatch({
          type: UPDATE_GENDER_FAILURE,
          payload: {
            ...error[0],
          },
        });
      },
    }),
  );

export const restoreUpdateGender = () => dispatch => {
  dispatch({
    type: CLEAR_UPDATE_GENDER,
  });
};
