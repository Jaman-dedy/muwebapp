import {
  SEND_OTP_START,
  SEND_OTP_SUCCESS,
  SEND_OTP_ERROR,
  SEND_OTP_CLEAR,
} from 'constants/action-types/users/sendOTP';

export default (state, { type, payload }) => {
  switch (type) {
    case SEND_OTP_START:
      return {
        ...state,
        sendOTP: {
          ...state.sendOTP,
          loading: true,
          success: false,
        },
      };
    case SEND_OTP_ERROR:
      return {
        ...state,
        sendOTP: {
          ...state.sendOTP,
          error: payload,
          loading: false,
          success: false,
        },
      };
    case SEND_OTP_SUCCESS:
      return {
        ...state,
        sendOTP: {
          ...state.sendOTP,
          ...payload,
          loading: false,
        },
      };
    case SEND_OTP_CLEAR:
      return {
        ...state,
        sendOTP: {
          ...state.sendOTP,
          success: false,
          loading: false,
        },
      };
    default:
      return null;
  }
};
