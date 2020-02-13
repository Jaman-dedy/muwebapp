import { RESTORE_PHONE_OTP_STORE } from 'constants/action-types/users/clearPhoneNumberAndOTPStore';

export default () => dispatch => {
  dispatch({
    type: RESTORE_PHONE_OTP_STORE,
  });
};
