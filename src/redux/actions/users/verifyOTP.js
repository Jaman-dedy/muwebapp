import {
  VERIFY_OTP_START,
  VERIFY_OTP_SUCCESS,
  VERIFY_OTP_ERROR,
  CLEAR_VERIFY_OTP,
} from 'constants/action-types/users/verifyOTP';
import apiAction from 'helpers/apiAction';

export default (phoneNumber, OTP) => dispatch =>
  dispatch(
    apiAction({
      method: 'post',
      url: '/PhoneVerifResult',
      data: {
        PhoneNumber: phoneNumber,
        VerifCode: OTP,
      },
      onStart: () => dispatch =>
        dispatch({
          type: VERIFY_OTP_START,
        }),
      onSuccess: data => dispatch => {
        if (data[0].Result === false) {
          return dispatch({
            type: VERIFY_OTP_ERROR,
            payload: {
              message: data[0].Description,
            },
          });
        }
        return dispatch({
          type: VERIFY_OTP_SUCCESS,
          payload: {
            isValid: true,
            message: data[0].Description,
          },
        });
      },
      onFailure: error => dispatch => {
        return dispatch({
          type: VERIFY_OTP_ERROR,
          payload: {
            ...error[0],
          },
        });
      },
    }),
  );

export const clearVerifyOTP = () => dispatch => {
  dispatch({
    type: CLEAR_VERIFY_OTP,
  });
};
