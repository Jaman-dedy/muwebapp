import { toast } from 'react-toastify';

import {
  SEND_OTP_START,
  SEND_OTP_SUCCESS,
  SEND_OTP_ERROR,
} from 'constants/action-types/users/sendOTP';
import apiAction from 'helpers/apiAction';

export default phoneNumber => dispatch =>
  dispatch(
    apiAction({
      method: 'post',
      url: '/SendPhoneVerifCode',
      data: {
        PhoneNumber: phoneNumber,
      },
      onStart: () => dispatch =>
        dispatch({
          type: SEND_OTP_START,
        }),
      onSuccess: data => dispatch => {
        return dispatch({
          type: SEND_OTP_SUCCESS,
          payload: {
            success: data[0].Result === 'Success',
            message: data[0].Description,
          },
        });
      },
      onFailure: error => dispatch => {
        toast.error(error);
        return dispatch({
          type: SEND_OTP_ERROR,
          payload: {
            error,
          },
        });
      },
    }),
  );
