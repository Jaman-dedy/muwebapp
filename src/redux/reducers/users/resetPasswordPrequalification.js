import {
  RESET_PREQUALIFICATION_START,
  RESET_PREQUALIFICATION_SUCCESS,
  RESET_PREQUALIFICATION_ERROR,
  RESET_PREQUALIFICATION_CLEAR,
} from 'constants/action-types/users/resetPasswordPrequalification';

export default (state, { type, payload }) => {
  switch (type) {
    case RESET_PREQUALIFICATION_START:
      return {
        ...state,
        resetPasswordPrequalification: {
          ...state.resetPasswordPrequalification,
          loading: true,
        },
      };
    case RESET_PREQUALIFICATION_CLEAR:
      return {
        ...state,
        resetPasswordPrequalification: {
          ...state.resetPasswordPrequalification,
          error: null,
          loading: false,
          success: false,
        },
      };
    case RESET_PREQUALIFICATION_ERROR:
      return {
        ...state,
        resetPasswordPrequalification: {
          ...state.resetPasswordPrequalification,
          error: payload.error,
          loading: false,
        },
      };
    case RESET_PREQUALIFICATION_SUCCESS:
      return {
        ...state,
        resetPasswordPrequalification: {
          ...state.resetPasswordPrequalification,
          ...payload,
          loading: false,
          success: true,
        },
      };
    default:
      return null;
  }
};
