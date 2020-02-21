import { toast } from 'react-toastify';
import {
  RESET_PASSWORD_START,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_ERROR,
} from 'constants/action-types/users/resetPassword';

import apiAction from 'helpers/apiAction';

export default data => dispatch =>
  dispatch(
    apiAction({
      method: 'post',
      url: '/ResetUserPasswordAndPIN',
      data: {
        LastName: data.lastName,
        DOB: data.dob,
        PhoneNumber: data.phoneNumber,
        NewPIN: data.NewPIN,
        NewPassword: data.NewPassword,
        PID: data.PID,
        DOBSet: data.DOBSet,
        OTP: data.OTP,
        KYCDocSent: data.KYCDocSent,
        SecurityQuestionSet: data.SecurityQuestionSet,
      },
      onStart: () => dispatch =>
        dispatch({
          type: RESET_PASSWORD_START,
        }),
      onSuccess: data => dispatch => {
        return dispatch({
          type: RESET_PASSWORD_SUCCESS,
          payload: {
            success: data[0].Result === 'Success',
            message: data[0].Description,
            username: data[0].UserName,
            Wallets: data[0].Wallets,
          },
        });
      },
      onFailure: error => dispatch => {
        toast.error(error[0].Description);
        return dispatch({
          type: RESET_PASSWORD_ERROR,
          payload: {
            error: error[0],
          },
        });
      },
    }),
  );
