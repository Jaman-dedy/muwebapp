import {
  RESET_PREQUALIFICATION_START,
  RESET_PREQUALIFICATION_SUCCESS,
  RESET_PREQUALIFICATION_ERROR,
} from 'constants/action-types/users/resetPasswordPrequalification';

import apiAction from 'helpers/apiAction';

export default data => dispatch =>
  dispatch(
    apiAction({
      method: 'post',
      url: '/ResetPasswordPrequalification',
      data: {
        LastName: data.lastName,
        DOB: data.DOB,
        PhoneNumber: data.phoneNumber,
        PID: data.personalId,
        DOBSet: data.DOBSet,
        KYCDocSent: data.KYCDocSent,
      },
      onStart: () => dispatch =>
        dispatch({
          type: RESET_PREQUALIFICATION_START,
        }),
      onSuccess: data => dispatch => {
        return dispatch({
          type: RESET_PREQUALIFICATION_SUCCESS,
          payload: {
            success: data[0].Result === 'Success',
            message: data[0].Description,
          },
        });
      },
      onFailure: error => dispatch => {
        return dispatch({
          type: RESET_PREQUALIFICATION_ERROR,
          payload: {
            error: error[0],
          },
        });
      },
    }),
  );
