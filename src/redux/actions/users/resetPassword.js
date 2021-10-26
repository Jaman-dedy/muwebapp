import { toast } from 'react-toastify';
import {
  RESET_PASSWORD_START,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_ERROR,
  RESET_PASSWORD_SET,
  RESET_PASSWORD_CLEAR,
} from 'constants/action-types/users/resetPassword';

import apiAction from 'helpers/apiAction';

export const postResetPassword = data => dispatch => {
  dispatch(
    apiAction({
      method: 'post',
      url: '/ResetUserPasswordAndPIN',
      data: {
        LastName: data.LastName,
        DOB: data.DOB,
        PhoneNumber: data.PhoneNumber,
        NewPIN: data.NewPIN,
        NewPassword: data.NewPassword,
        PID: data.PID,
        DOBSet: data.DOBSet,
        OTP: data.OTP,
        KYCDocSent: data.KYCDocSent,
        SecurityQuestionSet: data.SecurityQuestionSet,
        A1: data.A1,
        A2: data.A2,
        A3: data.A3,
        A4: data.A4,
        A5: data.A5,
      },
      onStart: () => dispatch =>
        dispatch({
          type: RESET_PASSWORD_START,
        }),
      onSuccess: res => dispatch => {
        if (Array.isArray(res)) {
          if (data?.NewPassword && data?.NewPIN) {
            toast.success(res[0]?.Description);
          } else if (data?.NewPassword) {
            toast.success(
              global.translate(
                'User Password have been reset and is effective immediately.',
              ),
            );
          } else {
            toast.success(
              global.translate(
                'User PIN have been reset and are effective immediately.',
              ),
            );
          }
        }
        return dispatch({
          type: RESET_PASSWORD_SUCCESS,
          payload: {
            success: res[0].Result === 'Success',
            message: res[0].Description,
            FirstName: res[0].FirstName,
          },
        });
      },
      onFailure: error => dispatch => {
        return dispatch({
          type: RESET_PASSWORD_ERROR,
          payload: {
            error: error[0],
          },
        });
      },
    }),
  );
};

export const setResetPasswordDataAction = data => dispatch => {
  dispatch({
    type: RESET_PASSWORD_SET,
    payload: {
      data,
    },
  });
};

export const clearResetPasswordData = () => dispatch => {
  dispatch({
    type: RESET_PASSWORD_CLEAR,
  });
};
