import {
  RESET_PREQUALIFICATION_START,
  RESET_PREQUALIFICATION_SUCCESS,
  RESET_PREQUALIFICATION_ERROR,
  RESET_PREQUALIFICATION_CLEAR,
  RESET_PREQUALIFICATION_DATA,
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

        //   DOBSet: 'No',
        // DOB: '',
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
    case RESET_PREQUALIFICATION_DATA:
      return {
        ...state,
        resetPasswordPrequalification: {
          ...state.resetPasswordPrequalification,
          ...payload.data,
        },
      };
    default:
      return null;
  }
};
