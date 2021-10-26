import { toast } from 'react-toastify';
import {
  RESET_PREQUALIFICATION_START,
  RESET_PREQUALIFICATION_SUCCESS,
  RESET_PREQUALIFICATION_ERROR,
  RESET_PREQUALIFICATION_DATA,
} from 'constants/action-types/users/resetPasswordPrequalification';

import apiAction from 'helpers/apiAction';

export const postResetPasswordPrequalification = data => dispatch => {
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
        const message = global.translate(
          'We have sent the OTP to the provided phone number',
        );
        if (Array.isArray(data)) {
          toast.success(message);
        }
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
};

export const clearResetPasswordData = data => dispatch => {
  dispatch({
    type: RESET_PREQUALIFICATION_DATA,
    payload: {
      data,
    },
  });
};
