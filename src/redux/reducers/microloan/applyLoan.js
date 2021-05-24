import {
  APPLY_LOAN_START,
  APPLY_LOAN_SUCCESS,
  APPLY_LOAN_ERROR,
  CLEAR_APPLY_LOAN,
} from 'constants/action-types/microloan/applyLoan';

export default (state, { type, payload }) => {
  switch (type) {
    case APPLY_LOAN_START:
      return {
        ...state,
        applyLoan: {
          ...state.applyLoan,
          loading: true,
          success: false,
          OK: '',
        },
      };
    case APPLY_LOAN_ERROR:
      return {
        ...state,
        applyLoan: {
          ...state.applyLoan,
          error: payload,
          loading: false,
        },
      };
    case APPLY_LOAN_SUCCESS:
      return {
        ...state,
        applyLoan: {
          ...state.applyLoan,
          data: payload,
          loading: false,
          error: null,
        },
      };
    case CLEAR_APPLY_LOAN:
      return {
        ...state,
        applyLoan: {
          data: null,
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
