import {
  VERIFY_EMAIL_START,
  VERIFY_EMAIL_SUCCESS,
  VERIFY_EMAIL_ERROR,
} from 'constants/action-types/users/verifyEmail';

export default (state, { type, payload }) => {
  switch (type) {
    case VERIFY_EMAIL_START:
      return {
        ...state,
        verifyEmail: {
          ...state.verifyEmail,
          data: {},
          message: '',
          loading: true,
          error: null,
          success: false,
        },
      };
    case VERIFY_EMAIL_ERROR:
      return {
        ...state,
        verifyEmail: {
          ...state.verifyEmail,
          error: payload,
          loading: false,
          success: false,
        },
      };
    case VERIFY_EMAIL_SUCCESS:
      return {
        ...state,
        verifyEmail: {
          ...state.verifyEmail,
          data: payload,
          message: '',
          error: null,
          loading: false,
          success: true,
        },
      };
    default:
      return null;
  }
};
