import {
  CHECK_LOAN_START,
  CHECK_LOAN_SUCCESS,
  CHECK_LOAN_ERROR,
  CLEAR_CHECK_ELIGIBILITY,
} from 'constants/action-types/microloan/checkLoan';

export default (state, { type, payload }) => {
  switch (type) {
    case CHECK_LOAN_START:
      return {
        ...state,
        checkLoan: {
          ...state.checkLoan,
          loading: true,
          success: false,
          OK: '',
        },
      };
    case CHECK_LOAN_ERROR:
      return {
        ...state,
        checkLoan: {
          ...state.checkLoan,
          error: payload,
          loading: false,
        },
      };
    case CHECK_LOAN_SUCCESS:
      return {
        ...state,
        checkLoan: {
          ...state.checkLoan,
          data: payload,
          loading: false,
          error: null,
        },
      };
    case CLEAR_CHECK_ELIGIBILITY:
      return {
        ...state,
        checkLoan: {
          data: null,
          loading: false,
          error: null,
          success: false,
        },
      };
    default:
      return null;
  }
};
