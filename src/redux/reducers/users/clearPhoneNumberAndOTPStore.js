import { RESTORE_PHONE_OTP_STORE } from 'constants/action-types/users/clearPhoneNumberAndOTPStore';

export default (state, { type }) => {
  switch (type) {
    case RESTORE_PHONE_OTP_STORE:
      return {
        ...state,
        verifyPhoneNumber: {
          error: null,
          loading: false,
          isValid: false,
          message: '',
        },
        sendOTP: {
          error: null,
          loading: false,
          success: false,
          message: '',
        },
        verifyOTP: {
          error: null,
          loading: false,
          isValid: false,
          message: '',
        },
      };
    default:
      return null;
  }
};
