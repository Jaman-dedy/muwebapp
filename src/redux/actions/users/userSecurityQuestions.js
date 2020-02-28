import {
  SECURITY_QUESTION_START,
  SECURITY_QUESTION_SUCCESS,
  SECURITY_QUESTION_FAILURE,
} from 'constants/action-types/users/userSecurityQuestions';

import apiAction from 'helpers/apiAction';

export default data => dispatch =>
  dispatch(
    apiAction({
      method: 'post',
      url: '/GetUserSecurityQuestions',
      data: {
        PID: data,
      },
      onStart: () => dispatch =>
        dispatch({
          type: SECURITY_QUESTION_START,
        }),
      onSuccess: data => dispatch => {
        return dispatch({
          type: SECURITY_QUESTION_SUCCESS,
          payload: {
            success: data[0].Result === 'Success',
            message: data[0].Description,
            Questions: data[0].Questions,
          },
        });
      },
      onFailure: error => dispatch => {
        return dispatch({
          type: SECURITY_QUESTION_FAILURE,
          payload: {
            error: error[0],
          },
        });
      },
    }),
  );
