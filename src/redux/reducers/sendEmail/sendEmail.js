import {
  SEND_EMAIL_START,
  SEND_EMAIL_SUCCESS,
  SEND_EMAIL_ERROR,
  CLEAR_SEND_EMAIL_STORE,
} from 'constants/action-types/sendEmail';

export default (state, { type, payload }) => {
  switch (type) {
    case SEND_EMAIL_START:
      return {
        ...state,
        sendEmail: {
          ...state.sendEmail,
          loading: true,
          success: false,
          OK: '',
        },
      };
    case SEND_EMAIL_ERROR:
      return {
        ...state,
        sendEmail: {
          ...state.sendEmail,
          error: payload,
          loading: false,
        },
      };
    case SEND_EMAIL_SUCCESS:
      return {
        ...state,
        sendEmail: {
          ...state.sendEmail,
          data: payload,
          loading: false,
          error: null,
        },
      };
    case CLEAR_SEND_EMAIL_STORE:
      return {
        ...state,
        sendEmail: {
          ...payload,
          loading: false,
          error: null,
          success: false,
          OK: '',
        },
      };
    default:
      return null;
  }
};
