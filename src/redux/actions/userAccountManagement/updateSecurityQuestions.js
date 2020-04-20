import {
  UPDATE_SECURITY_QUESTIONS_START,
  UPDATE_SECURITY_QUESTIONS_SUCCESS,
  UPDATE_SECURITY_QUESTIONS_FAILURE,
  CLEAR_UPDATE_SECURITY_QUESTIONS,
} from 'constants/action-types/userAccountManagement/updateSecurityQuestions';
import apiAction from 'helpers/apiAction';

export default data => dispatch =>
  dispatch(
    apiAction({
      method: 'post',
      url: '/UpdateUserSecurityQuestions',
      data,
      requireAppId: false,
      onStart: () => dispatch =>
        dispatch({
          type: UPDATE_SECURITY_QUESTIONS_START,
        }),
      onSuccess: data => dispatch => {
        dispatch({
          type: UPDATE_SECURITY_QUESTIONS_SUCCESS,
          payload: {
            ...data[0],
            success: data[0].Result === 'Success',
          },
        });
      },
      onFailure: error => dispatch => {
        return dispatch({
          type: UPDATE_SECURITY_QUESTIONS_FAILURE,
          payload: {
            ...error[0],
          },
        });
      },
    }),
  );

export const restoreUpdateSecurityQuestions = () => dispatch => {
  dispatch({
    type: CLEAR_UPDATE_SECURITY_QUESTIONS,
  });
};
