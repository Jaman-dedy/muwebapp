import {
  VERIFY_OTP_START,
  VERIFY_OTP_SUCCESS,
  VERIFY_OTP_ERROR,
  CLEAR_VERIFY_OTP,
} from 'constants/action-types/users/verifyOTP';

export default (state, { type, payload }) => {
  switch (type) {
    case VERIFY_OTP_START:
      return {
        ...state,
        verifyOTP: {
          ...state.verifyOTP,
          loading: true,
          error: null,
        },
      };
    case VERIFY_OTP_ERROR:
      return {
        ...state,
        verifyOTP: {
          ...state.verifyOTP,
          error: payload,
          loading: false,
        },
      };
    case VERIFY_OTP_SUCCESS:
      return {
        ...state,
        verifyOTP: {
          ...state.verifyOTP,
          ...payload,
          loading: false,
        },
      };
    case CLEAR_VERIFY_OTP:
      return {
        ...state,
        verifyOTP: {
          ...state.verifyOTP,
          error: null,
          success: false,
        },
      };
    default:
      return null;
  }
};
