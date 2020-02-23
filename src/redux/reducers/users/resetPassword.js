import {
  RESET_PASSWORD_START,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_ERROR,
  RESET_PASSWORD_CLEAR,
} from 'constants/action-types/users/resetPassword';

export default (state, { type, payload }) => {
  switch (type) {
    case RESET_PASSWORD_START:
      return {
        ...state,
        resetPassword: {
          ...state.resetPassword,
          loading: true,
        },
      };
    case RESET_PASSWORD_ERROR:
      return {
        ...state,
        resetPassword: {
          ...state.resetPassword,
          error: payload.error,
          loading: false,
        },
      };
    case RESET_PASSWORD_CLEAR:
      return {
        ...state,
        resetPassword: {
          ...state.resetPassword,
          error: null,
          loading: false,
          success: false,
        },
      };
    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        resetPassword: {
          ...state.resetPassword,
          ...payload,
          loading: false,
          success: true,
        },
      };
    default:
      return null;
  }
};
