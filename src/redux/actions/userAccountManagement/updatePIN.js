import {
  UPDATE_PIN_START,
  UPDATE_PIN_SUCCESS,
  UPDATE_PIN_FAILURE,
  CLEAR_UPDATE_PIN,
} from 'constants/action-types/userAccountManagement/updatePIN';
import apiAction from 'helpers/apiAction';

export default data => dispatch =>
  dispatch(
    apiAction({
      method: 'post',
      url: '/ChangeUserPIN',
      data,
      requireAppId: false,
      onStart: () => dispatch =>
        dispatch({
          type: UPDATE_PIN_START,
        }),
      onSuccess: data => dispatch => {
        dispatch({
          type: UPDATE_PIN_SUCCESS,
          payload: {
            ...data[0],
            success: data[0].Result === 'Success',
          },
        });
      },
      onFailure: error => dispatch => {
        return dispatch({
          type: UPDATE_PIN_FAILURE,
          payload: {
            ...error[0],
          },
        });
      },
    }),
  );

export const restoreUpdatePIN = () => dispatch => {
  dispatch({
    type: CLEAR_UPDATE_PIN,
  });
};
