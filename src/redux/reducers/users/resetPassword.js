import {
  RESET_PASSWORD_START,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_ERROR,
  RESET_PASSWORD_CLEAR,
  RESET_PASSWORD_SET,
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
          DOB: '',
          DOBSet: 'No',
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
    case RESET_PASSWORD_SET:
      return {
        ...state,
        resetPassword: {
          ...state.resetPassword,
          ...payload.data,
        },
      };
    default:
      return null;
  }
};
